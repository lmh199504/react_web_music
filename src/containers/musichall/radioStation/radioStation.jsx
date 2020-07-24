import React,{ Component } from 'react'
import { reqGetRadioLists } from '../../../api'
import { formatNum } from '../../../utils'
import './radioStation.less'
export default class RadioStation extends Component{
	
	state = {
		groupList:[],
		scrolTop:0,
		activeType:24
	}
	
	componentDidMount = () => {
		reqGetRadioLists().then(res => {
			this.setState({
				groupList:res.response.data.data.groupList
			})
		}).catch(() => {
			
		})
		
		window.addEventListener('scroll',()=>{
			this.setState({
				scrolTop:window.pageYOffset
			})
			//判断元素在页面内
			const radioTtemDom = document.getElementsByClassName('radio__item')
			for(let i =0;i<radioTtemDom.length;i++){
				
				let result = this.checkInPage(radioTtemDom[i])
				
				if(result){
					console.log(radioTtemDom[i].getAttribute('data-type'))
					const type = radioTtemDom[i].getAttribute('data-type')
					this.setState({
						activeType:+type
					})
					return
				}
				
			}
			
		})
		
		
		
	}
	checkInPage = el => {
	    const pageHeight = document.documentElement.clientHeight
	 
	    const contentTop = el.getBoundingClientRect().top
	    const contentHeight = el.offsetHeight
	 
	    return (contentTop<pageHeight && contentTop>=0) || (contentTop<0 && (contentTop+contentHeight - 500>0));
	}
	setIndex = (type) => {
		
		document.getElementsByClassName(`radio__item${type}`)[0].scrollIntoView();
		this.setState({
			activeType:+type
		})
	}
	
	render(){
		const { groupList,scrolTop,activeType } = this.state
		return (
			<div className="main">
				<div className="mod_radio_sidebar" id="taglist" style={{ top:scrolTop+'px' }}>
					{
						groupList.map(item => (
							<li className={`radio_sidebar__item ${Number(item.type)===activeType?'radio_sidebar__item--current':''}`} key={item.type} onClick={ () => this.setIndex(item.type) }>
								{item.name}
							</li>
						))
					}
				</div>
				
				<div className="mod_radio">
					{
						groupList.map(item => (
							<div className={`radio__item radio__item${item.type}`} key={item.type} data-type={item.type}>
								<h2 className="radio__tit">{item.name}</h2>
								<div className="mod_radio_list">
									{
										item.radioList.map(radio => (
											<div className="playlist__item slide__item radioStation" key={radio.radioId}>
												<div className="playlist__item_inner">
													<div className="playlist__cover ">
														<img className="playlist__pic" src={radio.radioImg} alt="封面"/>
														<i className="mod_cover__mask"></i>
														<i className="mod_cover__icon_play js_play"></i>
													</div>
													<h4 className="playlist__title">
														<span className="playlist__title_txt">{radio.radioName}</span>	
													</h4>
													<div className="playlist__other">
														播放量：{formatNum(radio.listenNum)}
													</div>
												</div>
											</div>
										))
									}
								</div>
							</div>
						))
					}

				</div>
			</div>
		)
	}
}