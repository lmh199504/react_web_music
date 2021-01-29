
import React,{ Component } from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload

const props = {
  name: 'file',
  multiple: true,
  action: '/api/user/uploadFile',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
}
export default class Test extends Component{
	render(){
		return (
			<div style={{ width:"50%",marginLeft: '25%',marginTop:'100px' }}>
				<Dragger {...props}>
					<p className="ant-upload-drag-icon">
					  <InboxOutlined />
					</p>
					<p className="ant-upload-text">Click or drag file to this area to upload</p>
					<p className="ant-upload-hint">
					  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
					  band files
					</p>
				</Dragger>
			</div>
		)
	}
}