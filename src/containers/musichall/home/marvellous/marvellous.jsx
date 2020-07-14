

import React,{ Component } from 'react'
import Slider from "react-slick";


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
export default class NewSong extends Component{
	
	
	render(){

		
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 2,
			slidesToScroll:2,
			nextArrow: <SampleNextArrow/>,
			prevArrow: <SamplePrevArrow/>
		};
		
		const arr = [1,2,3,4]
		return (
			<div className="mod_index mod_index--event  mod_slide_box mod_bg">
				<div className="section_inner">
					<div className="index__hd">
						<h2 className="index__tit"><i className="icon_txt">精彩推荐</i></h2>
					</div>
					
					<Slider {...settings}>
						{
							arr.map(item => (
							<div  key={item}>
								<div style={{ padding:'10px' } }>
									<img src="https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2700410.gif?max_age=2592000" alt="海报" width="100%"/>
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