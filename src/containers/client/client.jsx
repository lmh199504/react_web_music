
import React, { Component } from 'react'
import "./client.less"
export default class MusicHall extends Component {

	state = {
		type:1,  // 1.pc 2.Mac版  3.iPhone版 4.Android版
		iphone_play__list:1

	}

	componentDidMount() {
		setTimeout(() => {
			let slide 
			new window.Swiper(".swiper-container", {
				direction : 'vertical',
				followFinger : false,
				slidesPerView:1,
				speed:800,
				mousewheel: true,
				pagination : {
					el:'.swiper-pagination',
				},
				on:{
					init:function(swiper){
						slide=this.slides.eq(0);
						console.log(slide)
						slide.addClass('ani-slide');
					},
					transitionStart: function(){
						for(let i=0;i<this.slides.length;i++){
							slide=this.slides.eq(i);
							slide.removeClass('ani-slide');
						}
					},
					transitionEnd: function() {
						slide=this.slides.eq(this.activeIndex);
						slide.addClass('ani-slide');
					},
				}
			});
		})
		setInterval(() => {
			const { iphone_play__list } = this.state
			this.setState({
				iphone_play__list:iphone_play__list>=3?1:iphone_play__list+1
			})
		},4000)
	}

	render() {
		const { type,iphone_play__list } = this.state
		return (
			<div className="client">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						<div className="swiper-slide">
							<ul className="mod_banner_list active">
								<li className={`mod_banner_list__item mod_banner_pc ${type===1?'':'hidden'}`}>
									<h2 className="mod_banner_pc__tit">1</h2>
									<div className="btn_banner js_stat_down">立即下载</div>
									<div className="mod_banner_list__pcbg1"></div>
									<div className="mod_banner_list__pcbg2"></div>
									<div className="mod_banner_list__pcbg3"></div>
									<div className="mod_banner__star mod_banner__star1"></div>
									<div className="mod_banner__star mod_banner__star2"></div>
									<div className="mod_banner__star mod_banner__star3"></div>
									<div className="mod_banner__star mod_banner__star4"></div>
									<div className="mod_banner__star mod_banner__star5"></div>
									<div className="mod_banner__star mod_banner__star6"></div>
								</li>
								<li className={`mod_banner_list__item mod_banner_mac ${type===2?'':'hidden'}`}>
									<div className="mod_banner_list__macbg1"></div>
									<div className="mod_banner_list__macbg2"></div>
									<div className="mod_banner_list__macbg3"></div>
								</li>

								<li className={`mod_banner_list__item mod_banner_iphone ${type===3?'':'hidden'}`}>
									<div className={`iphone_play__list iphone_play__list--1 ${iphone_play__list===1?"active":""}`}>
										<img src={require('./images/iphone_play_1.jpg')} alt="1"/>
									</div>
									<div className={`iphone_play__list iphone_play__list--2 ${iphone_play__list===2?"active":""}`}>
										<img src={require('./images/iphone_play_2.jpg')} alt="1"/>
									</div>
									<div className={`iphone_play__list iphone_play__list--3 ${iphone_play__list===3?"active":""}`}>
										<img src={require('./images/iphone_play_3.jpg')} alt="1"/>
									</div>
									<p className="iphone_intro">百变播放器，不变好声音</p>
									<div className="btn_banner js_show_tips">立即下载</div>
								</li>

								<li className={`mod_banner_list__item mod_banner_android ${type===4?'':'hidden'}`}>
									<div className="mod_banner_list__androidbg1"></div>
									<div className="mod_banner_list__androidbg2"></div>
									<div className="btn_banner js_show_tips">立即下载</div>
								</li>

							
								<div className="download_list">
									<i className="download_list__br"></i>
									<div className={`download_list__item download_list__item--pc ${type===1?"download_list__item--current":""}`} onClick={ () => this.setState({type:1}) }>PC版<i></i></div>
									<div className={`download_list__item download_list__item--mac ${type===2?"download_list__item--current":""}`} onClick={ () => this.setState({type:2}) }>Mac版<i></i></div>
									<div className={`download_list__item download_list__item--iphone ${type===3?"download_list__item--current":""}`} onClick={ () => this.setState({type:3}) }>iPhone版<i></i></div>
									<div className={`download_list__item download_list__item--android ${type===4?"download_list__item--current":""}`} onClick={ () => this.setState({type:4}) }>Android版<i></i></div>
								</div>

								<i className="icon_arrow"></i>
							</ul>
						</div>
						<div className="swiper-slide part_singer active">
							<div className="section__inner">
								<h2 className="part_singer__tit"><span className="hide">3000万正版歌曲</span></h2>
								<h3 className="part_singer__desc hide"><span className="hide">拥有千万级丰富多元的音乐内容库</span></h3>

								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic1"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic2"></div>
								</div> 
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic3"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic4"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic5"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic6"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic7"></div>
								</div> 
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic8"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic9"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic10"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic11"></div>
								</div>
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer12.jpg?max_age=2592000" alt="陈奕迅-QQ音乐" className="part_singer__pic part_singer__pic12"/>
								</div> 
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer13.jpg?max_age=2592000" alt="吉克隽逸" className="part_singer__pic part_singer__pic13"/>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic14"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic15"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic16"></div>
								</div>
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer17.jpg?max_age=2592000" alt="张靓颖-QQ音乐" className="part_singer__pic part_singer__pic17"/>
								</div> 
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic18"></div>
								</div>
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer19.jpg?max_age=2592000" alt="金在中-QQ音乐" className="part_singer__pic part_singer__pic19"/>
								</div>
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer20.jpg?max_age=2592000" alt="林俊杰-QQ音乐" className="part_singer__pic part_singer__pic20"/>
								</div>
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer21.jpg?max_age=2592000" alt="Rain-QQ音乐" className="part_singer__pic part_singer__pic21"/>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic22"></div>
								</div> 
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic23"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic24"></div>
								</div>
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer25.jpg?max_age=2592000" alt="周杰伦-QQ音乐" className="part_singer__pic part_singer__pic25"/>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic26"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic27"></div>
								</div> 
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic28"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic29"></div>
								</div>
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer30.jpg?max_age=2592000" alt="谢霆锋-QQ音乐" className="part_singer__pic part_singer__pic30"/>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic31"></div>
								</div>
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer32.jpg?max_age=2592000" alt="Taylor Swift-QQ音乐" className="part_singer__pic part_singer__pic32"/>
								</div> 
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic33"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic34"></div>
								</div>
								<div className="part_singer__item">
									<img src="//imgcache.gtimg.cn/mediastyle/app/download/img/singer/singer35.jpg?max_age=2592000" alt="蔡依林-QQ音乐" className="part_singer__pic part_singer__pic35"/>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic36"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic37"></div>
								</div> 
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic38"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic39"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic40"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic41"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic42"></div>
								</div> 
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic43"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic44"></div>
								</div>
								<div className="part_singer__item">
									<div className="part_singer__pic part_singer__pic45"></div>
								</div>
							</div>
							<i className="icon_arrow"></i>
						</div>
						<div className="swiper-slide active part_lyric">
							{/* <p>Slide 3</p> */}
							<div className="part_lyric__bg1"></div>
							<div className="part_lyric__bg2"></div>
							<div className="part_lyric__bg3"></div>
							<div className="section__inner">
								<h2 className="part_lyric__tit"><span className="hide">智能推荐,随刻遇见喜欢的音乐</span></h2>
								<h3 className="part_lyric__desc hide"><span className="hide">懂你的猜你喜欢，最新最热独家首发、排行榜、 电台，全方位的音乐推荐都在这里！ </span></h3>
								<div className="part_lyric__phone">
									<div className="lyric_phone"><div className="lyric_phone2"></div></div>
									<div className="lyric_phonebox"></div>
								</div>
							</div>
							<i className="icon_arrow"></i>
						</div>
						<div className="swiper-slide part_like">
							<div className="section__inner">
								<h2 className="part_like__tit"><span className="hide">智能推荐,随刻遇见喜欢的音乐</span></h2>
								<h3 className="part_like__desc hide"><span className="hide">懂你的猜你喜欢，最新最热独家首发、排行榜、 电台，全方位的音乐推荐都在这里！ </span></h3>
								<div className="part_like__phone">
									<div className="like_phone"></div>
									<div className="like_phonebox"></div>
								</div>
								<div className="part_like__phonebox"></div>
							</div>
							<i className="icon_arrow"></i>
						</div>
						<div className="swiper-slide part_synchro">
							<div className="section__inner">
								<h2 className="part_synchro__tit"><span className="hide">智能推荐,随刻遇见喜欢的音乐</span></h2>
								<h3 className="part_synchro__desc hide"><span className="hide">懂你的猜你喜欢，最新最热独家首发、排行榜、 电台，全方位的音乐推荐都在这里！ </span></h3>
								<div className="part_synchro__mac"><div className="part_synchro__mac2"></div></div>
								<div className="part_synchro__phone"></div>
							</div>
							<div className="mod_footer" id="frame_bottom">
								<p className="copyrighten" id="data_p">Copyright © 1998 - 2020</p>               
								<p className="copyrightzh">腾讯公司版权所有<a target="new" href="http://www.tencent.com/law/mo_law.shtml?/law/copyright.htm">腾讯网络文化经营许可证</a>
								</p>
							</div>
						</div>
					</div>
					<div className="swiper-pagination"></div> 
				</div>
			</div>
		)
	}
}