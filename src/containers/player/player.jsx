
import React,{ Component } from 'react'
import './player.less'
import { connect } from 'react-redux'
import { formatSongTime } from '../../utils'
import { setCurrentSongs,showBigplayer,hideBigPlayer,playing,resetPlaylist,setIndex } from '../../redux/actions'
import { reqGetLyric } from '../../api'
import  Lyric  from 'lyric-parser'
class Player extends Component{
	
	state = {
		loading:false,
		cSong:{},
		checkall:false,
		currentLyric:null,
		currentLineNum: 0,
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
		console.log(this.refs.myAudio)
		this.refs.myAudio.onplay = () => {
			this.props.playing()
		}
		
		this.refs.myAudio.onerror = () => {
			
		}
		
		this.refs.myAudio.onend = () => {
			const { currentIndex,playList } = this.props
			if(currentIndex<playList.length){
				this.props.setCurrentSongs(playList[currentIndex + 1])
			}else{
				this.props.setCurrentSongs(playList[0])
			}
		}
	}
	componentWillReceiveProps = () => {
		
	}
	playNext = () => {
		
	}
	playPre = () => {
		
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
		
		const { cSong } = this.state
		const { currentSong,bigPlayer,isPlay } = this.props
		if(currentSong.songmid !== cSong.songmid){
			this.setState({
				cSong:currentSong
			})
			this.refs.myAudio.src = currentSong.src
			reqGetLyric({songmid:currentSong.songmid}).then(res=>{
				if(res.response.code === 0){
					
					const lyric = new Lyric(res.response.lyric,this.handleLyric)
					console.log(lyric)
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
			this.refs.myAudio.play()
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
	componentWillUpdate = () => {
		
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
	render(){
		const { cSong,checkall,currentLyric,currentLineNum } = this.state
		const { bigPlayer,isPlay,playList } = this.props
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
							
							<span  className="player_login__out js_logout" >退出</span>
						</span>
						
						<span className="player_login__link player_login__link--set js_opts_unlogin" ><span className="player_login__txt">设置</span></span>
						<span className="player_login__link player_login__link--set js_opts_unlogin" onClick={ () => this.props.hideBigPlayer() }><span className="player_login__txt">隐藏</span></span>
					</div>
					<div className="mod_player">
						<div className="player__hd"></div>
						<div className="player__bd">
							<div className="player_style_normal js_box js_full_box">
								<div className="mod_songlist_toolbar">
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
								
								<div className="sb_scrollable sb_main sb_viewport">
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
								<div className="mod_song_info" id="song_info">
									<div className="song_info__info">
										<div className="song_info__cover js_album">
											<img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003FdPSP16mkTG.jpg?max_age=2592000" id="song_pic" alt="" className="song_info__pic"/>
										</div>
										<div className="song_info__name" id="song_name">
											歌曲名：<span>VALI ATA UDALJ 思念的风雨</span>
										</div>
										<div className="song_info__singer">
											歌手名：<span>彻摩</span>
										</div>
										<div className="song_info__album" id="album_name">
											专辑名：<span>真圆 ZEMIYAN</span>
										</div>
									</div>
									<div className="song_info__lyric">
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
							<div className="btn_big_prev">
								<span className="icon_txt">上一首</span>
							</div>
							<div className="btn_big_play btn_big_play--pause">
								<span class="icon_txt">暂停</span>
							</div>
							<div className="btn_big_next">
								<span class="icon_txt">下一首</span>
							</div>
						</div>
					</div>
				</div>
				<audio  src="" ref="myAudio"></audio >
			</div>
		)
	}
}
export default connect(
	state=>({
		playList:state.playList,
		currentSong:state.currentSong,
		bigPlayer:state.bigPlayer,
		isPlay:state.isPlay,
		currentIndex:state.currentIndex
	}),
	{ setCurrentSongs,showBigplayer,hideBigPlayer,playing,resetPlaylist,setIndex }
)(Player)