
import React,{ Component } from 'react'
import './player.less'
import { connect } from 'react-redux'
import { setCurrentSongs,showBigplayer,hideBigPlayer,playing } from '../../redux/actions'

class Player extends Component{
	
	state = {
		loading:false,
		cSong:{}
	}
	componentDidMount = () => {
		console.log(this.refs.myAudio)
		this.refs.myAudio.onplay = () => {
			this.props.playing()
		}
		
		this.refs.myAudio.onError = () => {
			
		}
		
		this.refs.myAudio.onEnd = () => {
			
		}
	}
	componentWillReceiveProps = () => {
		
	}
	componentDidUpdate = () => {
		const { cSong } = this.state
		const { currentSong,bigPlayer } = this.props
		if(currentSong.songmid !== cSong.songmid){
			this.setState({
				cSong:currentSong
			})
			this.refs.myAudio.src = currentSong.src
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
	
	render(){
		const { cSong } = this.state
		const { bigPlayer,isPlay } = this.props
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
								<i class="player_login__guide_icon sprite"></i>
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
					<div className="mod_player"></div>
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
		isPlay:state.isPlay
	}),
	{ setCurrentSongs,showBigplayer,hideBigPlayer,playing }
)(Player)