

import React,{ Component } from 'react'
import './myclassfid.less'
import { connect } from 'react-redux'
import { Modal,Button,Input,Form,Upload,message,Space,Table ,Popconfirm, Spin } from 'antd'
import { LoadingOutlined, PlusOutlined,CaretRightOutlined,VerticalAlignBottomOutlined,ShareAltOutlined } from '@ant-design/icons';
import { reqAddUserSheet,reqDelUserSheet } from '../../../api'
import { setUserSheets } from '../../../redux/actions'
import { formatMoment } from '../../../utils'
class MyClassifid extends Component{
    state = {
        loading: false,
        visible: false,
        file:"",
        name:'',
        desc:'',
        imageUrl:"",
        showType:0,
        delLoading:false
    }

    showModel = () => {
        this.setState({
            visible:true
        })
    }


    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        else if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }else{
            this.getBase64(file,imageUrl => {
                var base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '')
                this.setState({
                    imageUrl,
                    file:base64Data
                })
            })
        }
        return false
        // return isJpgOrPng && isLt2M;
    }

    handleCancel = () => {
        this.setState({ visible: false })
    }
    handleOk = () => {
        
        const { file,name,desc } = this.state
        if(name === ''){
            return message.warning('歌单名称不能为空.')
        }

        this.setState({ loading: true });
        var forms = new FormData()
        forms.append('file',file)
        forms.append('name',name)
        forms.append('desc',desc)
        reqAddUserSheet(forms).then(res => {
            this.setState({ 
                loading: false,
                visible: false,
                file:"",
                name:'',
                desc:'',
                imageUrl:""
            });
            this.props.setUserSheets()
            message.info("歌单创建成功.")
        }).catch(() => {
            this.setState({ 
                loading: false, 
                visible: false,
                file:"",
                name:'',
                desc:'',
                imageUrl:""
            });
        })
    }
    setParam = (name,event) => {
        this.setState({
            [name]:event.target.value
        })
    }
    setShowType = (val) => {
        this.setState({
            showType:val
        })
    }
    replaceImg = (e) => {
        e.target.src = require('../../../assets/images/timg.jpg')
    }
    delRecord = (item) => {
        this.setState({delLoading:true})
        reqDelUserSheet({sheetId:item.sheetId}).then(() => {
            message.success("删除成功.")
            this.props.setUserSheets()
            this.setState({delLoading:false})
        }).catch(() => {
            this.setState({delLoading:false})
        })
    }
    render(){

        const { userSheet } = this.props
        userSheet.forEach((item,index) => {
            item.key = index
        })
        const { loading,visible,name,desc,imageUrl,showType,delLoading } = this.state
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const columns = [
            {
              title: '歌单',
              dataIndex: 'name',
              render:(text, record, index) => {
                  return (
                      
                      <div className="song_msg">
                          <div className="mod_songlist--edit songlist__number" style={{ color: "#000" }}>{ index + 1 }</div>
                          <img src={ record.sheetCover } alt="封面" className="song_cover" onError={(e) => this.replaceImg(e) } style={{ width:60,height:60 }}/>
                          <div className="song_name">
                              {text}
                          </div>
                          <div className="mod_list_menu mytoolbtn">
                              <Space>
                                  <Button shape="circle" icon={<CaretRightOutlined />}  onClick={() =>this.playThis(record,index) }></Button>
                                  <Button shape="circle" icon={<PlusOutlined />}></Button>
                                  <Button shape="circle" icon={<VerticalAlignBottomOutlined />}></Button>
                                  <Button shape="circle" icon={<ShareAltOutlined />}></Button>
                              </Space>
                          </div>
                      </div>
                  )
              }
          
            },
            {
              title: '创建时间',
              dataIndex: 'title',
              width:400,
              render:(text,record,index) => {
                  return(
                      <div>
                          { formatMoment(record.createTime) }
                      </div>
                  )
              }
            },
            {
              title: '操作',
              dataIndex: 'interval',
              width:200,
              render:(text,record) => {
                  return (
                      <div>

                            <Popconfirm
                                title="Are you sure delete this task?"
                                onConfirm={() => this.delRecord(record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary">删除</Button>
                            </Popconfirm>
                      </div>
                  )
              }
            },
        ];

        return (
            <div className="main main--profile myclassfid">
                <div className="playlist_toolbar">
                    <button className="mod_btn js_create_new" onClick={ () => this.showModel() }>
                        <i className="mod_btn__icon_new"></i>
                        新建歌单
                    </button>

                    <button className="mod_btn js_import">
                        <i className="mod_btn__icon_input"></i>
                        导入歌单  
                    </button>

                    <button className="mod_btn js_recover">
                        <i className="mod_btn__icon_recovery"></i>
                        恢复歌单  
                    </button>


                    <div className="style_switch" aria-label="排列方式">
                        <div className={`style_switch__item ${showType === 0?'style_switch__item--select':''}`} onClick={ () => this.setShowType(0) }><i className="icon_style_pic sprite"></i><span className="icon_txt">上图下文</span></div>
                        <div className={`style_switch__item ${showType === 1?'style_switch__item--select':''}`}  onClick={ () => this.setShowType(1) }><i className="icon_style_list sprite"></i><span className="icon_txt">列表</span></div>
                    </div>
                </div>
                <div className="classList">
                    

                    {
                        showType === 0?
                        <div style={{ position:'relative',width:'100%',display:'flex',flexWrap:'wrap' }}>
                                {
                                    userSheet.map(item => (
                                        <div className="playlist__item slide__item classified" key={item.sheetId} style={{display:'block'}}>
                                            <div className="playlist__item_inner">
                                                <div className="playlist__cover ">
                                                    <img className="playlist__pic" src={item.sheetCover} alt="封面" style={{width:'100%',height:'100%'}} onError={ (e) => this.replaceImg(e) }/>
                                                    <i className="mod_cover__mask"  onClick={ () => this.toClassDetail(item) }></i>
                                                    <i className="mod_cover__icon_play js_play" onClick={ () => this.playThis(item) }></i>
                                                </div>
                                                <h4 className="playlist__title">
                                                    <span className="playlist__title_txt">{item.name}</span>	
                                                </h4>
                                                <div className="playlist__other" style={{ overflow:'hidden',whiteSpace:'nowrap',textOverflow:"ellipsis"}}>
                                                    { item.desc }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                
                        </div>
                        :
                        <Spin spinning={delLoading}>
                            <div className="mod_songlist">
                                <Table columns={columns} dataSource={userSheet}  pagination={false} rowClassName={'rowClassName'}/>
                            </div>
                        </Spin>
                        
                    }
                </div>


                <Modal
                    visible={visible}
                    title="新建歌单"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            确定
                        </Button>,
                    ]}
                    >
                    <Form>
                        <Form.Item label="歌单名称">
                            <Input placeholder="请输入歌单名称." onChange={ (input) => this.setParam('name',input) } value={name}></Input>
                        </Form.Item>
                        <Form.Item label="歌单简介">
                            <Input.TextArea onChange={ val => this.setParam('desc',val) } placeholder="请输入歌单简介." value={desc}/>
                        </Form.Item>
                        <Form.Item label="歌单封面">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={this.beforeUpload}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>   
                    </Form>   
                </Modal>
            </div>
        )
    }
}
export default connect(
    state=>({userSheet:state.userSheet}),
    { setUserSheets }
)(MyClassifid)