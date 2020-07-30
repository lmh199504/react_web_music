
import React,{ Component } from 'react'
import { Pagination,Spin } from 'antd';
import { reqGetSingerList } from '../../../api'

import './singer.less'

export default class Singer extends Component{
	state = {
		param:{
			"area":-100,
			"sex":-100,
			"genre":-100,
			"index":-100,
			"sin":0,
			"page":1
		},
		tags:{},
		total:0,
		singerlist:[],
		loading:false
	}
	
	componentDidMount = () => {
		this.getData()
	}
	getData = () => {
		const {param} = this.state
		this.setState({
			loading:true
		})
		reqGetSingerList(param).then(res => {
			this.setState({
				tags:res.response.singerList.data.tags,
				total:res.response.singerList.data.total,
				singerlist:res.response.singerList.data.singerlist,
				loading:false
			})
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}
	
	setParam = (name,value) => {
		const { param } = this.state
		param[name] = value
		this.setState({
			param
		})
		this.getData()
	}
	
	setPage = (page,pageSize) => {
		const { param } = this.state
		param.page = page
		this.setState({
			param
		})
		this.getData()
	}
	replaceImg = (e) => {
		e.target.src = require('../../../assets/images/timg.jpg')
	}

	toSingerDetail = (item) => {
		console.log(item)
		this.props.history.push(`/musichall/singerDetail/${item.singer_mid}`)
	}

	render(){
		
		const { tags,param,total,singerlist,loading } = this.state
		if(!tags.area){
			return null
		}
		
		return (
			<div>
				<div className="mod_singer_push js_my_singers_nologin mod_singer_push--nofocus">
					<div>
						<div className="section_inner">
							<h2 className="singer_push__tit"><i className="icon_txt">万千歌手，尽在眼前</i></h2>
							<div className="singer_push__desc"><i className="icon_txt">登录查看你关注的歌手</i></div>
						</div>
					</div>
				</div>
				<div className="main">
					<div className="mod_singer_tag" id="tag_box">
						<div className="singer_tag__list js_index">
							

							{
								tags.index.map(item => (
									<p key={item.id} className={`singer_tag__item ${item.id === -100?'singer_tag__item--all':''} ${ item.id ===param.index? 'singer_tag__item--select':''}` } onClick={ () => this.setParam('index',item.id) }>{item.name}</p>
								))
							}

						</div>
						<div className="singer_tag__list js_area">
							{
								tags.area.map(item => (
									<p key={item.id}  className={`singer_tag__item ${item.id === -100?'singer_tag__item--all':''} ${ item.id ===param.area? 'singer_tag__item--select':''}` } onClick={ () => this.setParam('area',item.id) }>{item.name}</p>
								))
							}
						</div>
						<div className="singer_tag__list js_sex">
							{
								tags.sex.map(item => (
									<p key={item.id}  className={`singer_tag__item ${item.id === -100?'singer_tag__item--all':''} ${ item.id ===param.sex? 'singer_tag__item--select':''}` }  onClick={ () => this.setParam('sex',item.id) }>{item.name}</p>
								))
							}
						</div>
						<div className="singer_tag__list js_genre">
							{
								tags.genre.map(item => (
									<p key={item.id}  className={`singer_tag__item ${item.id === -100?'singer_tag__item--all':''} ${ item.id ===param.genre? 'singer_tag__item--select':''}` }  onClick={ () => this.setParam('genre',item.id) }>{item.name}</p>
								))
							}
						</div>
					</div>
					
					
					<div id="mod-singerlist">
						<div className="mod_singer_list">
							<Spin spinning={loading}>
								<ul className="singer_list__list js_avtar_list">
									{
										singerlist.map(item => (
											<li className="singer_list__item" key={item.singer_id} onClick={ () => this.toSingerDetail(item) }>
												<div className="singer_list__item_box">
													<div className="singer_list__cover js_singer">
														<img className="singer_list__pic" src={ item.singer_pic } alt={item.singer_name} onError={ $event => this.replaceImg($event) } />
													</div>
													<h3 className="singer_list__title">
														<p className="js_singer">{item.singer_name}</p>	
													</h3>
												</div>
											</li>
										))
									}
								</ul>
							</Spin>
							
						</div>
					</div>
				
					<Pagination defaultCurrent={param.page} total={total}  style={{marginBottom:60,textAlign:'center'}} pageSize={80} showSizeChanger={false} onChange={ (page,pageSize) => this.setPage(page,pageSize)}/>
				</div>
				
			</div>
		)
	}
}