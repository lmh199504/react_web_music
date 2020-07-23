
import React,{ Component } from 'react'
import Slider from "react-slick";
import { connect } from 'react-redux'
import { Spin } from 'antd' 
import { SampleNextArrow,SamplePrevArrow } from '../../../../utils/slide'
import { reqGetHomeNewAblum } from '../../../../api'



class Newdisc extends Component{
	state = {
		suggestionIndex:0,
		newAblumArr:[],
		loading:false
	}
	
	getData = (index,item) => {
		// console.log(index)
		this.setState({
			suggestionIndex:index,
			loading:true
		})
		
		
		reqGetHomeNewAblum({
			area:item.id
		}).then(res => {
			this.setState({
				newAblumArr:res.data.new_album.data.albums
			})
			
			this.setState({
				loading:false
			})
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}
	componentDidMount = () => {
		this.getData(0,{area:1})
	}
	
	
	render(){
		const { homeData } = this.props
		let suggestionNav = null

		if(homeData.new_album_tag){
			suggestionNav = homeData.new_album_tag.data.area

		}
		if(!suggestionNav){
			return null
		}
		
		
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
		const {suggestionIndex,newAblumArr,loading} = this.state

		return (
			<div className="mod_index mod_index--album mod_slide_box mod_bg" style={{paddingBottom: '60px'}}>
				<div className="section_inner">
					<div className="index__hd">
						<h2 className="index__tit"><i className="icon_txt">新碟首发</i></h2>
					</div>
					<div className="mod_index_tab">
						{
							suggestionNav.map((item,index) => (
								<li key={index} className={ `index_tab__item js_tag ${suggestionIndex === index?'index_tab__item--current':'' }`  } onClick={ () =>  this.getData(index,item) }>{item.name}</li>
							))
						}
					
					</div>
					<Spin spinning={loading}>
						<Slider {...settings}>
							{
								newAblumArr.map((item,index) => (
									<div className="playlist__item slide__item" key={index}>
										<div className="playlist__item_inner">
											<div className="playlist__cover ">
												<img className="playlist__pic" src={ `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.photo.pic_mid}.jpg?max_age=2592000` } alt="封面"/>
												<i className="mod_cover__mask"></i>
												<i className="mod_cover__icon_play js_play"></i>
											</div>
											<h4 className="playlist__title">
												<span className="playlist__title_txt">{item.name}</span>	
											</h4>
											<div className="playlist__other">
												{item.singers[0].name}
											</div>
										</div>
									</div>
								))
							}
						</Slider>
					</Spin>
					
				</div>
			</div>
		)
	}
}


export default connect(
	state=>({homeData:state.homeData})
)(Newdisc)