
import React,{ Component } from 'react'
import { Pagination,Spin } from 'antd';
import { reqGetNewDisks,reqGetAlbumInfo } from '../../../api'
import './newdisc.less'
import { SongFromNewDisc } from '../../../utils'
import {connect} from 'react-redux'
import { resetPlaylist,setIndex,setCurrentSongs } from '../../../redux/actions'
class NewDisc extends Component{
	
	state = {
		param:{
			page:1,
			area:1,
			num:20,
		},
		loading:false,
		activeIndex:0,
		discList:[],
		total:0
	}
	componentDidMount = () => {
		this.getData()
	}
	setArea = (item) => {
		const { param } =  this.state
		param.area = item.id
		this.setState({
			activeIndex:item.id,
			param
		})
		this.getData()
	}
	
	setParam = (name,value) => {
		const { param } =  this.state
		param[name] = value
		this.setState({
			param
		})
		this.getData()
	}
	
	
	getData = () => {
		const { param } = this.state
		this.setState({
			loading:true
		})
		reqGetNewDisks(param).then(res => {
			this.setState({
				loading:false,
				discList:res.response.new_album.data.albums,
				total:res.response.new_album.data.total
			})
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}
	playThis = (item) => {
		// console.log(item)
		reqGetAlbumInfo({albummid:item.mid}).then(res => {
			const list = res.response.data.list
			let playList = []
			list.forEach((item,index) => {
				let song = new SongFromNewDisc(item)
				playList.push(song)
				if(index === 0){
					this.props.setIndex(0)
					this.props.setCurrentSongs(song)
				}
			})
			this.props.resetPlaylist(playList)
		})
	} 
	
	render(){
		const { loading,param,discList,total } = this.state
		const tags = [
			{id: 1, name: "内地"},
			{id: 2, name: "港台"},
			{id: 3, name: "欧美"},
			{id: 4, name: "韩国"},
			{id: 5, name: "日本"},
			{id: 6, name: "其他"}
		]
		return (
			<div className="main">
				<div className="mod_tag" id="tag_list">
					<div className="tag__list">
						{
							tags.map(item => (
								<div className={`tag__item ${param.area === item.id ? 'tag__item--select':'' }`} key={item.id} onClick={ () => this.setArea(item)}>{item.name}</div>
							))
						}
					</div>
				</div>
				
				<Spin spinning={loading}>
					<div className="mod_part_detail">
						<div className="mod_playlist mod_playlist--all">
							<div className="playlist__list" id="album_list">
								{
									discList.map(item => (
										<li className="playlist__item" key={item.id}>
											<div className="playlist__item_box">
												<div className="playlist__cover mod_cover">
													<div className="js_album" onClick={ () => this.playThis(item) }>
														<img src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${item.photo.pic_mid}.jpg?max_age=2592000`} alt="守候" className="playlist__pic" style={{ display: 'block',visibility: 'visible' }}/>
														<i className="mod_cover__icon_play js_play" ></i>
													</div>
												</div>
												<h4 className="playlist__title">
													<span className="playlist__title_txt">
														<p className="js_album"  >{item.name}</p>
													</span>
												</h4>
												<div className="playlist__author">
													<p className="js_singer" >{item.singers[0].name}</p>
												</div>
												<div className="playlist__other">
													{item.release_time}
												</div>
											</div>
										</li>
									))
								}
							</div>
						</div>
					</div>
				</Spin>
				
				<Pagination defaultCurrent={param.page} total={total}  style={{marginBottom:60,textAlign:'center'}} onChange={ (page) => this.setParam('page',page) }/>
			</div>
		)
	}
}

export default connect(
	state=>({

	}),{
		resetPlaylist,setCurrentSongs,setIndex
	}
)(NewDisc)