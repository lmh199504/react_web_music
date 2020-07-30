



import React,{ Component } from 'react'
import { connect } from 'react-redux'
import './ranking.less'
import { reqGetRanks } from '../../../../api'
import Song from '../../../../utils/Song'
import { setIndex,setCurrentSongs,resetPlaylist } from '../../../../redux/actions'
class Ranking extends Component{
	
	
	playThisRank = (item) => {
		console.log(item)
		reqGetRanks({topId:item.topId}).then(res => {
			let list = res.response.detail.data.songInfoList
			let playList = []
			list.forEach((item) => {
				let song = new Song(item)
				console.log(song)
				playList.push(song)
				if(playList.length === 1){
					this.props.setIndex(0)
					this.props.setCurrentSongs(song)
				}
			})
			this.props.resetPlaylist(playList)

		})

	} 
	
	render(){
		const { homeData } = this.props
		if(!homeData.toplist){
			return null
		}
		const topList = homeData.toplist.data.group[0].toplist
		
		return (
			<div className="mod_index mod_index--top  mod_slide_box mod_bg">
				<div className="section_inner">
					<div className="index__hd">
						<h2 className="index__tit"><i className="icon_txt">精彩推荐</i></h2>
					</div>
					
					<div className="mod_toplist" style={{marginLeft:'auto' }}>
						<ul className="toplist__list js_list">
							{
								topList.map((item,index) => (
									<li className= {`toplist__item item${index+1} mod_cover`} key={item.topId}>
										<div className="toplist__box">
											<div className="toplist__bg"></div>
											<i className="mod_cover__icon_play js_play_toplist" onClick={ () => this.playThisRank(item) }></i>
											<i className="toplist__line"></i>
											<h3 className="toplist__hd">
												<p className="toplist__tit" style={{ float:'unset' }}>热歌</p>
											</h3>
											<ul className="toplist__songlist">
												{
													item.song.map((items,i) => (
													<li className="toplist__song" key={i}>
														<div className="toplist__number">{items.rank}</div>
														<div className="toplist__songname"><span className="js_song">{items.title}</span></div>
														<div className="toplist__artist"><span>{items.singerName}</span></div>
													</li>
													))
												}

											</ul>
											
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

export default connect(
	state=>({homeData:state.homeData}),
	{setIndex,setCurrentSongs,resetPlaylist}
)(Ranking)
