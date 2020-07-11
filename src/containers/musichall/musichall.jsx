
import React,{ Component } from 'react'
import { NavLink } from 'react-router-dom'
import './musichall.less'
export default class MusicHall extends Component{
	
	render(){
		return(
			<div>
				<div>
					<ul className="mod_top_subnav" >
						<li className="top_subnav__item">
							<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/home'>首页</NavLink>
						</li>
						<li className="top_subnav__item">
							<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/singer'>歌手</NavLink>
						</li>
						<li className="top_subnav__item">
							<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/newdisc'>新碟</NavLink>
						</li>
						<li className="top_subnav__item">
							<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/rankinglist'>排行榜</NavLink>
						</li>
						<li className="top_subnav__item">
							<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/classified'>分类歌单</NavLink>
						</li>
						<li className="top_subnav__item">
							<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/radioStation'>电台</NavLink>
						</li>
						<li className="top_subnav__item">
							<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/mv'>MV</NavLink>
						</li>
						<li className="top_subnav__item">
							<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/digital'>数字专辑</NavLink>
						</li>
						<li className="top_subnav__item">
							<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/ticketing'>票务</NavLink>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}