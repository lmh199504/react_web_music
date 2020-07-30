
import React,{ Component } from 'react';
import { Button,Space,Popover } from 'antd';
import PropTypes from 'prop-types'
import { PlayCircleOutlined,PlusSquareOutlined,VerticalAlignBottomOutlined,FormOutlined } from '@ant-design/icons';
import './toolbar.less'
export default class Toolbar extends Component{
	static propTypes = {
		showRowSelection:PropTypes.bool.isRequired,
		setShowRow:PropTypes.func.isRequired
	}
		
	

	
	render(){
		const { showRowSelection,setShowRow } = this.props
		const content = (
		  <div onClick={ () => this.handleClick() }>
		    <ul className="addMenu">
				<li>播放队列</li>
				<li>我喜欢</li>
				<li><PlusSquareOutlined style={{ position:'absolute' ,left:6,top:12}}/>添加到新歌单</li>
			</ul>
		  </div>
		);
		return (
			<div className="mod_songlist_toolbar">
				<Space>
					<Button type="primary" size="large" icon={<PlayCircleOutlined />}>播放全部</Button>
					<Popover content={content} title="" trigger="click" placement="rightBottom">
						<Button size="large" icon={<PlusSquareOutlined />}>添加到</Button>
					</Popover>
					<Button size="large" icon={<VerticalAlignBottomOutlined />}>下载</Button>
					<Button size="large" icon={<FormOutlined />} onClick={ () => setShowRow() }>{ showRowSelection? '取消批量操作':'批量操作' }</Button>
				</Space>
			</div>
		)
	}
	
}