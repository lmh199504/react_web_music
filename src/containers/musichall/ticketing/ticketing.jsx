

import React,{ Component } from 'react'

export default class Ticketing extends Component{
	
	render(){
		return (
			<div className="main">
				<h1 style={{ marginTop:60,fontWeight:'bold',textAlign:'center' }}>票卖完了~</h1>
				<img src={ require('../../../assets/images/bg_profile.jpg') } alt="票务" width="100%"/>
			</div>
		)
	}
}