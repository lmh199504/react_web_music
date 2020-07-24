
import React,{ Component } from 'react'
import { Button,Space,Table,Spin } from 'antd';
import { VerticalAlignBottomOutlined,CaretRightOutlined,PlusOutlined,ShareAltOutlined } from '@ant-design/icons';
import './ranking.less'
import {tags} from './tags.js'
import { reqGetRanks } from '../../../api'

import Toolbar from '../../../components/toolbar/toolbar'
const columns = [
  {
    title: '歌曲',
    dataIndex: 'singerName',
	render:(text, record, index) => {
		return (
			
			<div className="song_msg" key={record.rank}>
				<div className="mod_songlist--edit songlist__number" style={{ color: index<3 ?'red' :'' }}>{ record.rank }</div>
				<div className="songlist__rank">
					<i className="icon_rank_popular"></i>
					{ record.rankValue }
				</div>
				<img src={`https://y.gtimg.cn/music/photo_new/T002R90x90M000${record.albumMid}.jpg?max_age=2592000`} alt="封面" className="song_cover"/>
				<div className="song_name">
					{record.title}
				</div>
				<div className="mod_list_menu">
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
    dataIndex: 'singerName',
	width:"15%"
  },
  {
    title: '时长',
    dataIndex: 'address',
	width:"15%"
  },
];



export default class RankingList extends Component{
	
	state = {
		selectedRowKeys: [], // Check here to configure the default column
		showRowSelection:false,
		topId:4,
		data:[],
		loading:false
	};
		
	start = () => {
	    this.setState({ loading: true });
	    // ajax request after empty completing
	    setTimeout(() => {
	      this.setState({
	        selectedRowKeys: []
	      });
	    }, 1000);
	}
	onSelectChange = selectedRowKeys => {
	    console.log('selectedRowKeys changed: ', selectedRowKeys);
	    this.setState({ selectedRowKeys });
	}

	
	handleClick = () => {
		console.log("点我干什么")
	}
	
	setShowRow = () => {
		const { showRowSelection } = this.state
		this.setState({
			showRowSelection:!showRowSelection
		})
	}	
	setTopId = (item) => {
		const topId = item.topId
		this.setState({
			topId
		})
		this.getData()
	}
	componentDidMount = () => {
		this.getData()
	}
	
	getData = () => {
		const { topId } = this.state
		this.setState({
			loading:true
		})
		reqGetRanks({topId}).then(res => {
			this.setState({
				data:res.response.detail.data.data.song,
				loading:false
			})
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}
	
	render(){
		
		const { selectedRowKeys,showRowSelection,topId,data,loading } = this.state;
		const rowSelection = {
		    selectedRowKeys,
		    onChange: this.onSelectChange,
		};

		
		
		return (
			<div className="main" style={{ paddingTop: 60 }}>
				<div className="toplist_nav">
					<dl className="toplist_nav__list">
						<dt className="toplist_nav__tit">巅峰榜</dt>
						
						{
							tags.dianfeng.map(item => (
								<dd className="toplist_nav__item" key={item.topId} onClick={ () => this.setTopId(item)}>
									<p className={`toplist_nav__link ${item.topId === topId?'toplist_nav__link--current':''}`}>{item.name}</p>
								</dd>
							))
						}

					</dl>
					
					
					<dl className="toplist_nav__list">
						<dt className="toplist_nav__tit">地区榜</dt>
						{
							tags.area.map(item => (
								<dd className="toplist_nav__item" key={item.topId} onClick={ () => this.setTopId(item)}>
									<p className={`toplist_nav__link ${item.topId === topId?'toplist_nav__link--current':''}`}>{item.name}</p>
								</dd>
							))
						}
					</dl>
					
					<dl className="toplist_nav__list">
						<dt className="toplist_nav__tit">特色榜</dt>
						{
							tags.specail.map(item => (
								<dd className="toplist_nav__item" key={item.topId} onClick={ () => this.setTopId(item)}>
									<p className={`toplist_nav__link ${item.topId === topId?'toplist_nav__link--current':''}`}>{item.name}</p>
								</dd>
							))
						}
					</dl>
					
					<dl className="toplist_nav__list">
						<dt className="toplist_nav__tit">全球榜</dt>
						{
							tags.world.map(item => (
								<dd className="toplist_nav__item" key={item.topId} onClick={ () => this.setTopId(item)}>
									<p className={`toplist_nav__link ${item.topId === topId?'toplist_nav__link--current':''}`}>{item.name}</p>
								</dd>
							))
						}
					</dl>
				</div>
				<div className="mod_toplist">
					<div className="toplist__hd11">
						<h1 className="toplist__tit">流行指数榜</h1>
						<span className="toplist_switch">
							<span className="toplist_switch__data js_chosed_week">2020-07-14</span>
						</span>
						<p className="toplist__rule js_desc">榜单规则</p>
					</div>
					<Toolbar showRowSelection={showRowSelection} setShowRow={this.setShowRow}></Toolbar>
					<Spin spinning={loading}>
						<div className="mod_songlist mod_songlist--edit">
							<Table rowSelection={ showRowSelection ? rowSelection:false } columns={columns} dataSource={data}  pagination={false} rowClassName={'rowClassName'}/>
						</div>
					</Spin>
				</div>
			</div>
		)
	}
}