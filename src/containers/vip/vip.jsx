
import React,{ Component } from 'react'
import { Modal,Row,Col } from 'antd'
import './vip.less'
export default class MusicHall extends Component{
	
	state = {
		visible:false,
		currentIndex:0
	}

	handleOk = () => {
		this.setState({visible:false})
	}
	handleCancel = () => {
		this.setState({visible:false})
	}
	render(){
		const { currentIndex }  = this.state
		const payList = [
			{
				discount:"次月11.4元续费",
				openTime:"连续包月首开",
				nowPrice:4.8,
				oldPrice:15
			},{
				discount:"送腾讯视频季卡",
				openTime:"12个月",
				nowPrice:168,
				oldPrice:238
			},{
				discount:"送爱奇艺会员季卡",
				openTime:"12个月",
				nowPrice:168,
				oldPrice:238
			},{
				discount:"送肯德基vip卡",
				openTime:"3个月",
				nowPrice:45,
				oldPrice:90
			},{
				discount:"送肯德基vip卡",
				openTime:"12个月",
				nowPrice:168,
				oldPrice:238
			},{
				discount:"送个屁",
				openTime:"1个月",
				nowPrice:15,
				oldPrice:15
			}
		]

		return(
			<div className="main vip">
				<h1 className="want">你想充钱是吗?</h1>
				<h1 className="come">那就来吧。</h1>
				<Row gutter={16} className="payItemContainer">
					{
						payList.map((item,index) => (
							<Col className="gutter-row" span={6} key={index}>
								<li className={`payItem ${currentIndex===index?'active':''}`} onClick={() => this.setState({visible:true,currentIndex:index})}>
									<div className="discount">{item.discount}</div>
									<p className="openTime">{item.openTime}</p>
									<p className="nowPrice"><span>￥</span>{item.nowPrice}</p>
									<p className="oldPrice">￥{item.oldPrice}</p>
								</li>
							</Col>
						))
					}
				</Row>
				<Modal
					title="扫码支付"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					cancelText="取消"
					okText="确定"
				>
					<img src={require('../../assets/images/wxpay.jpg')} alt="" style={{width:'100%'}}/>
				</Modal>
			</div>
		)
	}
}