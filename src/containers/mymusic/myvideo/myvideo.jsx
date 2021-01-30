

import React,{ Component } from 'react'
import { Upload, Button, Row, Col, Modal, Form, Input, message, Spin, Popconfirm } from 'antd';
import { LoadingOutlined,PlusOutlined } from '@ant-design/icons';
import NoData from '../../../components/noData/noData'
import { uploadVideo,getUserVideo,delUserVideo } from '../../../api'
import { formatMoment } from '../../../utils'
import { connect } from 'react-redux'
import { showMvPlayer,setCurrentMv } from '../../../redux/actions'
class MyVideo extends Component{
	state = {
		isModalVisible: false,
		desc: '',
		title: '',
		fileList: [],
		videoUrl: '',
		file: '',
		loading: false,
		list: []
	}
	handleOk = () => {
		const { desc, title, file } = this.state
		if (!desc || !title || !file) {
			message.error('数据不完整')
			return
		}
		const formData = new FormData();
		formData.append('desc',desc)
		formData.append('title',title)
		formData.append('files',file)
		this.setState({
			loading: true
		})
		uploadVideo(formData).then(res => {
			this.setState({
				isModalVisible: false,
				loading: false,
				title: '',
				desc: '',
				videoUrl: '',
				file: ''
			})
			this.getList()
		}).catch(() => {
			this.setState({
				loading: false
			})
		})
	}
	getBase64(img, callback) {
	    const reader = new FileReader();
	    reader.addEventListener('load', () => callback(reader.result));
	    reader.readAsDataURL(img);
	}
	handleCancel = () => {
		this.setState({
			isModalVisible: false
		})
	}
	showModal = () => {
		this.setState({
			isModalVisible: true
		})
	}
	setParam = (name,input) => {
		this.setState({
			[name]: input.target.value 
		})
	}
	beforeUpload = (file) => {
		const isMP4 = file.type === 'video/mp4'
		const isLt50M = file.size / 1024 / 1024 < 150;
		
		if (!isMP4) {
		    message.error('请上传MP4');
		} else if (!isLt50M){
			message.error('请上传小于150M的视频');
		} else {
			this.setState({
				file: file
			})
			
			this.getBase64(file,imageUrl => {
			    this.setState({
			        videoUrl: imageUrl
			    })
			})
		}
		
		return false
	}
	onChangeFile = ({ file, fileList }) => {
		if (file.status !== 'uploading') {
			console.log(file, fileList);
			while(fileList.length>1){
				fileList.shift()
				this.setState({
					fileList:fileList
				})
			}
		}	
	}
		
	componentDidMount = () => {
		this.getList()
	}
	
	getList = () => {
		getUserVideo().then(res => {
			if (res.code === 0) {
				this.setState({
					list:res.data.list
				})
			}
		})
	}
	cancel = () => {
		message.info('取消')
	}
	playVideo = (item) => {
		this.props.showMvPlayer()
		this.props.setCurrentMv({url:item.url})
	}
	delVideo = (item) => {
		delUserVideo({videoId:item._id}).then(res => {
			if(res.code === 0){
				message.success('删除成功')
				this.getList()
			}
		}) 
	}
    render(){
		const { isModalVisible, desc, title,videoUrl,list } = this.state
		const uploadButton = (
		    <div>
		        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
		        <div className="ant-upload-text">Upload</div>
		    </div>
		);
        return(
            <div style={{color:"#000",paddingTop:'10px',textAlign:'left'}}>
				<Button type="primary" style={{ marginBottom:'15px' }} onClick={this.showModal}>上传视频</Button>
				<Row gutter={15}>
					{
						list.map(item => (
							<Col xs={2} sm={4} md={6} lg={6} xl={6} key={item._id}>
								<div className="mv_list__item" style={{ width:'100%',textAlign:'left' }}>
									<div className="mv_list__item_box">
										<div className="mv_list__cover mod_cover js_mv"  onClick={ () =>  this.playVideo(item) }>
											<img className="mv_list__pic" src={item.picurl} alt="mv"/>
											<i className="mod_cover__icon_play"></i>
										</div>
										<h3 className="mv_list__title">
											<span className="js_mv">{item.title}</span>
										</h3>
										<p className="mv_list__singer">
											<span className="js_singer">{item.desc}</span>
										</p>
										<p className="mv_list__singer">
											<span className="js_singer">{formatMoment(item.createTime)}</span>
										</p>
										<div>
											<Popconfirm
											    title="Are you sure to delete this task?"
											    onConfirm={() => this.delVideo(item)}
											    onCancel={this.cancel}
											    okText="Yes"
											    cancelText="No"
											  >
												<Button size="small" type="primary">删除</Button>
											  </Popconfirm>
										</div>	
									</div>
								</div>	
							</Col>
						))
					}
				</Row>
				
				<Modal title="上传视频" cancelText="取消" okText="确认" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<Spin spinning={ this.state.loading } tip="上传中...">
						<Form.Item label="标题">
							<Input placeholder="标题." onChange={ (input) => this.setParam('title',input) } value={title}></Input>
						</Form.Item>
						<Form.Item label="描述">
							<Input placeholder="描述." onChange={ (input) => this.setParam('desc',input) } value={desc}></Input>
						</Form.Item>
						<Form.Item label="视频">
							<Upload beforeUpload={this.beforeUpload} onChange={this.onChangeFile} showUploadList={false} listType="picture-card">
								{videoUrl ? <video src={ videoUrl } style={{ width:'60px' }}></video> : uploadButton}
							</Upload>
						</Form.Item>
					</Spin>
				</Modal>
               { list.length === 0  ? <NoData/> :''}
            </div>
        )
    }
}

export default  connect(
	state => ({}),
	{ showMvPlayer,setCurrentMv }
)(MyVideo)