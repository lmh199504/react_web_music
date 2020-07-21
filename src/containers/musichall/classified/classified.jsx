

import React,{ Component } from 'react'
import {  Radio } from 'antd';
import { Popover } from 'antd'
import './classified.less'
import '../home/home.less'



export default class Classified extends Component{
	
	state = {
		active:'1'
	}
	handleSizeChange = (e) => {
		this.setState({ active: e.target.value });
	}
	
	render(){
		const { active } = this.state
		
		const content = (
		  <div>
		    <ul className="playlist_tag__tags" style={{ position:'relative',height:10 }}>
				<li className="playlist_tag__itembox">小语种</li>
				<li className="playlist_tag__itembox">小语种</li>
				<li className="playlist_tag__itembox">小语种</li>
				<li className="playlist_tag__itembox">小语种</li>
				
			</ul>
		  </div>
		)
		const arr = [1,2,3,4,5]

		const arr6 = [1,2,3,4,5]
		const arr9 = [1,2,3,4,5,6,7,8]
		const arr1 = [1,2,3,4,5,6,7,8,9,10,11]
		return (
			<div className="main">
				<div className="mod_playlist_tag" id="taglist">
					{
						arr.map(item => (
							<div className="js_normal" key={item}>
								<div className={ `playlist_tag__list ${ item ===1?'playlist_tag__list--lang':'' }` }>	
									<h3 className="playlist_tag__tit c_tx_thin">语种</h3>
									<i className="playlist_tag__line"></i>
									<ul className="playlist_tag__tags">
										{
											item === 1? arr6.map(item => (
												<li className="playlist_tag__itembox" key={item}>
													<p className="playlist_tag__item js_tag">国语</p>
												</li>
											)):arr9.map(item => (
												<li className="playlist_tag__itembox" key={item}>
													<p className="playlist_tag__item js_tag">国语</p>
												</li>
											))
										}
										
										<Popover placement="bottom" content={content} trigger="click" width="1200">
											<li className="playlist_tag__itembox">
												<p className="playlist_tag__item js_more_tag">更多</p>
											</li>
										</Popover>
										
									</ul>
								</div>
							</div>
						))
					}
				
					
				</div>
				<div style={{ clear:'both'}}></div>
				<div className="part_detail__hd">
					<div className="all_classified_title">全部歌单</div>
					<div>
						<Radio.Group value={active} onChange={this.handleSizeChange}>
							<Radio.Button value="1">全部</Radio.Button>
							<Radio.Button value="2">最新</Radio.Button>
						</Radio.Group>
					</div>	
				</div>
				<div style={{ position:'relative',width:'100%' }}>
					
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
		)
	}
}