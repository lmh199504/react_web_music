
import React,{ Component } from 'react'
import { NavLink,Switch,Route,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './musichall.less'
import Home from './home/home'
import Singer from './singer/singer'
import NewDisc from './newdisc/newdisc'
import RankingList from './rankinglist/rankinglist'
import Classified from './classified/classified'
import RadioStation from './radioStation/radioStation'
import Mv from './mv/mv'
import Digital from './digital/digital'
import Ticketing from './ticketing/ticketing'
import { getHomeData,setLoveLists,setLoveSingers,setLoveSheets,setUserSheets } from '../../redux/actions'
import SingerDetail from '../singerDetail/singerDetail'
import ClassDetail from '../classDetail/classDetail'
import UserSheetDetail from '../userSheetDetail/userSheetDetail'
class MusicHall extends Component{
	
	componentDidMount= () => {
		this.props.getHomeData()
		this.props.setLoveLists()
		this.props.setLoveSingers()
		this.props.setLoveSheets()
		this.props.setUserSheets()
	}
	
	render(){
		return(
			<div>
				<div style={{background:'#fff'}}>
					<div className="section_inner" >
						<ul className="mod_top_subnav" >
							<li className="top_subnav__item">
								<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/home'>首页</NavLink>
							</li>
							<li className="top_subnav__item">
								<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/singer'>歌手</NavLink>
							</li>
							<li className="top_subnav__item">
								<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/newdisc'>新碟</NavLink>
							</li>
							<li className="top_subnav__item">
								<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/rankinglist'>排行榜</NavLink>
							</li>
							<li className="top_subnav__item">
								<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/classified'>分类歌单</NavLink>
							</li>
							<li className="top_subnav__item">
								<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/radioStation'>电台</NavLink>
							</li>
							<li className="top_subnav__item">
								<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/mv'>MV</NavLink>
							</li>
							<li className="top_subnav__item">
								<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/digital'>数字专辑</NavLink>
							</li>
							<li className="top_subnav__item">
								<NavLink className="top_subnav__link" activeClassName="top_subnav__link--current" to='/musichall/ticketing'>票务</NavLink>
							</li>
						</ul>
					</div>
				</div>
				<div style={{ clear:"both" }}></div>
				
				<Switch>
					<Route path='/musichall/home' component={Home}/>
					<Route path='/musichall/singer' component={Singer}/>
					<Route path='/musichall/newdisc' component={NewDisc}/>
					<Route path='/musichall/rankinglist' component={RankingList}/>
					<Route path='/musichall/classified' component={Classified}/>
					<Route path='/musichall/radioStation' component={RadioStation}/>
					<Route path='/musichall/mv' component={Mv}/>
					<Route path='/musichall/digital' component={Digital}/>
					<Route path='/musichall/ticketing' component={Ticketing}/>
					<Route path='/musichall/singerDetail/:singermid' component={SingerDetail}/>
					<Route path='/musichall/classDetail/:disstid' component={ClassDetail}/>
					<Route path='/musichall/userSheetDetail/:sheetId' component={UserSheetDetail}/>
					<Redirect to='/musichall/home'/>
				</Switch>
				
			</div>
		)
	}
}

export default connect(
	state=>({homeData:state.homeData}),
	{getHomeData,setLoveLists,setLoveSingers,setLoveSheets,setUserSheets}
)(MusicHall)
