
import React,{ Component } from 'react'
import { Pagination } from 'antd';
import './singer.less'
export default class Singer extends Component{
	render(){
		return (
			<div>
				<div className="mod_singer_push js_my_singers_nologin mod_singer_push--nofocus">
					<div>
						<div className="section_inner">
							<h2 className="singer_push__tit"><i className="icon_txt">万千歌手，尽在眼前</i></h2>
							<div className="singer_push__desc"><i className="icon_txt">登录查看你关注的歌手</i></div>
						</div>
					</div>
				</div>
				<div className="main">
					<div className="mod_singer_tag" id="tag_box">
						<div className="singer_tag__list js_index">
							<p className="singer_tag__item singer_tag__item--all singer_tag__item--select" >热门</p>
							<p className="singer_tag__item">B</p>
							<p className="singer_tag__item">C</p>
						</div>
						<div className="singer_tag__list js_area">
							<p className="singer_tag__item singer_tag__item--all singer_tag__item--select" >全部</p>
							<p className="singer_tag__item">内地</p>
							<p className="singer_tag__item">港台</p>
						</div>
						<div className="singer_tag__list js_sex">
							<p className="singer_tag__item singer_tag__item--all singer_tag__item--select" >全部</p>
							<p className="singer_tag__item">男</p>
							<p className="singer_tag__item">女</p>
							<p className="singer_tag__item">组合</p>
						</div>
						<div className="singer_tag__list js_genre">
							<p className="singer_tag__item singer_tag__item--all singer_tag__item--select" >全部</p>
							<p className="singer_tag__item">流行</p>
							<p className="singer_tag__item">嘻哈</p>
							<p className="singer_tag__item">摇滚</p>
						</div>
					</div>
					
					
					<div id="mod-singerlist">
						<div className="mod_singer_list">
							<ul className="singer_list__list js_avtar_list">
								<li className="singer_list__item">
									<div className="singer_list__item_box">
										<div className="singer_list__cover js_singer">
											<img className="singer_list__pic" src="//y.gtimg.cn/music/photo_new/T001R150x150M000004Be55m1SJaLk.jpg?max_age=2592000" alt="张学友"/>
										</div>
										<h3 className="singer_list__title">
											<p className="js_singer">张学友</p>	
										</h3>
									</div>
								</li>
								
								<li className="singer_list__item">
									<div className="singer_list__item_box">
										<div className="singer_list__cover js_singer">
											<img className="singer_list__pic" src="//y.gtimg.cn/music/photo_new/T001R150x150M000004Be55m1SJaLk.jpg?max_age=2592000" alt="张学友"/>
										</div>
										<h3 className="singer_list__title">
											<p className="js_singer">张学友</p>	
										</h3>
									</div>
								</li>
								
								<li className="singer_list__item">
									<div className="singer_list__item_box">
										<div className="singer_list__cover js_singer">
											<img className="singer_list__pic" src="//y.gtimg.cn/music/photo_new/T001R150x150M000004Be55m1SJaLk.jpg?max_age=2592000" alt="张学友"/>
										</div>
										<h3 className="singer_list__title">
											<p className="js_singer">张学友</p>	
										</h3>
									</div>
								</li>
								
								<li className="singer_list__item">
									<div className="singer_list__item_box">
										<div className="singer_list__cover js_singer">
											<img className="singer_list__pic" src="//y.gtimg.cn/music/photo_new/T001R150x150M000004Be55m1SJaLk.jpg?max_age=2592000" alt="张学友"/>
										</div>
										<h3 className="singer_list__title">
											<p className="js_singer">张学友</p>	
										</h3>
									</div>
								</li>
								
								<li className="singer_list__item">
									<div className="singer_list__item_box">
										<div className="singer_list__cover js_singer">
											<img className="singer_list__pic" src="//y.gtimg.cn/music/photo_new/T001R150x150M000004Be55m1SJaLk.jpg?max_age=2592000" alt="张学友"/>
										</div>
										<h3 className="singer_list__title">
											<p className="js_singer">张学友</p>	
										</h3>
									</div>
								</li>
								
								<li className="singer_list__item">
									<div className="singer_list__item_box">
										<div className="singer_list__cover js_singer">
											<img className="singer_list__pic" src="//y.gtimg.cn/music/photo_new/T001R150x150M000004Be55m1SJaLk.jpg?max_age=2592000" alt="张学友"/>
										</div>
										<h3 className="singer_list__title">
											<p className="js_singer">张学友</p>	
										</h3>
									</div>
								</li>
							</ul>
						</div>
					</div>
				
					<Pagination defaultCurrent={6} total={500}  style={{marginBottom:60,textAlign:'center'}}/>
				</div>
				
			</div>
		)
	}
}