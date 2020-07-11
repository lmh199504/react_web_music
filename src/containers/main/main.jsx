

import React from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { Button } from 'antd'
import { Redirect,Switch,Route } from 'react-router-dom'
import MusicHall from '../musichall/musichall'
import MyMusic from '../mymusic/mymusic'
import Vip from '../vip/vip'
import Client from '../client/client'
import Platform from '../platform/platform'
import { getUserInfo,logout } from '../../redux/actions'


import NavHeader from '../navHeader/navHeader'
class Main extends React.Component{
	
	
	render(){
		
		
		const { username } = this.props.user 
		const koaSess = Cookies.get('userKey')
		if(koaSess && !username){
			this.props.getUserInfo()
		}else if(!username && !koaSess){
			return <Redirect to="/login"/>
		}
		return (
			<div>
				<NavHeader />
				
				<Switch>
					<Route path="/musichall" component={MusicHall} />
					<Route path="/mymusic" component={MyMusic}/>
					<Route path='/vip' component={Vip}/>
					<Route path='/client' component={Client}/>
					<Route path='/platform' component={Platform}/>
					<Redirect to='/musichall'/>
				</Switch>
			</div>
		)
	}
}

export default connect(
	state=>({user:state.user}),
	{getUserInfo,logout}
)(Main)