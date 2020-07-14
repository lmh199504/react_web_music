

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
			{name:'最新'},
			{name:'内地'},
			{name:'港台'},
			{name:'欧美'},
			{name:'韩国'},
			{name:'日本'}
		]
		
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll:5,
			rows:3,
			nextArrow: <SampleNextArrow/>,
			prevArrow: <SamplePrevArrow/>
		};
		const { suggestionIndex } = this.state
		const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
		return (
			<div className="mod_index mod_index--song  mod_slide_box mod_bg">
				<div className="section_inner">
					<div className="index__hd">
						<h2 className="index__tit"><i className="icon_txt">新歌首发</i></h2>
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
							<div  key={item}>
								<div className="songlist__item_box">
								
									<div className="songlist__link album_name  mod_cover">
										<img src="https://y.gtimg.cn/music/photo_new/T002R90x90M000000Gp3ld08nrfX_1.jpg?max_age=2592000" className="songlist__pic" alt="封面"/>
										<i className="mod_cover__mask"></i>
										<i className="mod_cover__icon_play js_play"></i>
									</div>
									
									<div className="songlist__cont">
										<h3 className="songlist__song">
											<span className="js_song">忘不了</span>
										</h3>
										<p className="songlist__author" title="陈楚生">
											陈楚生
										</p>
									</div>
									<div className="songlist__time c_tx_thin">05:14</div>
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