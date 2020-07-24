
import React,{ Component } from 'react'
import { Pagination,Spin } from 'antd'
import { reqGetMV } from '../../../api'
import { formatPubTime } from '../../../utils'
import './mv.less'
export default class Mv extends Component{
	
	state = {
		param:{
			area_id:15,
			version_id:7,
			page:1,
			order:1
		},
		mvTag:{},
		loading:false,
		mvList:[],
		total:0
	}
	
	componentDidMount = () => {
		this.getData()
	}
	
	setParam = (name,value) => {
		const { param } = this.state
		param[name] = value
		this.setState({
			param
		})
		this.getData()
	}
	getData = () => {
		this.setState({
			loading:true
		})
		const { param } = this.state
		reqGetMV(param).then(res => {
			this.setState({
				loading:false,
				mvTag:res.response.mv_tag.data,
				mvList:res.response.mv_list.data.list,
				total:res.response.mv_list.data.total
			})
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}
	
	
	render(){
		const { param,mvTag,loading,mvList } = this.state
		if(!mvTag.area){
			return null
		}
		
		
		return (
			<div className="main">
				<div className="mod_tag" id="mv_tags">
					<div className="tag__list js_tags_area">
						<h3 className="tag__tit">区域</h3>
						{
							mvTag.area.map(item => (
								<li className={`tag__item ${item.id===param.area_id?'tag__item--select':''}`} key={item.id} onClick={ () => this.setParam('area_id',item.id) }>{item.name}</li>
							))
						}

					</div>
					<div className="tag__list js_tags_version">
						<h3 className="tag__tit">版本</h3>
						{
							mvTag.version.map(item => (
								<li className={`tag__item ${item.id===param.version_id?'tag__item--select':''}`} key={item.id} onClick={ () => this.setParam('version_id',item.id) }>{item.name}</li>
							))
						}
					</div>
				</div>
				
				<div className="mod_part_detail">
					<div className="part_detail__hd">
						<h2 className="part_detail__tit js_lib_title">全部MV</h2>
						<div className="part_switch">
							<li className={`part_switch__item part_switch__item--left ${param.order ===1?'part_switch__item--select':''}`} onClick={() => this.setParam('order',1)}>最新</li>
							<li className={`part_switch__item part_switch__item--right ${param.order ===0?'part_switch__item--select':''}`} onClick={() => this.setParam('order',0)}>最热</li>
						</div>
					</div>
				</div>
				<Spin spinning={loading}>
					<div className="mod_mv">
						<ul className="mv_list__list" id="mv_list">
							{
								mvList.map(item => (
									<li className="mv_list__item" key={item.vid}>
										<div className="mv_list__item_box">
											<div className="mv_list__cover mod_cover js_mv">
												<img src={item.picurl} alt="tupian" className="mv_list__pic"/>	
												<i className="mod_cover__icon_play"></i>
											</div>
											
											<h3 className="mv_list__title">
												<span className="js_mv">{item.title}</span>
											</h3>	
											<div className="mv_list__singer">
												<span className="js_singer">{ item.singers[0].name }</span>
											</div>
											<div className="mv_list__info">
												<span className="mv_list__listen"><i className="mv_list__listen_icon sprite"></i>{item.playcnt}</span>{ formatPubTime(item.pubdate) }
											</div>
										</div>
									</li>
								))
							}
							
						</ul>
					</div>	
				</Spin>
				
				
				<Pagination defaultCurrent={param.page} total={1000}  style={{marginBottom:60,textAlign:'center'}} onChange={ (page) => this.setParam('page',page) } showSizeChanger={false}/>	
			</div>
		)
	}
}