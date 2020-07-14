

import React,{ Component } from 'react'
import Slider from "react-slick";
import { Popover } from 'antd'
import './classified.less'
import '../home/home.less'


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
	<div
	  className={className}
	  style={{ ...style, display: "none", background: "white" }}
	  onClick={onClick}
	/>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
	<div
	  className={className}
	  style={{ ...style, display: "none", background: "white"}}
	  onClick={onClick}
	/>
  );
}
export default class Classified extends Component{
	
	
	
	render(){
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
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll:5,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		const arr6 = [1,2,3,4,5,6]
		const arr9 = [1,2,3,4,5,6,7,8,9]
		const arr1 = [1,2,3,4,5,6,7,8,9,10]
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
												<li className="playlist_tag__itembox">
													<p className="playlist_tag__item js_tag">国语</p>
												</li>
											)):arr9.map(item => (
												<li className="playlist_tag__itembox">
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
				<div style={{ clear:'both'}}>
					
				</div>
				
				<div style={{ position:'relative',width:'100%' }}>
					<Slider {...settings}>
					    {
							arr1.map(item => (
								<div className="playlist__item slide__item" key={item}>
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
					</Slider>
				</div>
			</div>
		)
	}
}