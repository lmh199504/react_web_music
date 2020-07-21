
import React,{ Component } from 'react'

import './mv.less'
export default class Mv extends Component{
	
	render(){
		const arr = [1,2,3,4,5,6,7,8,9]
		
		return (
			<div className="main">
				<div className="mod_tag" id="mv_tags">
					<div className="tag__list js_tags_area">
						<h3 className="tag__tit">区域</h3>
						<li className="tag__item tag__item--select">全部</li>
						<li className="tag__item">内地</li>
						<li className="tag__item">港台</li>
						<li className="tag__item">欧美</li>
						<li className="tag__item">韩国</li>
						<li className="tag__item">日本</li>
					</div>
					<div className="tag__list js_tags_version">
						<h3 className="tag__tit">版本</h3>
						<li className="tag__item tag__item--select">全部</li>
						<li className="tag__item">MV</li>
						<li className="tag__item">现场</li>
						<li className="tag__item">翻唱</li>
						<li className="tag__item">舞蹈</li>
						<li className="tag__item">影视</li>
						<li className="tag__item">综艺</li>
						<li className="tag__item">儿歌</li>
					</div>
				</div>
				
				<div className="mod_part_detail">
					<div className="part_detail__hd">
						<h2 className="part_detail__tit js_lib_title">全部MV</h2>
						<div className="part_switch">
							<li className="part_switch__item part_switch__item--left part_switch__item--select">最新</li>
							<li className="part_switch__item part_switch__item--right">最热</li>
						</div>
					</div>
				</div>
					
				<div className="mod_mv">
					<ul className="mv_list__list" id="mv_list">
						{
							arr.map(item => (
								<li className="mv_list__item">
									<div className="mv_list__item_box">
										<div className="mv_list__cover mod_cover js_mv">
											<img src="https://y.gtimg.cn/music/photo_new/T015R640x360M000001YiOK42r9CAv.jpg?max_age=2592000" alt="tupian" className="mv_list__pic"/>	
											<i className="mod_cover__icon_play"></i>
										</div>
										
										<h3 className="mv_list__title">
											<span className="js_mv">Das sind die Nächte</span>
										</h3>	
										<div className="mv_list__singer">
											<span className="js_singer"> Julian le Play </span>
										</div>
										<div className="mv_list__info">
											<span className="mv_list__listen"><i className="mv_list__listen_icon sprite"></i>5716</span>2021-12-25
										</div>
									</div>
								</li>
							))
						}
						
					</ul>
				</div>	
					
			</div>
		)
	}
}