
import React,{ Component } from 'react'

import './mymusic.less'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setLoveLists,setUserSheets } from '../../redux/actions'

import { Route,Redirect,Switch } from 'react-router-dom'
import MyLove from './myLove/myLove'
import MyClassifid from './myclassifid/myclassifid'
import MyAttention from './myAttention/myAttention'
import MyFans from './myfans/myfans'
import MyVideo from './myvideo/myvideo'


class MyMusic extends Component{
	
	
	
	componentDidMount = () => {
		this.props.setLoveLists()
		this.props.setUserSheets()
	}
	
	
	render(){
		const { user } = this.props
		
		
		return(
			<div className="mod_profile js_user_data" style={{ height:380 }}>
				<div className="section_inner">
					<div className="profile__cover_link">
						<img className="profile__cover" src={user.headerImg} alt="头像"/>
					</div>
					<div className="profile__tit">
						<span className="profile__name">
							{user.username}
						</span>
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
						
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/mylove'>我喜欢</NavLink>
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/myclassifid'>我创建的歌单</NavLink>
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/myattention'>关注</NavLink>
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/myfans'>粉丝</NavLink>
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/myvideo'>我上传的视频</NavLink>


					</div>
					
					<Switch>
						<Route path="/mymusic/mylove" component={MyLove}/>	
						<Route path="/mymusic/myclassifid" component={MyClassifid}/>	
						<Route path="/mymusic/myattention" component={MyAttention}/>	
						<Route path="/mymusic/myfans" component={MyFans}/>	
						<Route path="/mymusic/myvideo" component={MyVideo}/>	
						<Redirect to="/mymusic/mylove"/>
					</Switch>

					
				</div>
				
			</div>
		)
	}
}

export default connect(
	state=>({loveList:state.loveList,
		user:state.user
	}),
	{setLoveLists,setUserSheets}
)(MyMusic)