
import React  from 'react'
import { Input,Space,Button } from 'antd'
import { UserOutlined,LockOutlined  } from '@ant-design/icons';
import './register.less'
import { reqRegister } from '../../api/index'
class Register extends React.Component{
	
	state = {
		username:'',
		password:'',
		password2:''
	}
	
	handleChange = (name,val) => {
		this.setState({
			[name]:val.target.value
		})
	}
	onSubmit = () => {
		console.log(this.state)
		reqRegister(this.state)
	}
	toLogin = () => {
		this.props.history.replace('/login')
	}
	
	
	render(){
	
		return(
			<div className="register">
				<div className="register_box">
					<Space direction="vertical" style={{'width': '100%'}} size="large">
						<h1>用户注册</h1>	
						<Input size="large" placeholder="用户名" prefix={<UserOutlined />} onChange={ val => {this.handleChange('username',val)} }/>
						<Input type="password" size="large" placeholder="密码" prefix={<LockOutlined />} onChange={ val => {this.handleChange('password',val)} } />
						<Input type="password" size="large" placeholder="重复密码" prefix={<LockOutlined />} onChange={ val => {this.handleChange('password2',val)} } />
						<Button type="primary" block onClick={ this.onSubmit }>注册</Button>
						<Button block onClick={ this.toLogin }>已有账号?去登陆.</Button>
					</Space>
				</div>
			</div>
		) 
	}
}

export default Register