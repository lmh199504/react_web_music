
import React,{ Component } from 'react';
import { Button,Space,Popover } from 'antd';
import PropTypes from 'prop-types'
import { PlayCircleOutlined,PlusSquareOutlined,VerticalAlignBottomOutlined,FormOutlined,HeartOutlined, CommentOutlined ,MoreOutlined} from '@ant-design/icons';
import './toolbar.less'
import { connect } from 'react-redux'
class Toolbar extends Component{
	static propTypes = {
		showRowSelection:PropTypes.bool,
		setShowRow:PropTypes.func,
		islove:PropTypes.bool,
		shoucan:PropTypes.bool.isRequired,
		add:PropTypes.bool.isRequired,
		down:PropTypes.bool.isRequired,
		piliang:PropTypes.bool.isRequired,
		setLove:PropTypes.func,
		comment:PropTypes.bool,
		downSelect:PropTypes.func
	}
	getSheetId = (sheetId) => {
		return sheetId
	}
	render(){
		const { showRowSelection,setShowRow,islove,shoucan,add,down,piliang,comment,more,userSheet } = this.props
		const content = (
		  <div>
		    <ul className="addMenu">
				<li onClick={ () => this.props.addToPlay() }>播放队列</li>
				<li onClick={ () => this.props.addToMyLove() }>我喜欢</li>
				{
					userSheet.map(item => (<li key={item.sheetId} onClick={ () => this.getSheetId(item.sheetId)}>{item.name}</li>))
				}
			</ul>
		  </div>
		);
		return (
			<div className="mod_songlist_toolbar">
				<Space>
					<Button type="primary" size="large" icon={<PlayCircleOutlined />} onClick={ ()=>this.props.playAll() }>播放全部</Button>
					<Button icon={ <HeartOutlined style={{color:islove ? 'red':'' }}/> } size="large" className={ `${shoucan ?'':'hidden'}`} onClick={() => this.props.setLove()}>收藏</Button>
					{
						add?<Popover content={content} title="" trigger="click" placement="rightBottom">
							<Button size="large" icon={<PlusSquareOutlined />}>添加到</Button>
						</Popover>:null
					}
					{
						down?<Button size="large" icon={<VerticalAlignBottomOutlined />} onClick={ () => this.props.downSelect() }>下载</Button>:null
					}
					{
						comment?<Button size="large" icon={ <CommentOutlined /> }>评论</Button>:null
					}
					
					{
						piliang?<Button size="large" icon={<FormOutlined />} onClick={ () => setShowRow() }>{ showRowSelection? '取消批量操作':'批量操作' }</Button>:null
					}
					{
						more?<Button size="large" icon={<MoreOutlined /> }>更多</Button>:null
					}
					
				</Space>
			</div>
		)
	}
	
}

export default connect(
	state=>({
		userSheet:state.userSheet
	})
)(Toolbar)