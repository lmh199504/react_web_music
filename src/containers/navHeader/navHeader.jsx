

import React,{ Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'

import './index.less'
const { Search } = Input
export default class NavHeader extends Component{
	
	render(){
		
		return (
			<div className="mod_header">
				<div className="section_inner">
					<h1 className="qqmusic_title">
						<a href="//y.qq.com">
							<img src={require('../../assets/images/logo@2x.png')} alt="QQ音乐" className="qqmusic_logo"/>
						</a>
					</h1>
					
					<ul className="mod_top_nav" role="nav">
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to='/musichall'>音乐馆</NavLink>
						</li>
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to= '/mymusic' >我的音乐</NavLink>
						</li>
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to='/client'>客户端</NavLink>
							
						</li>
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to='/platform'>开放平台</NavLink>
						</li>
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to='/vip'>VIP</NavLink>
						</li>
					</ul>
					
					<div className="mod_top_search">
						<div className="mod_search_input">
							<Search
							  placeholder="input search text"
							  onSearch={value => console.log(value)}
							  style={{ width: 220 }}
							/>
							<div className="mod_search_result">
								<div className="search_result__sort"></div>
							</div>
						</div>
					</div>
					<div className="header__opt">
						
					</div>
				</div>	
			</div>
		)
	}
}