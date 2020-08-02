

import React,{ Component } from 'react'
import {  Radio,Spin,Popover,Pagination } from 'antd';
import { reqGetSongListCategories,reqGetSongLists,reqGetSongListDetail } from '../../../api'
import { formatNum } from '../../../utils'
import './classified.less'
import '../home/home.less'
import Song from '../../../utils/Song'
import { setIndex,setCurrentSongs,resetPlaylist } from '../../../redux/actions'
import { connect } from 'react-redux'

class Classified extends Component{
	
	state = {
		categories:[],
		param:{
			page:1,
			limit:20,
			sortId:'5',
			categoryId:10000000
		},
		loading:false,
		songList:[],
		total:10000
	}
	handleSizeChange = (e) => {
		const { param } = this.state
		param.sortId = e.target.value
		this.setState({ param });
		this.getData()
	}
	componentDidMount = async() => {
		const res = await reqGetSongListCategories()
		this.setState({
			categories:res.response.data.categories
		})
		this.getData()
	}
	
	getContent = (item) => {
		
		
		return(
			<div>
				<ul className="playlist_tag__tags" style={{ position:'relative',height:10 }}>
					{
						item.categoryGroupName === "语种"?
							item.items.map((tag,index) => {
								if(index>=5){
									return (<li className="playlist_tag__itembox" key={tag.categoryId} onClick={ () => this.setParm('categoryId',tag.categoryId)}>{tag.categoryName}</li>)
								}else{
									return null
								}
							}):item.items.map((tag,index) => {
								if(index>=8){
									return(<li className="playlist_tag__itembox" key={tag.categoryId} onClick={ () => this.setParm('categoryId',tag.categoryId)}>{tag.categoryName}</li>)
								}else{
									return null
								}
							})
					}
				</ul>
			</div>
		)
	}
	setParm = (name,value) => {
		const { param } = this.state
		if(name === "categoryId"){
			param.page = 1
		}
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
		reqGetSongLists(param).then(res => {
			this.setState({
				songList:res.response.data.list,
				loading:false
			})
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}

	playThis = (item) => {
		reqGetSongListDetail({disstid:item.dissid}).then(res => {
			const list = res.response.cdlist[0].songlist
			// console.log(list)
			let playList = []
			list.forEach((item,index) => {

				let song = new Song(item)
				playList.push(song)
				if(index === 0){
					this.props.setIndex(0)
					this.props.setCurrentSongs(song)
				}
			})
			this.props.resetPlaylist(playList)

		})
	}

	toClassDetail = (item) => {
		this.props.history.push(`/musichall/classDetail/${item.dissid}`)
	} 
	render(){
		const { param,categories,songList,loading,total } = this.state
		
		return (
			<div className="main">
				<div className="mod_playlist_tag" id="taglist">
					{
						categories.map(item => {
							if(item.categoryGroupName === "热门"){
								return null
							}else{
								return (
								
									<div className="js_normal" key={item.categoryGroupName}>
										<div className={ `playlist_tag__list ${ item.categoryGroupName === "语种"?'playlist_tag__list--lang':'' }` }>	
											<h3 className="playlist_tag__tit c_tx_thin">{item.categoryGroupName}</h3>
											<i className="playlist_tag__line"></i>
											<ul className="playlist_tag__tags">
												{
													item.categoryGroupName === "语种"? item.items.map((tag,index) => {
														if(index<5){
															return(
															<li className="playlist_tag__itembox" key={tag.categoryId} onClick={() => this.setParm('categoryId',tag.categoryId)}>
																<p className={`playlist_tag__item js_tag ${tag.categoryId===param.categoryId?'playlist_tag__item--select':''}`}>{tag.categoryName}</p>
															</li>)
														}else{
															return null
														}
													}):item.items.map((tag,index) => {
															if(index<8 || item.items.length === 9){
																return(
																<li className="playlist_tag__itembox" key={tag.categoryId} onClick={() => this.setParm('categoryId',tag.categoryId)}>
																	<p className={`playlist_tag__item js_tag ${tag.categoryId===param.categoryId?'playlist_tag__item--select':''}`}>{tag.categoryName}</p>
																</li>)
															}else{
																return null
															}
													})
												}
												
												{
													item.items.length !== 9 || (item.categoryGroupName === "语种"&&item.items.length !== 6) ?
													(<Popover placement="bottom" content={this.getContent(item)} trigger="click" width="1200">
														<li className="playlist_tag__itembox">
															<p className="playlist_tag__item js_more_tag">更多</p>
														</li>
													</Popover>):null
												}
												
											</ul>
										</div>
									</div>
								
								)
							}
						})
					}
					
				
					
				</div>
				<div style={{ clear:'both'}}></div>
				<div className="part_detail__hd">
					<div className="all_classified_title">全部歌单</div>
					<div>
						<Radio.Group value={param.sortId} onChange={ (target) => this.handleSizeChange(target)}>
							<Radio.Button value="5">推荐</Radio.Button>
							<Radio.Button value="2">最新</Radio.Button>
						</Radio.Group>
					</div>	
				</div>
				<Spin spinning={loading}>
					<div style={{ position:'relative',width:'100%' }}>
						
						    {
								songList.map(item => (
									<div className="playlist__item slide__item classified" key={item.dissid}>
										<div className="playlist__item_inner">
											<div className="playlist__cover ">
												<img className="playlist__pic" src={item.imgurl} alt="封面" />
												<i className="mod_cover__mask" onClick={ () => this.toClassDetail(item) }></i>
												<i className="mod_cover__icon_play js_play" onClick={ () => this.playThis(item) }></i>
											</div>
											<h4 className="playlist__title">
												<span className="playlist__title_txt">{item.dissname}</span>	
											</h4>
											<div className="playlist__other">
												播放量：{formatNum(item.listennum)}
											</div>
										</div>
									</div>
								))
							}
						
					</div>
				</Spin>
				
				<div>

					<Pagination defaultCurrent={param.page} current={param.page} total={total}  style={{marginBottom:60,textAlign:'center'}} pageSize={20} showSizeChanger={false} onChange={ (page) => this.setParm('page',page)}/>
				</div>
			</div>
		)
	}
}

export default connect(
	state=>({}),
	{ setCurrentSongs,setIndex,resetPlaylist }
)(Classified)