

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
					
					<ul className="mod_top_nav" >
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
							  placeholder="搜索音乐、MV、歌单、用户"
							  onSearch={value => console.log(value)}
							  style={{ width: 220 }}
							/>
							<div className="js_smartbox">
								<div className="mod_search_other">
									<div className="search_hot">
										<dl className="search_hot__list" >
											<dt className="search_hot__tit">热门搜索</dt>
											<dd>
												
												<p  className="search_hot__link js_smartbox_search js_left" data-name="我们的歌">
													<span className="search_hot__number">1</span>
													<span className="search_hot__name">我们的歌</span>
													<span className="search_hot__listen">76.6万</span>
												</p>
												
												<p  className="search_hot__link js_smartbox_search js_left" data-name="冰雪奇缘2">
													<span className="search_hot__number">2</span>
													<span className="search_hot__name">冰雪奇缘2</span>
													<span className="search_hot__listen">58.7万</span>
												</p>
												
												<p  className="search_hot__link js_smartbox_search js_left" data-name="张杰">
													<span className="search_hot__number">3</span>
													<span className="search_hot__name">张杰</span>
													<span className="search_hot__listen">32.4万</span>
												</p>
												
												<p className="search_hot__link js_smartbox_search js_left" data-name="桥边姑娘">
													<span className="search_hot__number">4</span>
													<span className="search_hot__name">桥边姑娘</span>
													<span className="search_hot__listen">28.8万</span>
												</p>
												
												<p className="search_hot__link js_smartbox_search js_left" data-name="星辰大海">
													<span className="search_hot__number">5</span>
													<span className="search_hot__name">星辰大海</span>
													<span className="search_hot__listen">20.3万</span>
												</p>
												
											</dd>
										</dl>
									</div>
									<div className="search_history">
										<dl className="search_history__list">
											<dt className="search_history__tit">搜索历史
												<span  className="search_history__clear js_smartbox_delete_all">
													<i className="icon_history_clear"></i>
													<span className="icon_txt">清空</span>
												</span>
											</dt>
								
											<dd className="search_history__item">
												<span  className="search_history__link js_smartbox_search js_left" data-name="许嵩">许嵩</span>
												<span  className="search_history__delete js_smartbox_delete" data-name="许嵩" title="删除">
													<i className="search_history__icon_delete">
													</i><span className="icon_txt">删除</span>
												</span>
											</dd>
									
										</dl>
									</div>
									
									
									
									
								</div>
								<div className="mod_search_result " >
									<div className="search_result__sort">
										<h4 className="search_result__tit"><i className="search_result__icon_song"></i>单曲</h4>
										<ul className="search_result__list">

											<li>
												<p className="search_result__link js_smartbox_song">
													<span className="search_result__name">素颜</span>-
													<span className="search_result__singer"><span className="search_result__keyword">许嵩</span>/何曼婷</span>
												</p>
											</li>

											<li>
												<p className="search_result__link js_smartbox_song">
													<span className="search_result__name">有何不可</span>-
													<span className="search_result__singer"><span className="search_result__keyword">许嵩</span></span>
												</p>
											</li>

											<li>
												<p className="search_result__link js_smartbox_song" >
													<span className="search_result__name">雅俗共赏</span>-
													<span className="search_result__singer"><span className="search_result__keyword">许嵩</span></span>
												</p>
											</li>

											<li>
												<p className="search_result__link js_smartbox_song" >
													<span className="search_result__name">断桥残雪</span>-
													<span className="search_result__singer"><span className="search_result__keyword">许嵩</span></span>
												</p>
											</li>

										</ul>
									</div>
									


									
									<div className="search_result__sort">
										<h4 className="search_result__tit"><i className="search_result__icon_singer"></i>歌手</h4>
										<ul className="search_result__list">

											<li>
												<p className="search_result__link js_smartbox_singer" >
													<span className="search_result__name"><span className="search_result__keyword">许嵩</span></span>
												</p>
											</li>

										</ul>
									</div>
									


									
									<div className="search_result__sort">
										<h4 className="search_result__tit"><i className="search_result__icon_album"></i>专辑</h4>
										<ul className="search_result__list">

											<li>
												<p className="search_result__link js_smartbox_album">
													<span className="search_result__name">自定义</span>
													<span className="search_result__singer"><span className="search_result__keyword">许嵩</span></span>
												</p>
											</li>

											<li>
												<p className="search_result__link js_smartbox_album" >
													<span className="search_result__name">Vae新歌+精选珍藏合辑</span>
													<span className="search_result__singer"><span className="search_result__keyword">许嵩</span></span>
												</p>
											</li>

										</ul>
									</div>
									
									<div className="search_result__sort">
										<h4 className="search_result__tit"><i className="search_result__icon_mv"></i>MV</h4>
										<ul className="search_result__list">

											<li>
												<p className="search_result__link js_smartbox_mv" >
													<span className="search_result__name">雅俗共赏</span>-
													<span className="search_result__singer"><span className="search_result__keyword">许嵩</span></span>
												</p>
											</li>

											<li>
												<p className="search_result__link js_smartbox_mv" >
													<span className="search_result__name">素颜</span>-
													<span className="search_result__singer"><span className="search_result__keyword">许嵩</span>/何曼婷</span>
												</p>
											</li>

										</ul>
									</div>
									
								</div>
							</div>
						</div>
					</div>
					<div className="header__opt">
						<div className="top_login__link js_logined">
							<img src="http://thirdqq.qlogo.cn/g?b=sdk&k=5GvhCOicBXrBf50u3StdLRw&s=140&t=1550910887" alt="头像" className="top_login__cover js_user_img"/>	
						</div>	
						<div className="mod_btn_green top_login__btn_vip js_openvip" >开通绿钻豪华版</div>	
						<div className="mod_btn top_login__btn_vip js_openmusic">开通付费包</div>
					</div>
				</div>	
			</div>
		)
	}
}