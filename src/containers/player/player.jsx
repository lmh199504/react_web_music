
import React,{ Component } from 'react'
import './player.less'
import { Slider,message } from 'antd'
import { connect } from 'react-redux'
import { formatSongTime,isLoveSong } from '../../utils'
import { setCurrentSongs,showBigplayer,hideBigPlayer,playing,resetPlaylist,setIndex,stopPlay,setLoveLists } from '../../redux/actions'
import { reqGetLyric,reqAddLoveSong,reqDelLoveSong } from '../../api'
import  Lyric  from 'lyric-parser'



class Player extends Component{
	
	state = {
		loading:false,
		cSong:{},
		checkall:false,
		currentLyric:null,
		currentLineNum: 0,
		currentTime:0,
		defaultTime:0, //提示框当前时间
		defaultVolume:50,
		playMode: 0, // 列表循环-0 顺序播放-1 随机播放-2 单曲循环-3
		showType:false //纯净模式
	}
	selectAll = () => {
		const { checkall } =  this.state
		this.setState({
			checkall:!checkall
		})
		const { playList } = this.props
		const arr = [...playList]
		arr.forEach(i=>{
			i.checked = !checkall
		})
		this.props.resetPlaylist(arr)
		
	}
	componentDidMount = () => {
		// console.log(this.refs.myAudio)
		const {defaultVolume} = this.state
		this.refs.myAudio.volume = defaultVolume/100
		this.refs.myAudio.onplay = () => {
			console.log('playing...')
			this.props.playing()
		}
		
		this.refs.myAudio.onerror = () => {
			// console.log("播放错误")
			const { isPlay } = this.props
			setTimeout(() => {
				if(isPlay){
					this.playNext()
				}
			},5000)
		}
		
		this.refs.myAudio.onended = () => {

			const { playMode,currentLyric } =  this.state
			
			if(playMode === 3){
				this.refs.myAudio.currentTime = 0
				this.refs.myAudio.play()
				currentLyric.seek(this.refs.myAudio.currentTime * 1000)
				this.reset()
			}else{
				this.playNext()
			}
		}
		this.refs.myAudio.ontimeupdate = () => {
			const { currentSong } = this.props
			
			this.setState({
				currentTime:parseInt(this.refs.myAudio.currentTime),
				defaultTime:(this.refs.myAudio.currentTime/currentSong.interval)*100
				
			})

		}
	}

	playNext = () => {
		console.log("下一首")
		const { currentIndex,playList } = this.props
		const { playMode } = this.state 
		console.log(playMode)
		if(playMode === 0 || playMode === 3){ //列表循环
			if(currentIndex<playList.length - 1){
				this.props.setIndex(currentIndex + 1)
				this.props.setCurrentSongs(playList[currentIndex + 1])
				
			}else{
				this.props.setIndex(0)
				this.props.setCurrentSongs(playList[0])
				
			}
		}else if(playMode === 1){ //顺序播放
			if(currentIndex<playList.length - 1){
				this.props.setIndex(currentIndex + 1)
				this.props.setCurrentSongs(playList[currentIndex + 1])
				
			}else{
				this.props.setIndex(0)
				this.props.setCurrentSongs(playList[0])
				
			}
		}else if(playMode === 2){
			const index = Math.floor(Math.random()*playList.length)
			this.props.setCurrentSongs(playList[index])
			this.props.setIndex(index)
		}
		
	}
	playPre = () => {
		const { currentIndex,playList } = this.props
		const { playMode } = this.state
		if(playMode === 0 || playMode === 3){ //顺序播放
			if(currentIndex === 0){
				this.props.setIndex(playList.length - 1)
				this.props.setCurrentSongs(playList[playList.length - 1])
			}else{
				this.props.setIndex(currentIndex - 1)
				this.props.setCurrentSongs(playList[currentIndex - 1])
			}
		}else if(playMode === 1){ //
			if(currentIndex === 0){
				this.props.setIndex(playList.length - 1)
				this.props.setCurrentSongs(playList[playList.length - 1])
			}else{
				this.props.setIndex(currentIndex - 1)
				this.props.setCurrentSongs(playList[currentIndex - 1])
			}
		}else {
			
			const index = Math.floor(Math.random()*playList.length)
			this.props.setCurrentSongs(playList[index])
			this.props.setIndex(index)
		}
		
		
	}
	formatter = (value) => {
		const { currentSong } = this.props
		return formatSongTime(parseInt((value/100)*currentSong.interval));
	}
	handleLyric = ({
	    lineNum,
	    txt
	}) => {
		
		
	    if (!this.refs.lyricLine) {
	        return
	    }
	    this.setState({
			currentLineNum:lineNum
		})
	
	    if (lineNum>2) {

	        let lineEl = document.getElementsByClassName('songLyricline')[lineNum-2 ]
			lineEl.scrollIntoView({block:"start",behavior:'smooth'})

	    } else {

			let lineEl = document.getElementsByClassName('songLyricline')[0]
			lineEl.scrollIntoView({behavior:'smooth'})
	    }

	}
	componentDidUpdate = () => {
		
		const { cSong,currentLyric } = this.state
		const { currentSong,bigPlayer,isPlay } = this.props
		if(currentSong.songmid !== cSong.songmid){
			console.log("播放新歌曲了")
			
			this.setState({
				cSong:currentSong
			})
			if(currentLyric){
				currentLyric.stop()
				this.setState({
					currentLyric:null,
					currentLineNum:0
				})
				
			}
			this.refs.myAudio.src = currentSong.src
			this.refs.myAudio.play()
			reqGetLyric({songmid:currentSong.songmid}).then(res=>{
				if(res.response.code === 0){
					
					const lyric = new Lyric(res.response.lyric,this.handleLyric)
					this.setState({
						currentLyric:lyric
					})
					let { currentLyric } = this.state
					currentLyric.play()
					if (isPlay) {
					    // 这个时候有可能用户已经播放了歌曲，要切到对应位置
					    currentLyric.seek(this.refs.myAudio.currentTime * 1000)
					}
				}
			})
			
		}
		
		if(bigPlayer){
			setTimeout(() => {
				document.getElementsByTagName('body')[0].style.overflow = 'hidden'
			})
		}else{
			setTimeout(() => {
				document.getElementsByTagName('body')[0].style.overflow = 'auto'
			})
			
		}
	}

	reset = () => {
		this.setState({
			currentLineNum:0,
			currentTime:0,
		})
	}
	checkedSong = (item) => {

		const { playList } = this.props
		const arr = [...playList]
		for(let i = 0;i<playList.length;i++){
			if(arr[i].songmid === item.songmid){
				arr[i].checked = !item.checked
			}
		}
		this.props.resetPlaylist(arr)
	}
	playThis = (item,index) => {
		this.props.setCurrentSongs(item)
		this.props.setIndex(index)
	}
	setCurrentTime = (value) => {
		console.log(value)
		const { currentSong } = this.props
		const { currentLyric } = this.state
		this.refs.myAudio.currentTime = (value/100)*currentSong.interval
		currentLyric.seek(this.refs.myAudio.currentTime * 1000)
	}
	
	toggelPlay = () => {
		const { currentLyric } = this.state
		const { isPlay } = this.props
		if(isPlay){
			this.props.stopPlay()
			this.refs.myAudio.pause()
			currentLyric.togglePlay()
		}else{
			this.props.playing()
			this.refs.myAudio.play()
			currentLyric.togglePlay()
		}
	}
	toolTipVolumn = (value) => {
		return value
	}
	changeVolumn = (value) => {
		this.refs.myAudio.volume = value/100
	}
	setPlayMode = () => {
		const { playMode } = this.state
		if(playMode === 3){
			this.setState({
				playMode:0
			})
		}else{
			this.setState({
				playMode:playMode + 1
			})
		}
	}
	setShowType = () => {
		const { showType } = this.state
		this.setState({
			showType:!showType
		})
	}
	downMusic = () => {

		
	}
	addLoveSong = () => {
		const { currentSong,user } = this.props
		let songList = []
		songList.push(currentSong)
		reqAddLoveSong({userId:user._id,songList}).then(() => {
			message.info("收藏成功")
			this.props.setLoveLists()
		})
	}
	delLoveSong = () => {

		const { currentSong,user } = this.props
		let songList = []
		songList.push(currentSong)
		reqDelLoveSong({userId:user._id,delList:songList}).then(()=>{
			this.props.setLoveLists()
		})
	}
	
	toggleLove = () => {
		const { currentSong,loveList } = this.props
		console.log(isLoveSong(currentSong,loveList))
		if(isLoveSong(currentSong,loveList)){
			this.delLoveSong()
		}else{
			this.addLoveSong()
		}
		
	}
	render(){
		const { cSong,checkall,currentLyric,currentLineNum,currentTime,defaultTime,defaultVolume,playMode,showType } = this.state
		const { bigPlayer,isPlay,playList,currentSong,loveList } = this.props
		return (
			<div className="player">
				<div className="smallPlayer">
					{
						cSong.cover ?
						<img  src={cSong.cover ? cSong.cover:require('../../assets/images/cd.jpg') } alt="mini" onClick={ () => this.props.showBigplayer() } className={`cover rotate ${ !isPlay?'rotate-pause':''}`}/>
						:null
					}
				</div>
				<div className={`bigPlayer ${ bigPlayer ? 'showBig':'' }`}>
					<div className="player_bg" style={{backgroundImage:`url(${cSong.cover})`}}></div>
					<div className="player_mask"></div>
					<h1 className="player_logo">
						<span>
							<img className="player_logo__pic" alt="logo" src={require("../../assets/images/player_logo.png")}/>
						</span>
					</h1>
					<div className="mod_player_login">
						<div className="player_login__guide">
							QQ音乐，千万高品质曲库尽享
							<span className="player_login__guide_btn js_floatLayer_download">
								<i className="player_login__guide_icon sprite"></i>
								客户端下载
							</span>
						</div>
						<span id="player_login">
							<span className="player_login__link">
								<img className="player_login__cover js_user_img" src="http://thirdqq.qlogo.cn/g?b=sdk&k=5GvhCOicBXrBf50u3StdLRw&s=140&t=1550910887" alt="头像"/>
								<span className="player_login__txt">敷衍、</span>
							</span>
							
							<span  className="player_login__out js_logout" onClick={ () => this.delLoveSong() }>退出</span>
						</span>
						
						<span className="player_login__link player_login__link--set js_opts_unlogin" ><span className="player_login__txt">设置</span></span>
						<span className="player_login__link player_login__link--set js_opts_unlogin" onClick={ () => this.props.hideBigPlayer() }><span className="player_login__txt">隐藏</span></span>
					</div>
					<div className="mod_player">
						<div className="player__hd"></div>
						<div className="player__bd ">
							<div className={ `player_style_normal js_box js_full_box ` }>
								<div className={`mod_songlist_toolbar ${showType?'hidden':''}` }>
									<li className="mod_btn js_all_like">
										<i className="mod_btn_green__icon_like"></i>收藏
										<span className="mod_btn__border"></span>
									</li>
									<li className="mod_btn js_all_fav">
										<i className="mod_btn_green__icon_add"></i>添加到
										<span className="mod_btn__border"></span>
									</li>
									<li className="mod_btn js_all_down">
										<i className="mod_btn_green__icon_down"></i>下载
										<span className="mod_btn__border"></span>
									</li>
									<li className="mod_btn js_all_delete">
										<i className="mod_btn_green__icon_delete"></i>删除
										<span className="mod_btn__border"></span>
									</li>
									<li className="mod_btn js_all_deleted">
										<i className="mod_btn_green__icon_clear"></i>清空列表
										<span className="mod_btn__border"></span>
									</li>
								</div>
								
								<div className={`sb_scrollable sb_main sb_viewport ${showType?'hidden':''}`}>
									<div className="sb_overview">
										<div className="mod_songlist mod_songlist--edit">
											<i className="player_songlist__line"></i>
											<ul className="songlist__header">
												<li className={`songlist__edit sprite ${checkall ?'songlist__edit--check':''}`} onClick={ () => this.selectAll()}>
													<input type="checkbox" className="songlist__checkbox js_check_all"/>
												</li>
												<li className="songlist__header_name">歌曲</li>
												<li className="songlist__header_author">歌手</li>
												<li className="songlist__header_time">时长</li>
											</ul>
											<i className="player_songlist__line"></i>
											<ul className="songlist__list" id="song_box">
												{
													playList.map((item,index) => (
														
														<li key={index}>
															<div className={`songlist__item ${item.songmid === cSong.songmid?'songlist__item--playing':''}`}>
																<div className={`songlist__edit sprite ${item.checked===true ? 'songlist__edit--check':''}`} onClick={ () => this.checkedSong(item) }>
																	<input type="checkbox" className="songlist__checkbox"/>
																</div>
																<div className="songlist__number">{index + 1}</div>
																<div className="songlist__songname">
																	<span className="songlist__songname_txt" title={item.title}>{item.title}</span>
																	<div className="mod_list_menu">
																		<div className="list_menu__item list_menu__play js_play" onClick={ () => this.playThis(item,index) }>
																			<i className="list_menu__icon_play"></i>
																			<span className="icon_txt">播放</span>
																		</div>
																		<div className="list_menu__item list_menu__add js_fav">
																			<i className="list_menu__icon_add"></i>
																			<span className="icon_txt">添加到</span>
																		</div>
																		<div className="list_menu__item list_menu__down js_down">
																			<i className="list_menu__icon_down"></i>
																			<span className="icon_txt">VIP下载</span>
																		</div>
																		<div className="list_menu__item list_menu__share js_share">
																			<i className="list_menu__icon_share"></i>
																			<span className="icon_txt">分享</span>
																		</div>
																	</div>
																</div>
																<div className="songlist__artist">
																	<span className="singer_name">{item.singer[0].name}</span>
																</div>
																<div className="songlist__time">{formatSongTime(item.interval)}</div>
																<div className="songlist__other"></div>
																<span className="songlist__delete js_delete">
																	<span className="icon_txt">删除</span>
																</span>
																<i className="player_songlist__line"></i>
															</div>
														</li>
													))
												}
											
												
											</ul>
										</div>
									</div>
									<div className="scroll_area sb vertical" style={{display:'none'}}>
										<div className="scroll_bg sb_bg"><div className="scroll_bg_cont sb_bg_cont"></div></div>
										<div className="scroll_bar sb_thumb" style={{height:0}}>
											<div className="scroll_bar_cont sb_thumb_cont" style={{height:0}}></div>
										</div>
									</div>
								</div>
								<div className={`mod_song_info ${showType?'maxSongInfo':''}`} id="song_info" >
									<div className={`song_info__info ${showType?'hidden':''}`}>
										<div className="song_info__cover js_album">
											<img src={ currentSong.cover } id="song_pic" alt="" className="song_info__pic"/>
										</div>
										<div className="song_info__name" id="song_name">
											歌曲名：<span>{ currentSong.title }</span>
										</div>
										<div className="song_info__singer">
											歌手名：<span>{ currentSong.singer ? currentSong.singer[0].name :''}</span>
										</div>
										<div className="song_info__album" id="album_name">
											专辑名：<span>{ currentSong.albumName }</span>
										</div>
									</div>
									<div className={`song_info__lyric ${showType?'maxLyric':''}`}>
										<div className="song_info__lyric_box js_lyric_box" ref="lyricList" data={currentLyric && currentLyric.lines}>
											<div className="song_info__lyric_inner qrc_ctn" id="qrc_ctn" >
												{
													currentLyric && currentLyric.lines ? currentLyric.lines.map((line, index) =>(
														<p ref="lyricLine" key={index} className={`songLyricline ${currentLineNum === index? 'current':''  }`}>{line.txt}</p>
													)):null
												}
											</div>
										</div>
									</div>
								</div>
								
							</div>
						</div>
						<div className="player__ft">
							<div className="btn_big_prev" onClick={ () => this.playPre() }>
								<span className="icon_txt">上一首</span>
							</div>
							<div className={`btn_big_play ${isPlay?'btn_big_play--pause':''}`} onClick={ () => this.toggelPlay() }>
								<span className="icon_txt">暂停</span>
							</div>
							<div className="btn_big_next" onClick={ () => this.playNext()}>
								<span className="icon_txt">下一首</span>
							</div>
							<div className="player_music">
								<div className="player_music__info" id="sim_song_info">
									<span className="js_song">
										{cSong.title }
									</span>
									 - 
									<span className="js_singer">{cSong.singer ? cSong.singer[0].name :'-'}</span>
								</div>
								<div className="player_music__time" id="time_show">{formatSongTime(currentTime)} / {formatSongTime(cSong.interval)}</div>
								<div className="player_progress">
									<Slider tipFormatter={this.formatter} onChange={ (value) => this.setCurrentTime(value)} value={defaultTime}/>
								</div>
								
							</div>
							<div>
								<span onClick={ () => this.setPlayMode() } 
									className={`${playMode === 0 ?'btn_big_style_list':playMode === 1?'btn_big_style_order':playMode===2?'btn_big_style_random':playMode===3?'btn_big_style_single':'' }`} id="play_mod" 
									title={ playMode === 0 ? '列表循环':playMode === 1 ?'顺序播放': playMode===2 ? '随机播放':playMode===3?'单曲循环':''}>
									<span className="icon_txt">{ playMode === 0 ? '列表循环':playMode === 1 ?'顺序播放': playMode===2 ? '随机播放':playMode===3?'单曲循环':''}</span>
								</span>
							</div>
							<div className={`btn_big_like js_btn_fav ${isLoveSong(currentSong,loveList)? 'btn_big_like--like':''}`} onClick={ () => this.toggleLove() }>
								<span className="icon_txt">喜欢[V]</span>
							</div>
							<div  className="btn_big_down js_btn_down" title="下载[D]" onClick={ () => this.downMusic() }><span className="icon_txt">下载[D]</span></div>
							<div className="mod_btn_comment js_into_comment btn_comment99">
								<span className="btn_comment__numbers">
									<i className="btn_comment__numb btn_comment__numb_9"></i>
									<i className="btn_comment__numb btn_comment__numb_9"></i>
									<i className="btn_comment__numb btn_comment__numb_9"></i>
									<i className="btn_comment__numb btn_comment__numb_add"></i>
								</span>
								<span className="icon_txt">评论</span>
							</div>
							<div className={`btn_big_only ${showType?'btn_big_only--on':''}`} id="simp_btn" onClick={ () => this.setShowType() }>
								<span className="icon_txt">打开纯净模式[C]</span>
							</div>
							<div className="player_progress player_voice">
								<div className="btn_big_voice" id="spanmute">
									<span className="icon_txt">关闭声音[M]</span>
								</div>
								<div className="player_progress__inner">
									<Slider tipFormatter={this.toolTipVolumn} onChange={ (value) => this.changeVolumn(value) } defaultValue={defaultVolume}/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<audio  src="" ref="myAudio" autoPlay={false}></audio >
			</div>
		)
	}
}
export default connect(
	state=>({
		user:state.user,
		playList:state.playList,
		currentSong:state.currentSong,
		bigPlayer:state.bigPlayer,
		isPlay:state.isPlay,
		currentIndex:state.currentIndex,
		loveList:state.loveList
	}),
	{ setCurrentSongs,showBigplayer,hideBigPlayer,playing,resetPlaylist,setIndex,stopPlay,setLoveLists }
)(Player)