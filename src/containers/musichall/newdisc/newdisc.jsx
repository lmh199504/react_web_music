
import React,{ Component } from 'react'
import { Pagination } from 'antd';
import './newdisc.less'
export default class NewDisc extends Component{
	
	render(){
		return (
			<div className="main">
				<div className="mod_tag" id="tag_list">
					<div className="tag__list">
						<div className="tag__item tag__item--select">内地</div>
						<div className="tag__item ">港台</div>
						<div className="tag__item ">韩国</div>
						<div className="tag__item ">日本</div>
						<div className="tag__item ">其他</div>
					</div>
				</div>
				
				<div className="mod_part_detail">
					<div className="mod_playlist mod_playlist--all">
						<div className="playlist__list" id="album_list">
							<li className="playlist__item">
								<div className="playlist__item_box">
									<div className="playlist__cover mod_cover">
										<div className="js_album">
											<img src="//y.gtimg.cn/music/photo_new/T002R300x300M000002MPkMu2Hszhr_1.jpg?max_age=2592000" alt="守候" className="playlist__pic" style={{ display: 'block',visibility: 'visible' }}/>
											<i className="mod_cover__icon_play js_play" ></i>
										</div>
									</div>
									<h4 className="playlist__title">
										<span className="playlist__title_txt">
											<p className="js_album"  title="守候">守候</p>
										</span>
									</h4>
									<div className="playlist__author" title="刘瑞琦">
										<p className="js_singer" >刘瑞琦</p>
									</div>
									<div className="playlist__other">
										2020-07-14
									</div>
								</div>
							</li>
							<li className="playlist__item">
								<div className="playlist__item_box">
									<div className="playlist__cover mod_cover">
										<div className="js_album">
											<img src="//y.gtimg.cn/music/photo_new/T002R300x300M000002MPkMu2Hszhr_1.jpg?max_age=2592000" alt="守候" className="playlist__pic" style={{ display: 'block',visibility: 'visible' }}/>
											<i className="mod_cover__icon_play js_play" ></i>
										</div>
									</div>
									<h4 className="playlist__title">
										<span className="playlist__title_txt">
											<p className="js_album"  title="守候">守候</p>
										</span>
									</h4>
									<div className="playlist__author" title="刘瑞琦">
										<p className="js_singer" >刘瑞琦</p>
									</div>
									<div className="playlist__other">
										2020-07-14
									</div>
								</div>
							</li>
							<li className="playlist__item">
								<div className="playlist__item_box">
									<div className="playlist__cover mod_cover">
										<div className="js_album">
											<img src="//y.gtimg.cn/music/photo_new/T002R300x300M000002MPkMu2Hszhr_1.jpg?max_age=2592000" alt="守候" className="playlist__pic" style={{ display: 'block',visibility: 'visible' }}/>
											<i className="mod_cover__icon_play js_play" ></i>
										</div>
									</div>
									<h4 className="playlist__title">
										<span className="playlist__title_txt">
											<p className="js_album"  title="守候">守候</p>
										</span>
									</h4>
									<div className="playlist__author" title="刘瑞琦">
										<p className="js_singer" >刘瑞琦</p>
									</div>
									<div className="playlist__other">
										2020-07-14
									</div>
								</div>
							</li>
							<li className="playlist__item">
								<div className="playlist__item_box">
									<div className="playlist__cover mod_cover">
										<div className="js_album">
											<img src="//y.gtimg.cn/music/photo_new/T002R300x300M000002MPkMu2Hszhr_1.jpg?max_age=2592000" alt="守候" className="playlist__pic" style={{ display: 'block',visibility: 'visible' }}/>
											<i className="mod_cover__icon_play js_play" ></i>
										</div>
									</div>
									<h4 className="playlist__title">
										<span className="playlist__title_txt">
											<p className="js_album"  title="守候">守候</p>
										</span>
									</h4>
									<div className="playlist__author" title="刘瑞琦">
										<p className="js_singer" >刘瑞琦</p>
									</div>
									<div className="playlist__other">
										2020-07-14
									</div>
								</div>
							</li>
							<li className="playlist__item">
								<div className="playlist__item_box">
									<div className="playlist__cover mod_cover">
										<div className="js_album">
											<img src="//y.gtimg.cn/music/photo_new/T002R300x300M000002MPkMu2Hszhr_1.jpg?max_age=2592000" alt="守候" className="playlist__pic" style={{ display: 'block',visibility: 'visible' }}/>
											<i className="mod_cover__icon_play js_play" ></i>
										</div>
									</div>
									<h4 className="playlist__title">
										<span className="playlist__title_txt">
											<p className="js_album"  title="守候">守候</p>
										</span>
									</h4>
									<div className="playlist__author" title="刘瑞琦">
										<p className="js_singer" >刘瑞琦</p>
									</div>
									<div className="playlist__other">
										2020-07-14
									</div>
								</div>
							</li>
							<li className="playlist__item">
								<div className="playlist__item_box">
									<div className="playlist__cover mod_cover">
										<div className="js_album">
											<img src="//y.gtimg.cn/music/photo_new/T002R300x300M000002MPkMu2Hszhr_1.jpg?max_age=2592000" alt="守候" className="playlist__pic" style={{ display: 'block',visibility: 'visible' }}/>
											<i className="mod_cover__icon_play js_play" ></i>
										</div>
									</div>
									<h4 className="playlist__title">
										<span className="playlist__title_txt">
											<p className="js_album"  title="守候">守候</p>
										</span>
									</h4>
									<div className="playlist__author" title="刘瑞琦">
										<p className="js_singer" >刘瑞琦</p>
									</div>
									<div className="playlist__other">
										2020-07-14
									</div>
								</div>
							</li>
						</div>
					</div>
				</div>
				<Pagination defaultCurrent={6} total={500}  style={{marginBottom:60,textAlign:'center'}}/>
			</div>
		)
	}
}