
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
export default class extends Component{
	state = {
		suggestionIndex:0
	}
	
	getData = (index) => {
		console.log(index)
		this.setState({
			suggestionIndex:index
		})
	}
	render(){
		const suggestionNav = [
			{name:'内地'},
			{name:'港台'},
			{name:'欧美'},
			{name:'韩国'},
			{name:'日本'},
			{name:'其他'}
		]
		
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 5,
			rows:2,
			slidesToScroll:5,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		const {suggestionIndex} = this.state
		const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
		return (
			<div className="mod_index mod_index--hot mod_slide_box mod_bg" style={{paddingBottom: '60px'}}>
				<div className="section_inner">
					<div className="index__hd">
						<h2 className="index__tit"><i className="icon_txt">歌单推荐</i></h2>
					</div>
					<div className="mod_index_tab">
						{
							suggestionNav.map((item,index) => (
								<li key={index} className={ `index_tab__item js_tag ${suggestionIndex === index?'index_tab__item--current':'' }`  } onClick={ () =>  this.getData(index) }>{item.name}</li>
							))
						}
					
					</div>
					<Slider {...settings}>
					    {
							arr.map(item => (
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