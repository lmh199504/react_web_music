

import React,{ Component } from 'react'
import './myclassfid.less'
import { connect } from 'react-redux'
import { formatNum } from '../../../utils'
import { Modal,Button,Input,Form,Upload,message  } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { reqAddUserSheet } from '../../../api'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}




class MyClassifid extends Component{
    state = {
        loading: false,
        visible: false,
        file:"",
        name:'',
        desc:''

    }

    showModel = () => {
        this.setState({
            visible:true
        })
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
            getBase64(file,imageUrl => {
                this.setState({
                    imageUrl
                })
               
            })
            this.setState({
                file
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
        console.log(forms.get('file'))

        reqAddUserSheet(forms).then(res => {
            console.log(res)
        })
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    setParam = (name,event) => {
        this.setState({
            [name]:event.target.value
        })
    }
    changeFile = (e) => {
        // console.log(e)
        console.log(this.refs.upLoadImg.files[0])
    }
    render(){

        const { loveSheet } = this.props
        const { loading,visible } = this.state
        const { imageUrl } = this.state;
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
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
                        <div className="style_switch__item"><i className="icon_style_pic sprite"></i><span className="icon_txt">上图下文</span></div>
                        <div className="style_switch__item style_switch__item--select" ><i className="icon_style_list sprite"></i><span className="icon_txt">列表</span></div>
                    </div>
                </div>
                <div className="classList">
                    <div style={{ position:'relative',width:'100%',display:'flex',flexWrap:'wrap' }}>
                            {
                                loveSheet.map(item => (
                                    <div className="playlist__item slide__item classified" key={item.dissid} style={{display:'block'}}>
                                        <div className="playlist__item_inner">
                                            <div className="playlist__cover ">
                                                <img className="playlist__pic" src={item.logo} alt="封面" />
                                                <i className="mod_cover__mask"  onClick={ () => this.toClassDetail(item) }></i>
                                                <i className="mod_cover__icon_play js_play" onClick={ () => this.playThis(item) }></i>
                                            </div>
                                            <h4 className="playlist__title">
                                                <span className="playlist__title_txt">{item.dissname}</span>	
                                            </h4>
                                            <div className="playlist__other">
                                                播放量：{formatNum(item.visitnum)}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                    </div>
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
                            <Input placeholder="请输入歌单名称." onChange={ (input) => this.setParam('name',input) } ></Input>
                        </Form.Item>
                        <Form.Item label="歌单简介">
                            <Input.TextArea onChange={ val => this.setParam('desc',val) } placeholder="请输入歌单简介."/>
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
    state=>({loveSheet:state.loveSheet})
)(MyClassifid)