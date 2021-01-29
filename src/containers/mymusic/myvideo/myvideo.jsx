

import React,{ Component } from 'react'
import { Upload, Button, Row, Col, Modal, Form, Input } from 'antd';
import { UploadOutlined,LoadingOutlined,PlusOutlined } from '@ant-design/icons';
import NoData from '../../../components/noData/noData'

const list = [{
	mv_id:1,
	picurl: 'http://reactlmh.oss-cn-beijing.aliyuncs.com/userheader/5f2b58dec2b99b1cfc48610a.png?t=0.7755280010311785',
	mvtitle: '111',
	singer_name: '1000'
},
{
	mv_id:2,
	picurl: 'http://reactlmh.oss-cn-beijing.aliyuncs.com/userheader/5f2b58dec2b99b1cfc48610a.png?t=0.7755280010311785',
	mvtitle: '111',
	singer_name: '1000'
},
{
	mv_id:3,
	picurl: 'http://reactlmh.oss-cn-beijing.aliyuncs.com/userheader/5f2b58dec2b99b1cfc48610a.png?t=0.7755280010311785',
	mvtitle: '1',
	singer_name: '1000'
},
{
	mv_id:4,
	picurl: 'http://reactlmh.oss-cn-beijing.aliyuncs.com/userheader/5f2b58dec2b99b1cfc48610a.png?t=0.7755280010311785',
	mvtitle: '111',
	singer_name: '1000'
},
{
	mv_id:5,
	picurl: 'http://reactlmh.oss-cn-beijing.aliyuncs.com/userheader/5f2b58dec2b99b1cfc48610a.png?t=0.7755280010311785',
	mvtitle: '111',
	singer_name: '1000'
},
{
	mv_id:6,
	picurl: 'http://reactlmh.oss-cn-beijing.aliyuncs.com/userheader/5f2b58dec2b99b1cfc48610a.png?t=0.7755280010311785',
	mvtitle: '111',
	singer_name: '1000'
}
]
export default class MyVideo extends Component{
	state = {
		isModalVisible: false,
		desc: '',
		title: '',
		fileList: [],
		videoUrl: '',
		loading: false
	}
	handleOk = () => {
		this.setState({
			isModalVisible: false
		})
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
	
    render(){
		const { isModalVisible, desc, title } = this.state
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
							<Col xs={2} sm={4} md={6} lg={6} xl={6} key={item.mv_id}>
								<div className="mv_list__item" style={{ width:'100%',textAlign:'left' }}>
									<div className="mv_list__item_box">
										<div className="mv_list__cover mod_cover js_mv">
											<img className="mv_list__pic" src={item.picurl} alt="mv"/>
											<i className="mod_cover__icon_play"></i>
										</div>
										<h3 className="mv_list__title">
											<span className="js_mv">{item.mvtitle}</span>
										</h3>
										<p className="mv_list__singer">
											<span className="js_singer">{item.singer_name}</span>
										</p>
										<div className="mv_list__info">
											<span className="mv_list__listen"><i className="mv_list__listen_icon sprite"></i>{2000}</span>
										</div>
									</div>
								</div>	
							</Col>
						))
					}
				</Row>
				
				<Modal title="上传视频" cancelText="取消" okText="确认" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<Form.Item label="标题">
					    <Input placeholder="标题." onChange={ (input) => this.setParam('title',input) } value={title}></Input>
					</Form.Item>
					<Form.Item label="描述">
						<Input placeholder="描述." onChange={ (input) => this.setParam('desc',input) } value={desc}></Input>
					</Form.Item>
					<Form.Item label="视频">
						<Upload maxCount={1}>
							<Button icon={<UploadOutlined />}>Upload</Button>
						</Upload>
					</Form.Item>
					
				</Modal>
                <NoData/>
            </div>
        )
    }
}