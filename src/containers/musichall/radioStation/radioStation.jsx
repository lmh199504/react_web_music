import React,{ Component } from 'react'

import './radioStation.less'
export default class RadioStation extends Component{
	
	render(){
		const arr1 = [1,2,3,4,5,6,7,8,9]
		return (
			<div className="main">
				<div className="mod_radio_sidebar" id="taglist" >
					<li className="radio_sidebar__item radio_sidebar__item--current">
						热门
					</li>
					<li className="radio_sidebar__item ">
						上午
					</li>
					<li className="radio_sidebar__item ">
						心情
					</li>
					<li className="radio_sidebar__item ">
						主题
					</li>
					<li className="radio_sidebar__item ">
						场景
					</li>
					<li className="radio_sidebar__item ">
						曲风
					</li>
					<li className="radio_sidebar__item ">
						语言
					</li>
					<li className="radio_sidebar__item ">
						人群
					</li>
					<li className="radio_sidebar__item ">
						乐器
					</li>
					
				</div>
				
				<div className="mod_radio">
					<div className="radio__item">
						<h2 className="radio__tit">热门</h2>
						<div className="mod_radio_list">
							{
								arr1.map(item => (
									<div className="playlist__item slide__item classified" key={item}>
										<div className="playlist__item_inner">
											<div className="playlist__cover ">
												<img className="playlist__pic" src="https://qpic.y.qq.com/music_cover/gqs4lLM0dbcR4icSZlj2SWJbQVbvq3YSfUlGFMnmpxAIHK9yO82g4aicicvZZls99ha/300?n=1" alt="封面"/>
												<i className="mod_cover__mask"></i>
												<i className="mod_cover__icon_play js_play"></i>
											</div>
											<h4 className="playlist__title">
												<span className="playlist__title_txt">吃鸡神曲丨这单在手，天下我有</span>	
											</h4>
											<div className="playlist__other">
												播放量：45.6万
											</div>
										</div>
									</div>
								))
							}
						</div>
					</div>
					<div className="radio__item">
						<h2 className="radio__tit">上午</h2>
						<div className="mod_radio_list">
							{
								arr1.map(item => (
									<div className="playlist__item slide__item classified" key={item}>
										<div className="playlist__item_inner">
											<div className="playlist__cover ">
												<img className="playlist__pic" src="https://qpic.y.qq.com/music_cover/gqs4lLM0dbcR4icSZlj2SWJbQVbvq3YSfUlGFMnmpxAIHK9yO82g4aicicvZZls99ha/300?n=1" alt="封面"/>
												<i className="mod_cover__mask"></i>
												<i className="mod_cover__icon_play js_play"></i>
											</div>
											<h4 className="playlist__title">
												<span className="playlist__title_txt">吃鸡神曲丨这单在手，天下我有</span>	
											</h4>
											<div className="playlist__other">
												播放量：45.6万
											</div>
										</div>
									</div>
								))
							}
						</div>
					</div>
					
				</div>
			</div>
		)
	}
}