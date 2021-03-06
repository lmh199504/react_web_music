
import React,{ Component } from 'react'
import Slider from "react-slick";
import { Spin } from 'antd' 
import { connect } from 'react-redux'
import { SampleNextArrow,SamplePrevArrow } from '../../../../utils/slide'
import { formatNum } from '../../../../utils'
import { reqGetHomeClass} from '../../../../api'

import { resetPlaylists } from '../../../../redux/actions'
import { withRouter } from 'react-router-dom'

class Suggest extends Component{
	state = {
		suggestionIndex:0,
		classList:[],
		loading:false
	}
	
	componentDidMount = () => {
		this.getData(0,{id:-1})
	}
	getDetail = async(item) => {
		this.props.resetPlaylists(item)
	} 
	
	getData = (index,item) => {
		this.setState({
			suggestionIndex:index
		})
		const data = {
			titleid:item.id
		}
		this.setState({
			loading:true
		})
		
		reqGetHomeClass(data).then(res => {
			if(item.id === -1){
				if(res.data.code === 0 &&res.data.recomPlaylist.code === 0){
					this.setState({
						classList:res.data.recomPlaylist.data.v_hot
					})
				}
			}else{
				if(res.data.code === 0 &&res.data.playlist.code === 0){
					this.setState({
						classList:res.data.playlist.data.v_playlist
					})
				}
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

	toClassDetail = (item) => {
		console.log(item)
		this.props.history.push(`/musichall/classDetail/${item.content_id ? item.content_id : item.tid}`)
	}
	render(){
		const suggestionNav = [
			{name:'为你推荐',id:66},
			{name:'官方歌单',id:3317},
			{name:'情歌',id:71},
			{name:'网络歌曲',id:3056},
			{name:'经典',id:59},
			{name:'KTV热歌',id:64}
		]
		
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll:5,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		const {suggestionIndex,classList,loading} = this.state

		
		return (
			<div className="mod_index mod_index--hot mod_slide_box mod_bg" style={{paddingBottom: '60px'}}>
				<div className="section_inner">
					<div className="index__hd">
						<h2 className="index__tit"><i className="icon_txt">歌单推荐</i></h2>
					</div>
					<div className="mod_index_tab">
						{
							suggestionNav.map((item,index) => (
								<li key={index} className={ `index_tab__item js_tag ${suggestionIndex === index?'index_tab__item--current':'' }`  } onClick={ () =>  this.getData(index,item) }>{item.name}</li>
							))
						}
					
					</div>
					<Spin spinning={ loading }>
					
						<Slider {...settings}>
							{
								classList.map((item,index) => (
									<div className="playlist__item slide__item" key={index} >
										<div className="playlist__item_inner">
											<div className="playlist__cover " >
												<img className="playlist__pic" src={item.cover_url_big || item.cover} alt="封面"/>
												<i className="mod_cover__mask" onClick={ () => this.toClassDetail(item) }></i>
												<i className="mod_cover__icon_play js_play" onClick={ () => this.getDetail(item) }></i>
											</div>
											<h4 className="playlist__title">
												<span className="playlist__title_txt">{item.title}</span>	
											</h4>
											<div className="playlist__other">
												播放量：{formatNum(item.listen_num)}
											</div>
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

export default withRouter( connect(
	state=>({}),
	{resetPlaylists}
)(Suggest))