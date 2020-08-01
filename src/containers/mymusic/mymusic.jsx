
import React,{ Component } from 'react'
import Toolbar from '../../components/toolbar/toolbar'

import { Button,Space,Table } from 'antd';
import { VerticalAlignBottomOutlined,CaretRightOutlined,PlusOutlined,ShareAltOutlined } from '@ant-design/icons';
import './mymusic.less'
import { connect } from 'react-redux'
import { setLoveLists } from '../../redux/actions'
import { formatSongTime } from '../../utils'


const columns = [
  {
    title: '歌曲',
    dataIndex: 'title',
	render:(text, record, index) => {
		return (
			
			<div className="song_msg">
				<div className="mod_songlist--edit songlist__number" style={{ color: index<3 ?'red' :'' }}>{ index+1 }</div>
				<div className="songlist__rank" style={{ display:'none' }}>
					<i className="icon_rank_popular"></i>
					168%
				</div>
				<img src={ record.cover } alt="封面" className="song_cover"/>
				<div className="song_name">
					{text}
				</div>
				<div className="mod_list_menu mytoolbtn">
					<Space>
						<Button shape="circle" icon={<CaretRightOutlined />}></Button>
						<Button shape="circle" icon={<PlusOutlined />}></Button>
						<Button shape="circle" icon={<VerticalAlignBottomOutlined />}></Button>
						<Button shape="circle" icon={<ShareAltOutlined />}></Button>
					</Space>
				</div>
				
			</div>
		)
	}

  },
  {
    title: '歌手',
    dataIndex: 'title',
	width:300,
	render:(text,record,index) => {
		return(
			<div>
				{ record.singer?record.singer[0].name:'' }
			</div>
		)
	}
  },
  {
    title: '时长',
    dataIndex: 'interval',
	width:100,
	render:(text) => {
		return (
			<div>
				{ formatSongTime(text) }
			</div>
		)
	}
  },
];



class MyMusic extends Component{
	
	state = {
		selectedRowKeys: [], // Check here to configure the default column
		showRowSelection:false
	}
	onSelectChange = selectedRowKeys => {
	    console.log('selectedRowKeys changed: ', selectedRowKeys);
	    this.setState({ selectedRowKeys });
	}
	
	setShowRow = () => {
		const { showRowSelection } = this.state
		
		this.setState({
			showRowSelection:!showRowSelection
		})
	}
	componentDidMount = () => {
		this.props.setLoveLists()
	}
	
	
	render(){
		const { loveList } = this.props
		
		const { showRowSelection,selectedRowKeys } = this.state
		const rowSelection = {
		    selectedRowKeys,
		    onChange: this.onSelectChange,
		};
		return(
			<div className="mod_profile js_user_data" style={{ height:380 }}>
				<div className="section_inner">
					<div className="profile__cover_link">
						<img className="profile__cover" src="https://thirdqq.qlogo.cn/g?b=sdk&k=5GvhCOicBXrBf50u3StdLRw&s=140&t=1550910887" alt="头像"/>
					</div>
					<div className="profile__tit">
						<span className="profile__name">敷衍、</span>
						<img src="//y.gtimg.cn/music/icon/v1/mac/svip_g@2x.png?max_age=2592000" className="lv_icon" alt="lv"/>
					</div>
					<ul className="mod_user_statistic">
						<li className="user_statistic__item">
							<span className="js_tab">
								<strong className="user_statistic__number js_num_follow">0</strong>
								<span className="user_statistic__tit">关注</span>
							</span>
						</li>
						<li className="user_statistic__item user_statistic__item--last">
							<span className="js_tab">
								<strong className="user_statistic__number js_num_fans">0</strong>
								<span className="user_statistic__tit">粉丝</span>
							</span>
						</li>
					</ul>
					<button className="sprite js_btn_lock btn_lock" title="主页已公开" ><span className="icon_txt">主页已公开</span></button>
				</div>
				
				<div className="main main--profile">
					<div className="mod_tab profile_nav">
						<li className="mod_tab__item mod_tab__current">我喜欢</li>
						<li className="mod_tab__item ">我创建的歌单</li>
						<li className="mod_tab__item ">关注</li>
						<li className="mod_tab__item ">粉丝</li>
						<li className="mod_tab__item ">我上传的视频</li>
					</div>
					
					<div className="js_box" id="like_box">
						<div className="mod_tab">
							<li className="mod_tab__item mod_tab__current">歌曲 0</li>
							<li className="mod_tab__item ">歌单 0</li>
							<li className="mod_tab__item ">专辑 0</li>
							<li className="mod_tab__item ">视频 0</li>
						</div>
					</div>

					<div className="profile_cont">
						<div className="js_sub" id="like_song_box">
							<Toolbar setShowRow={this.setShowRow} showRowSelection={showRowSelection}></Toolbar>
							<div className="mod_songlist mod_songlist--edit">
								<Table rowSelection={ showRowSelection ? rowSelection:false } columns={columns} dataSource={loveList}  pagination={false} rowClassName={'rowClassName'}/>
							</div>
						</div>
					</div>
					
				</div>
				
				
			</div>
		)
	}
}

export default connect(
	state=>({loveList:state.loveList}),
	{setLoveLists}
)(MyMusic)