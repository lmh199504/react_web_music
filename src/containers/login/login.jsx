
import React from 'react'
import { Input,Space,Button } from 'antd';
import { UserOutlined,LockOutlined  } from '@ant-design/icons';
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import './login.less'
class Login extends React.Component{
	
	state = {
		username:'',
		password:''
	}
	
	handleChange = (name,val) => {
		this.setState({
			[name]:val.target.value
		})
	}
	onSubmit = () => {
		// reqLogin(this.state)
		this.props.login(this.state)
	}
	toRegister = () => {
		this.props.history.replace('/register')
	}
	
	render(){
		const { username } = this.props.user
		const koaSess = Cookies.get('userKey')
		if(username && koaSess){
			return <Redirect to='/'/>
		}
		
		return (
			<div className="login">
				<div className="login_box">
				
					<Space direction="vertical" style={{'width': '100%'}} size="large">
						<h1>用户登陆</h1>	
						<Input size="large" placeholder="用户名" prefix={<UserOutlined />} onChange={ val => {this.handleChange('username',val)} } onPressEnter={ () => this.onSubmit() }/>
						<Input type="password" size="large" placeholder="密码" prefix={<LockOutlined />} onChange={ val => {this.handleChange('password',val)} } onPressEnter={ () => this.onSubmit() }/>
						<Button type="primary" block onClick={ this.onSubmit }>登陆</Button>
						<Button block onClick={ this.toRegister }>没有账号?去注册.</Button>
					</Space>
				</div>
			</div>
		)
	}
}

export default connect(
	state=>({user:state.user}),
	{login}
)(Login)