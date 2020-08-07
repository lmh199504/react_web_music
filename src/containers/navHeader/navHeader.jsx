

import React,{ Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { reqGetHotkey,reqGetSmartbox,reqGetMusicVKey,reqGetMvPlay } from '../../api'
import { formatNum } from '../../utils'
import './index.less'
import { connect } from 'react-redux'
import { logout,showMvPlayer,setCurrentMv } from '../../redux/actions'
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
		resultAblum:[],
		searchHistory:[],
		width:220
	}

	search = (value) => {
		if(value===''){
			return
		}
		reqGetSmartbox({key:value}).then(res => {
			// console.log(res)
			let searchArr = localStorage.getItem('searchkey')
			console.log(searchArr)
			if(searchArr){
				searchArr = JSON.parse(searchArr)
				const index = searchArr.findIndex(key => key === value)
				if(index === -1){
					searchArr.unshift(value)
				}else{
					//先去掉该元素
					searchArr.splice(index,1)
					//再放入第一位
					searchArr.unshift(value)
				}

				
				if(searchArr.length >=5 ){
					searchArr.length = 5
				}
				this.setState({
					searchHistory:searchArr
				})
				localStorage.setItem('searchkey',JSON.stringify(searchArr))
			}else{
				searchArr = []
				searchArr.unshift(value)
				console.log(searchArr)
				if(searchArr.length >=5 ){
					searchArr.length = 5
				}
				this.setState({
					searchHistory:searchArr
				})
				localStorage.setItem('searchkey',JSON.stringify(searchArr))
			}
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
		
		if(localStorage.getItem('searchkey')){
			const searchArr = JSON.parse(localStorage.getItem('searchkey'))
			this.setState({
				searchHistory:searchArr
			})
		}

		window.onresize = () => {
			this.setWidth()
		}
		this.setWidth()
	}
	
	playThisOne = (item) => {
		// console.log(item)
		reqGetMusicVKey({songmid:item.mid}).then(res => {
			console.log(res)
		})
	}
	clearSearchHistory = () => {
		this.refs.searchInput.focus()
		localStorage.removeItem('searchkey')
		this.setState({
			searchHistory:[]
		})
	}
	delThisSearch = (index) => {
		this.refs.searchInput.focus()
		const { searchHistory } = this.state
		searchHistory.splice(index,1)
		this.setState({
			searchHistory
		})
		localStorage.setItem('searchkey',JSON.stringify(searchHistory))
	}
	searchThis = (value) => {
		this.refs.searchInput.focus()
		this.setState({
			searchValue:value.trim()
		})
		this.search(value.trim())
		
	}
	setWidth = () => {
		if(window.innerWidth<1240){
			this.setState({
				width:50
			})
		}else{
			this.setState({
				width:220
			})
		}
	}
	playThisMv = (item) => {
		reqGetMvPlay({vid:item.vid}).then(res => {
			
			const mp4Arr = res.response.getMVUrl.data[item.vid].mp4
			const mvUrl = mp4Arr[mp4Arr.length - 1].freeflow_url[mp4Arr[mp4Arr.length - 1].freeflow_url.length - 1]
			// console.log(mvUrl)
			this.props.showMvPlayer()
			this.props.setCurrentMv({url:mvUrl})
			
		})
	}
	render(){
		const { hotKeyArr,inIput,searchValue,resultSong,resultAblum,resultSinger,resultMv,searchHistory,width } = this.state
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
							  onBlur={ () => this.setState({inIput:false,width:window.innerWidth>1240?220:50}) }
							  onFocus={ () => this.setState({inIput:true,width:220}) }
							  onInput={ (event) => this.searchOnInput(event) }
							  value={searchValue}
							  ref="searchInput"
							  style={{width:width}}
							/>
							<div className="js_smartbox">
								<div className={`mod_search_other ${inIput && searchValue === ''?'drop':''}`}>
									<div className="search_hot">
										<dl className="search_hot__list" >
											<dt className="search_hot__tit">热门搜索</dt>
											<dd>
												{
													hotKeyArr.map((item,index)=>(
														index<5?<p  className="search_hot__link js_smartbox_search js_left" key={index} onClick={ () => this.searchThis(item.k) }>
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
												<span  className="search_history__clear js_smartbox_delete_all" onClick={ () => this.clearSearchHistory() }>
													<i className="icon_history_clear"></i>
													<span className="icon_txt">清空</span>
												</span>
											</dt>
											{
												searchHistory.map((item,index) => (
													<dd className="search_history__item" key={index} >
														<span  className="search_history__link js_smartbox_search js_left" onClick={ () => this.searchThis(item) }>{item}</span>
														<span  className="search_history__delete js_smartbox_delete" title="删除" onClick={ () => this.delThisSearch(index) }>
															<i className="search_history__icon_delete">
															</i><span className="icon_txt">删除</span>
														</span>
													</dd>
												))
											}
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
										resultAblum.length!==0 ?<div className="search_result__sort" style={{display:"none"}}>
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

													<li key={index} onClick={ () => this.playThisMv(item)}>
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
	{ logout,setCurrentMv,showMvPlayer }
)(NavHeader))