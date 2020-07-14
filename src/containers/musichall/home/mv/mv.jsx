



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
			{name:'为你推荐'},
			{name:'官方歌单'},
			{name:'情歌'},
			{name:'网络歌曲'},
			{name:'经典'},
			{name:'KTV热歌'}
		]
		
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll:5,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		const {suggestionIndex} = this.state
		const arr = [1,2,3,4,5,6,7,8,9,10]
		return (
			<div className="mod_index mod_index--mv mod_slide_box mod_bg" style={{paddingBottom: '60px'}}>
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
								<div className="mv_list__item" key={item}>
									<div className="mv_list__item_box">
										<div className="mv_list__cover mod_cover js_mv">
											<img className="mv_list__pic" src="https://y.gtimg.cn/music/photo_new/T015R640x360M101002AaYyE0SmH3T.jpg?max_age=2592000" alt="mv"/>
											<i className="mod_cover__icon_play"></i>
										</div>
										<h3 className="mv_list__title">
											<span className="js_mv">EXO-SC《10亿点击 (1 Billion Views) (Feat. MOON)》MV</span>
										</h3>
										<p className="mv_list__singer">
											<span className="js_singer">EXO-SC</span>
										</p>
										
										<div className="mv_list__info">
											<span className="mv_list__listen"><i className="mv_list__listen_icon sprite"></i>12.9万</span>
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