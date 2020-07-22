

import React,{ Component } from 'react'
import Slider from "react-slick";
import { connect } from 'react-redux'
import { SampleNextArrow,SamplePrevArrow } from '../../../../utils/slide'



class NewSong extends Component{
	
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
		
		const imgList = this.props.homeData.focus ? this.props.homeData.focus.data.content : []
		return (
			<div className="mod_index mod_index--event  mod_slide_box mod_bg">
				<div className="section_inner">
					<div className="index__hd">
						<h2 className="index__tit"><i className="icon_txt">精彩推荐</i></h2>
					</div>
					
					<Slider {...settings}>
						{
							imgList.map(item => (
							<div  key={item}>
								<div style={{ padding:'10px' } }>
									<img src={item.pic_info.url} alt="海报" width="100%"/>
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

export default connect(
	state=>({homeData:state.homeData})
)(NewSong)