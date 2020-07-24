

import React,{ Component } from 'react'
import Slider from "react-slick";
import { SampleNextArrow,SamplePrevArrow } from '../../../utils/slide'
import { reqGetDigitalAlbumLists } from '../../../api'
import './digital.less'
export default class Digital extends Component{
	
	state = {
		banner:[],
		content:[]
	}
	
	componentDidMount = () => {
		reqGetDigitalAlbumLists().then(res => {
			this.setState({
				banner:res.response.data.banner,
				content:res.response.data.content
			})
		}).catch(() => {
			
		})
	}
	getName = (item) => {
		switch (item.type) {
			case 'newupload':
				return '最新上架'
			case 'yinyueren':
				return '音乐人专区'
			case 'weeksalewell'	:
				return '本周热销'
			case 'zhuanti':
				return item.title
			default:
				return item.type
		}
		
	}
	
	render(){
		const { banner,content } = this.state 
		const settings = {
			className: "center",
			centerMode: true,
			infinite: true,
			centerPadding: "1px",
			dots:true,
			slidesToShow: 3,
			speed: 500,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		return (
			<div className="js_wrap digitals">
				<div style={{ clear:'both'}}></div>
				<div className="section_inner" style={{ minHeight:'360px' }}>
					<div style={{ clear:'both'}}></div>
					<Slider {...settings}>
						{
							banner.map(item => (
								<div className="imgContainer" key={item.picurl}>
									<img src={item.picurl} alt="轮播" />
								</div>
							))
						}
						
					</Slider>
				</div>
				{
					content.map(item => {
						return item.albumlist.length > 5?
						(<div className="main" key={item.type + Math.random()}>
							<div style={{ clear:'both'}}></div>
							<div className="mod_part">
								<div className="part__hd">
									<h2 className="part__tit">{this.getName(item)}</h2>
								</div>
							</div>
							<div style={{ clear:'both'}}></div>
							<div className="mod_album_list">
								<ul className="album_list__list">
									{
										item.albumlist.map((ablum,index) => {
											if(index<5){
												return (
													<li className="album_list__item" key={ablum.album_id}>
														<div className="album_list__item_box">
															<div className="js_album album_list__cover mod_cover">
																<img src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${ablum.album_mid}.jpg?max_age=2592000`} className="album_list__pic" alt="封面"/>
																<i className="mod_cover__mask"></i>
															</div>
															<h4 className="js_album album_list__title">
																<span className="album_list__title_txt">{ablum.album_name}</span>
															</h4>
															<div className="album_list__author">
																<span className="js_singer c_tx_thin">{ablum.singer_name}</span>
															</div>
															<div className="album_list__price">
																<strong className="album_list__price_numb c_tx_thin">¥ 25</strong>
																<span className="js_buy_album mod_btn album_list__btn_buy">立即购买</span>
															</div>
														</div>
													</li>
												)
											}else{
												return null
											}
										})
									}
								</ul>
							</div>
						</div>):null
					})
					
					
				}
				

			</div>
		)
	}
}