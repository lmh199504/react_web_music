
import React,{ Component } from 'react'
import './mymusic.less'
export default class MusicHall extends Component{
	
	render(){
		return(
			<div className="mod_profile js_user_data">
				<div className="section_inner">
					<div className="profile__cover_link">
						<img className="profile__cover" src="https://thirdqq.qlogo.cn/g?b=sdk&k=5GvhCOicBXrBf50u3StdLRw&s=140&t=1550910887" alt="头像"/>
					</div>
					<div className="profile__tit">
						<span className="profile__name">敷衍、</span>
						<img src="//y.gtimg.cn/music/icon/v1/mac/svip_g@2x.png?max_age=2592000" className="lv_icon" alt="lv"/>
					</div>
					<ul className="mod_user_statistic">
						<li className="user_statistic__item">
							<span className="js_tab">
								<strong className="user_statistic__number js_num_follow">0</strong>
								<span className="user_statistic__tit">关注</span>
							</span>
						</li>
						<li className="user_statistic__item user_statistic__item--last">
							<span className="js_tab">
								<strong className="user_statistic__number js_num_fans">0</strong>
								<span className="user_statistic__tit">粉丝</span>
							</span>
						</li>
					</ul>
					<button className="sprite js_btn_lock btn_lock" title="主页已公开" ><span className="icon_txt">主页已公开</span></button>
				</div>
				
				<div className="main main--profile">
					<div className="mod_tab profile_nav">
						<li className="mod_tab__item mod_tab__current">我喜欢</li>
						<li className="mod_tab__item ">我创建的歌单</li>
						<li className="mod_tab__item ">关注</li>
						<li className="mod_tab__item ">粉丝</li>
						<li className="mod_tab__item ">我上传的视频</li>
					</div>
				</div>
				
				<div className="js_box" id="like_box">
					<div className="mod_tab">
						<li className="mod_tab__item mod_tab__current">歌曲 0</li>
						<li className="mod_tab__item ">歌单 0</li>
						<li className="mod_tab__item ">专辑 0</li>
						<li className="mod_tab__item ">视频 0</li>
					</div>
				</div>
				
			</div>
		)
	}
}