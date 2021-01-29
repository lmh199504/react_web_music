



import React,{ Component } from 'react'
import Slider from "react-slick";
import { connect } from 'react-redux'
import { SampleNextArrow,SamplePrevArrow } from '../../../../utils/slide'
import { Spin } from 'antd' 
import { formatNum } from '../../../../utils'
import { reqGetMvByTag,reqGetMvPlay } from '../../../../api'
import { showMvPlayer,setCurrentMv } from '../../../../redux/actions'


class Mv extends Component{
	state = {
		suggestionIndex:0,
		loading:false,
		mvList:[]
	}
	
	getData = (index,item) => {
		// console.log(index)
		this.setState({
			suggestionIndex:index,
			loading:true
		})
		reqGetMvByTag({lan:item.lan}).then(res => {
			console.log()
			this.setState({
				mvList:res.response.data.mvlist,
				loading:false
			})
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}

	playThisMv = (item) => {
		// console.log(item)
		reqGetMvPlay({vid:item.vid}).then(res => {
			
			const mp4Arr = res.response.getMVUrl.data[item.vid].mp4
			const mvUrl = mp4Arr[mp4Arr.length - 1].freeflow_url[mp4Arr[mp4Arr.length - 1].freeflow_url.length - 1]
			// console.log(mvUrl)
			this.props.showMvPlayer()
			this.props.setCurrentMv({url:mvUrl})
			
		})
	}
	componentDidMount = () => {
		this.getData(0,{})
	}
	
	render(){
		const suggestionNav = [
			{"id": 15,"name": "全部",lan:"all"},
			{"id": 16,"name": "内地",lan:"neidi"},
			{"id": 17,"name": "港台",lan:"korea"},
			{"id": 18,"name": "欧美",lan:"gangtai"},
			{"id": 19,"name": "韩国",lan:"oumei"},
			{"id": 20,"name": "日本",lan:"janpan"}
		]
		
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 5,
			rows:2,
			slidesToScroll:5,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />
		};
		const {suggestionIndex,loading,mvList} = this.state
		return (
			<div className="mod_index mod_index--mv mod_slide_box mod_bg" style={{paddingBottom: '60px'}}>
				<div className="section_inner">
					<div className="index__hd">
						<h2 className="index__tit"><i className="icon_txt">MV</i></h2>
					</div>
					<div className="mod_index_tab">
						{
							suggestionNav.map((item,index) => (
								<li key={index} className={ `index_tab__item js_tag ${suggestionIndex === index?'index_tab__item--current':'' }`  } onClick={ () =>  this.getData(index,item) }>{item.name}</li>
							))
						}
					
					</div>
					<Spin  spinning={loading}>
						<Slider {...settings}>
						    {
								mvList.map(item => (
									<div className="mv_list__item"  key={item.mv_id}>
										<div className="mv_list__item_box">
											<div className="mv_list__cover mod_cover js_mv" onClick={ () => this.playThisMv(item) }>
												<img className="mv_list__pic" src={item.picurl} alt="mv"/>
												<i className="mod_cover__icon_play"></i>
											</div>
											<h3 className="mv_list__title">
												<span className="js_mv">{item.mvtitle}</span>
											</h3>
											<p className="mv_list__singer">
												<span className="js_singer">{item.singer_name}</span>
											</p>
											<div className="mv_list__info">
												<span className="mv_list__listen"><i className="mv_list__listen_icon sprite"></i>{formatNum(item.listennum)}</span>
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
export default connect(
	state=>({}),
	{showMvPlayer,setCurrentMv}
)(Mv)