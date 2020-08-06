

import React,{ Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { reqGetHotkey,reqGetSmartbox,reqGetMusicVKey } from '../../api'
import { formatNum } from '../../utils'
import './index.less'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions'
import { withRouter } from 'react-router-dom'
const { Search } = Input

let timer = null
class NavHeader extends Component{
	

	state = {
		hotKeyArr:[],
		searchValue:'',
		inIput:false,
		resultSong:[],
		resultMv:[],
		resultSinger:[],
		resultAblum:[]
	}

	search = (value) => {
		if(value===''){
			return
		}
		reqGetSmartbox({key:value}).then(res => {
			console.log(res)
			this.setState({
				resultAblum:res.response.data.album.itemlist,
				resultMv:res.response.data.mv.itemlist,
				resultSinger:res.response.data.singer.itemlist,
				resultSong:res.response.data.song.itemlist
			})
		}).catch(() => {

		})
		

	}
	searchOnInput = (event) => {
		const key = event.target.value
		clearTimeout(timer)
		this.setState({
			searchValue:key
		})
		timer = setTimeout(()=>{
			if(key !== ''){
				this.search(key)
			}
		},500)

	}
	componentDidMount = () => {
		reqGetHotkey().then(res => {
			this.setState({
				hotKeyArr:res.response.data.hotkey
			})
		})
	}
	
	playThisOne = (item) => {
		// console.log(item)
		reqGetMusicVKey({songmid:item.mid}).then(res => {
			console.log(res)
		})
	}
	render(){
		const { hotKeyArr,inIput,searchValue,resultSong,resultAblum,resultSinger,resultMv } = this.state
		const { user } = this.props
		return (
			<div className="mod_header">
				<div className="section_inner">
					<h1 className="qqmusic_title">
						<a href="//y.qq.com">
							<img src={require('../../assets/images/logo@2x.png')} alt="QQ音乐" className="qqmusic_logo"/>
						</a>
					</h1>
					
					<ul className="mod_top_nav" >
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to='/musichall'>音乐馆</NavLink>
						</li>
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to= '/mymusic' >我的音乐</NavLink>
						</li>
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to='/client'>客户端</NavLink>
							
						</li>
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to='/platform'>开放平台</NavLink>
						</li>
						<li className="top_nav__item">
							<NavLink className="top_nav__link" activeClassName="top_nav__link--current" to='/vip'>VIP</NavLink>
						</li>
					</ul>
					
					<div className="mod_top_search">
						<div className="mod_search_input">
							<Search
							  placeholder="搜索音乐、MV、歌单、用户"
							  onSearch={value => this.search(value) }
							  style={{ width: 220 }}
							  onBlur={ () => this.setState({inIput:false}) }
							  onFocus={ () => this.setState({inIput:true}) }
							  onInput={ (event) => this.searchOnInput(event) }
							/>
							<div className="js_smartbox">
								<div className={`mod_search_other ${inIput && searchValue === ''?'drop':''}`}>
									<div className="search_hot">
										<dl className="search_hot__list" >
											<dt className="search_hot__tit">热门搜索</dt>
											<dd>
												{
													hotKeyArr.map((item,index)=>(
														index<5?<p  className="search_hot__link js_smartbox_search js_left" key={index}>
															<span className="search_hot__number">{index + 1}</span>
															<span className="search_hot__name">{item.k}</span>
															<span className="search_hot__listen">{formatNum(item.n)}</span>
														</p>:null
													))
												}
											</dd>
										</dl>
									</div>
									<div className="search_history">
										<dl className="search_history__list">
											<dt className="search_history__tit">搜索历史
												<span  className="search_history__clear js_smartbox_delete_all">
													<i className="icon_history_clear"></i>
													<span className="icon_txt">清空</span>
												</span>
											</dt>
								
											<dd className="search_history__item">
												<span  className="search_history__link js_smartbox_search js_left" data-name="许嵩">许嵩</span>
												<span  className="search_history__delete js_smartbox_delete" data-name="许嵩" title="删除">
													<i className="search_history__icon_delete">
													</i><span className="icon_txt">删除</span>
												</span>
											</dd>
									
										</dl>
									</div>
									
									
									
									
								</div>
								<div className={`mod_search_other ${inIput && searchValue !== ''?'drop':''}`} >
									<div className="search_result__sort">
										<h4 className="search_result__tit"><i className="search_result__icon_song"></i>单曲</h4>
										<ul className="search_result__list">
											
											{
												resultSong.map((item,index) => (
													index < 5 ?<li key={index} onClick={ () => this.playThisOne(item) }>
														<p className="search_result__link js_smartbox_song">
															<span className="search_result__name">{item.name}</span>-
															<span className="search_result__singer">
																{item.singer}
															</span>
														</p>
													</li>:null
												))
											}
										</ul>
									</div>
									


									
									{
										resultSinger.length!==0 ? <div className="search_result__sort">
											<h4 className="search_result__tit"><i className="search_result__icon_singer"></i>歌手</h4>
											<ul className="search_result__list">

												{
													resultSinger.map((item,index) => (
														<li key={index}  onClick={ () => this.props.history.push(`/musichall/singerDetail/${item.mid}`) }>
															<p className="search_result__link js_smartbox_singer" >
																<span className="search_result__name"><span className="search_result__keyword">{item.name}</span></span>
															</p>
														</li>
													))
												}

											</ul>
										</div>:null
									}
									


									
									{
										resultAblum.length!==0 ?<div className="search_result__sort">
											<h4 className="search_result__tit"><i className="search_result__icon_album"></i>专辑</h4>
											<ul className="search_result__list">

												{
													resultAblum.map((item,index) =>(
														index <2  ?<li key={index}>
															<p className="search_result__link js_smartbox_album">
																<span className="search_result__name">{item.name}</span>
																<span className="search_result__singer"><span className="search_result__keyword">{item.singer}</span></span>
															</p>
														</li>:null
													))
												}
											</ul>
										</div>:null
									}
									
									<div className="search_result__sort">
										<h4 className="search_result__tit"><i className="search_result__icon_mv"></i>MV</h4>
										<ul className="search_result__list">
											
											{
												resultMv.map((item,index) => (

													<li key={index}>
														<p className="search_result__link js_smartbox_mv" >
															<span className="search_result__name">{item.name}</span>-
															<span className="search_result__singer"><span className="search_result__keyword">{item.singer}</span></span>
														</p>
													</li>
												))
											}

										</ul>
									</div>
									
								</div>
							</div>
						</div>
					</div>
					<div className="header__opt">
						<div className="top_login__link js_logined">
							<img src={user.headerImg} alt="头像" className="top_login__cover js_user_img"/>	
						</div>	
						<div className="mod_btn_green top_login__btn_vip js_openvip" >开通绿钻豪华版</div>	
						<div className="mod_btn top_login__btn_vip js_openmusic" onClick={ () => this.props.logout() }>退出登录</div>
					</div>
				</div>	
			</div>
		)
	}
}


export default withRouter(connect(
	state=>({user:state.user}),
	{ logout }
)(NavHeader))