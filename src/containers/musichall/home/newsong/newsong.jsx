

import React,{ Component } from 'react'
import Slider from "react-slick";
import { connect } from 'react-redux'
import { reqGetHomeNewSong } from '../../../../api'
import { SampleNextArrow,SamplePrevArrow } from '../../../../utils/slide'
import { formatSongTime } from '../../../../utils'
import { Spin } from 'antd' 
import { setIndex,setCurrentSongs,addSongToPlay } from '../../../../redux/actions'
import  Song  from '../../../../utils/Song'
class NewSong extends Component{
	
	
	state = {
		suggestionIndex:0,
		songList:[],
		loading:false
	}
	
	getData = (index,item) => {

		this.setState({
			suggestionIndex:index,
			loading:true
		})
		const data = {
			type:item.type
		}
		reqGetHomeNewSong(data).then(res => {
			if(res.data.code === 0 && res.data.new_song.code === 0){
				this.setState({
					songList:res.data.new_song.data.songlist
				})
			}
			this.setState({
				loading:false
			})
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}
	
	componentDidMount = () => {
		this.getData(0,{type:5})
	}
	playThis = async(item) => {
		const { currentIndex } = this.props
		const song = new Song(item)
		if(currentIndex === -1){
			this.props.setIndex(0)
			this.props.addSongToPlay({index:0,song})
			this.props.setCurrentSongs(song)
		}else{
			this.props.setIndex(currentIndex+1)
			this.props.addSongToPlay({index:currentIndex+1,song})
			this.props.setCurrentSongs(song)
		}
	}
	render(){
		const suggestionNav = [
			{name:'最新',type:5},
			{name:'内地',type:1},
			{name:'港台',type:6},
			{name:'欧美',type:2},
			{name:'韩国',type:4},
			{name:'日本',type:3}
		]
		
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll:5,
			rows:3,
			nextArrow: <SampleNextArrow/>,
			prevArrow: <SamplePrevArrow/>
		};
		const { suggestionIndex,songList,loading } = this.state
		return (
			<div className="mod_index mod_index--song  mod_slide_box mod_bg">
				<div className="section_inner">
					<div className="index__hd">
						<h2 className="index__tit"><i className="icon_txt">新歌首发</i></h2>
					</div>
					<div className="mod_index_tab">
						{
							suggestionNav.map((item,index) => (
								<li key={index} className={ `index_tab__item js_tag ${suggestionIndex === index?'index_tab__item--current':'' }`  } onClick={ () =>  this.getData(index,item) }>{item.name}</li>
							))
						}
					</div>
					<Spin spinning={loading}>
						<Slider {...settings}>
							{
								songList.map((item,index) => (
								<div  key={index} >
									<div className="songlist__item_box">
									
										<div className="songlist__link album_name  mod_cover" onClick={ () => this.playThis(item) }>
																										
											<img src={`https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.pmid}.jpg?max_age=2592000`} className="songlist__pic" alt="封面"/>
											<i className="mod_cover__mask"></i>
											<i className="mod_cover__icon_play js_play"></i>
										</div>
										
										<div className="songlist__cont">
											<h3 className="songlist__song">
												<span className="js_song">{item.title}</span>
											</h3>
											<p className="songlist__author" title={item.singer[0].name}>
												{item.singer[0].name}
											</p>
										</div>
										<div className="songlist__time c_tx_thin">{ formatSongTime(item.interval) }</div>
									</div>
								</div>
									
								))
							}
						</Slider>
					</Spin>
					
				</div>
			</div>
		)
	}
}

export default  connect(
	state=>({
		currentIndex:state.currentIndex
	}),
	{ setIndex,setCurrentSongs,addSongToPlay }
)(NewSong)