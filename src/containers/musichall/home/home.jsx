
import React,{ Component } from 'react'

import Suggest from './suggest/suggest'
import NewSong from './newsong/newsong'
import Marvellous from './marvellous/marvellous'
import Newdisc from './Newdisc/Newdisc'
import Ranking from './Ranking/Ranking'
import Mv from './mv/mv'
import './home.less'



export default class Home extends Component{
	
	
	
	render(){

		return (
			<div>
				<Suggest></Suggest>
				<NewSong></NewSong>
				<Marvellous></Marvellous>
				<Newdisc></Newdisc>
				<Ranking></Ranking>
				<Mv></Mv>
			</div>
		)
	}
}