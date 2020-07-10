

import React from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { getUserInfo } from '../../redux/actions'
class Main extends React.Component{
	
	
	render(){
		const { username } = this.props.user 
		const koaSess = Cookies.get('koa:sess')
		if(koaSess && !username){
			console.log('登陆了但是没有用户信息，应该去获取')
			this.props.getUserInfo()
			
		}else if(!username && !koaSess){
			console.log("没有登陆，跳转登陆页")
		}
		return <div>我是main</div>
	}
}

export default connect(
	state=>({user:state.user}),
	{getUserInfo}
)(Main)