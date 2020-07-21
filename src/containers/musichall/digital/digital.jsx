

import React,{ Component } from 'react'
import Slider from "react-slick";
import { SampleNextArrow,SamplePrevArrow } from '../../../utils/slide'
import './digital.less'
export default class Digital extends Component{
	
	render(){

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
		const arr = [1,2,3,4,5]
		
		return (
			<div className="js_wrap">
				<div style={{ clear:'both'}}></div>
				<div className="section_inner" style={{ minHeight:'360px' }}>
					<div style={{ clear:'both'}}></div>
					<Slider {...settings}>
						<div className="imgContainer">
							<img src="https://y.gtimg.cn/music/common//upload/t_musicmall_focus/2700412.gif?max_age=2592000" alt="轮播" />
						</div>
						<div className="imgContainer">
							<img src="https://y.gtimg.cn/music/common//upload/t_musicmall_focus/2700412.gif?max_age=2592000" alt="轮播" />
						</div>
						<div className="imgContainer">
							<img src="https://y.gtimg.cn/music/common//upload/t_musicmall_focus/2700412.gif?max_age=2592000" alt="轮播"/>
						</div>
						<div className="imgContainer">
							<img src="https://y.gtimg.cn/music/common//upload/t_musicmall_focus/2700412.gif?max_age=2592000" alt="轮播"/>
						</div>
					</Slider>
				</div>
				<div className="main">
					<div style={{ clear:'both'}}></div>
					<div className="mod_part">
						<div className="part__hd">
							<h2 className="part__tit">最新上架</h2>
						</div>
					</div>
					<div style={{ clear:'both'}}></div>
					<div className="mod_album_list">
						<ul className="album_list__list">
							{
								arr.map(item => (
									<li className="album_list__item" key={item}>
										<div className="album_list__item_box">
											<div className="js_album album_list__cover mod_cover">
												<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000005w9gj39oewa.jpg?max_age=2592000" className="album_list__pic" alt="封面"/>
												<i className="mod_cover__mask"></i>
											</div>
											<h4 className="js_album album_list__title">
												<span className="album_list__title_txt">MAP OF THE SOUL : 7 ~ THE JOURNEY ~</span>
											</h4>
											<div className="album_list__author">
												<span className="js_singer c_tx_thin">BTS (防弹少年团)</span>
											</div>
											<div className="album_list__price">
												<strong className="album_list__price_numb c_tx_thin">¥ 25</strong>
												<span className="js_buy_album mod_btn album_list__btn_buy">立即购买</span>
											</div>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</div>
				
				<div className="main">
					<div style={{ clear:'both'}}></div>
					<div className="mod_part">
						<div className="part__hd">
							<h2 className="part__tit">本周热销</h2>
						</div>
					</div>
					<div style={{ clear:'both'}}></div>
					<div className="mod_album_list">
						<ul className="album_list__list">
							{
								arr.map(item => (
									<li className="album_list__item" key={item}>
										<div className="album_list__item_box">
											<div className="js_album album_list__cover mod_cover">
												<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000005w9gj39oewa.jpg?max_age=2592000" className="album_list__pic" alt="封面"/>
												<i className="mod_cover__mask"></i>
											</div>
											<h4 className="js_album album_list__title">
												<span className="album_list__title_txt">MAP OF THE SOUL : 7 ~ THE JOURNEY ~</span>
											</h4>
											<div className="album_list__author">
												<span className="js_singer c_tx_thin">BTS (防弹少年团)</span>
											</div>
											<div className="album_list__price">
												<strong className="album_list__price_numb c_tx_thin">¥ 25</strong>
												<span className="js_buy_album mod_btn album_list__btn_buy">立即购买</span>
											</div>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</div>
				
				
				
				<div className="main">
					<div style={{ clear:'both'}}></div>
					<div className="mod_part">
						<div className="part__hd">
							<h2 className="part__tit">音乐人专区</h2>
						</div>
					</div>
					<div style={{ clear:'both'}}></div>
					<div className="mod_album_list">
						<ul className="album_list__list">
							{
								arr.map(item => (
									<li className="album_list__item" key={item}>
										<div className="album_list__item_box">
											<div className="js_album album_list__cover mod_cover">
												<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000005w9gj39oewa.jpg?max_age=2592000" className="album_list__pic" alt="封面"/>
												<i className="mod_cover__mask"></i>
											</div>
											<h4 className="js_album album_list__title">
												<span className="album_list__title_txt">MAP OF THE SOUL : 7 ~ THE JOURNEY ~</span>
											</h4>
											<div className="album_list__author">
												<span className="js_singer c_tx_thin">BTS (防弹少年团)</span>
											</div>
											<div className="album_list__price">
												<strong className="album_list__price_numb c_tx_thin">¥ 25</strong>
												<span className="js_buy_album mod_btn album_list__btn_buy">立即购买</span>
											</div>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</div>
				
				
				<div className="main">
					<div style={{ clear:'both'}}></div>
					<div className="mod_part">
						<div className="part__hd">
							<h2 className="part__tit">2019新声力量绽放</h2>
						</div>
					</div>
					<div style={{ clear:'both'}}></div>
					<div className="mod_album_list">
						<ul className="album_list__list">
							{
								arr.map(item => (
									<li className="album_list__item" key={item}>
										<div className="album_list__item_box">
											<div className="js_album album_list__cover mod_cover">
												<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000005w9gj39oewa.jpg?max_age=2592000" className="album_list__pic" alt="封面"/>
												<i className="mod_cover__mask"></i>
											</div>
											<h4 className="js_album album_list__title">
												<span className="album_list__title_txt">MAP OF THE SOUL : 7 ~ THE JOURNEY ~</span>
											</h4>
											<div className="album_list__author">
												<span className="js_singer c_tx_thin">BTS (防弹少年团)</span>
											</div>
											<div className="album_list__price">
												<strong className="album_list__price_numb c_tx_thin">¥ 25</strong>
												<span className="js_buy_album mod_btn album_list__btn_buy">立即购买</span>
											</div>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</div>
				
				
				<div className="main">
					<div style={{ clear:'both'}}></div>
					<div className="mod_part">
						<div className="part__hd">
							<h2 className="part__tit">2019内地专辑推荐</h2>
						</div>
					</div>
					<div style={{ clear:'both'}}></div>
					<div className="mod_album_list">
						<ul className="album_list__list">
							{
								arr.map(item => (
									<li className="album_list__item" key={item}>
										<div className="album_list__item_box">
											<div className="js_album album_list__cover mod_cover">
												<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000005w9gj39oewa.jpg?max_age=2592000" className="album_list__pic" alt="封面"/>
												<i className="mod_cover__mask"></i>
											</div>
											<h4 className="js_album album_list__title">
												<span className="album_list__title_txt">MAP OF THE SOUL : 7 ~ THE JOURNEY ~</span>
											</h4>
											<div className="album_list__author">
												<span className="js_singer c_tx_thin">BTS (防弹少年团)</span>
											</div>
											<div className="album_list__price">
												<strong className="album_list__price_numb c_tx_thin">¥ 25</strong>
												<span className="js_buy_album mod_btn album_list__btn_buy">立即购买</span>
											</div>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</div>
				
				
				<div className="main">
					<div style={{ clear:'both'}}></div>
					<div className="mod_part">
						<div className="part__hd">
							<h2 className="part__tit">2019韩国专辑推荐</h2>
						</div>
					</div>
					<div style={{ clear:'both'}}></div>
					<div className="mod_album_list">
						<ul className="album_list__list">
							{
								arr.map(item => (
									<li className="album_list__item" key={item}>
										<div className="album_list__item_box">
											<div className="js_album album_list__cover mod_cover">
												<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000005w9gj39oewa.jpg?max_age=2592000" className="album_list__pic" alt="封面"/>
												<i className="mod_cover__mask"></i>
											</div>
											<h4 className="js_album album_list__title">
												<span className="album_list__title_txt">MAP OF THE SOUL : 7 ~ THE JOURNEY ~</span>
											</h4>
											<div className="album_list__author">
												<span className="js_singer c_tx_thin">BTS (防弹少年团)</span>
											</div>
											<div className="album_list__price">
												<strong className="album_list__price_numb c_tx_thin">¥ 25</strong>
												<span className="js_buy_album mod_btn album_list__btn_buy">立即购买</span>
											</div>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</div>
				
				
				
				<div className="main">
					<div style={{ clear:'both'}}></div>
					<div className="mod_part">
						<div className="part__hd">
							<h2 className="part__tit">2019影视剧OST推荐</h2>
						</div>
					</div>
					<div style={{ clear:'both'}}></div>
					<div className="mod_album_list">
						<ul className="album_list__list">
							{
								arr.map(item => (
									<li className="album_list__item" key={item}>
										<div className="album_list__item_box">
											<div className="js_album album_list__cover mod_cover">
												<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000005w9gj39oewa.jpg?max_age=2592000" className="album_list__pic" alt="封面"/>
												<i className="mod_cover__mask"></i>
											</div>
											<h4 className="js_album album_list__title">
												<span className="album_list__title_txt">MAP OF THE SOUL : 7 ~ THE JOURNEY ~</span>
											</h4>
											<div className="album_list__author">
												<span className="js_singer c_tx_thin">BTS (防弹少年团)</span>
											</div>
											<div className="album_list__price">
												<strong className="album_list__price_numb c_tx_thin">¥ 25</strong>
												<span className="js_buy_album mod_btn album_list__btn_buy">立即购买</span>
											</div>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</div>
				
				
				<div className="main">
					<div style={{ clear:'both'}}></div>
					<div className="mod_part">
						<div className="part__hd">
							<h2 className="part__tit">2019影视剧OST推荐</h2>
						</div>
					</div>
					<div style={{ clear:'both'}}></div>
					<div className="mod_album_list">
						<ul className="album_list__list">
							{
								arr.map(item => (
									<li className="album_list__item" key={item}>
										<div className="album_list__item_box">
											<div className="js_album album_list__cover mod_cover">
												<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000005w9gj39oewa.jpg?max_age=2592000" className="album_list__pic" alt="封面"/>
												<i className="mod_cover__mask"></i>
											</div>
											<h4 className="js_album album_list__title">
												<span className="album_list__title_txt">MAP OF THE SOUL : 7 ~ THE JOURNEY ~</span>
											</h4>
											<div className="album_list__author">
												<span className="js_singer c_tx_thin">BTS (防弹少年团)</span>
											</div>
											<div className="album_list__price">
												<strong className="album_list__price_numb c_tx_thin">¥ 25</strong>
												<span className="js_buy_album mod_btn album_list__btn_buy">立即购买</span>
											</div>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</div>
				
			</div>
		)
	}
}