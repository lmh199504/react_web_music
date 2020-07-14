
import React,{ Component } from 'react'
import { Button,Space,Popover,Table } from 'antd';
import { PlayCircleOutlined,PlusSquareOutlined,VerticalAlignBottomOutlined,FormOutlined,CaretRightOutlined,PlusOutlined,ShareAltOutlined } from '@ant-design/icons';
import './ranking.less'



const columns = [
  {
    title: '歌曲',
    dataIndex: 'name',
	render:(text, record, index) => {
		return (
			
			<div className="song_msg">
				<div className="mod_songlist--edit songlist__number" style={{ color: index<3 ?'red' :'' }}>{ index+1 }</div>
				<div className="songlist__rank">
					<i className="icon_rank_popular"></i>
					168%
				</div>
				<img src="https://y.gtimg.cn/music/photo_new/T002R90x90M000002RspIW36U4Nn.jpg?max_age=2592000" alt="封面" className="song_cover"/>
				<div className="song_name">
					{text}
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
    dataIndex: 'age',
	width:300
  },
  {
    title: '时长',
    dataIndex: 'address',
	width:100
  },
];
const data = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    name: `爱，存在`,
    age: '林小珂',
    address: `05:30`,
  });
}

export default class RankingList extends Component{
	
	state = {
		selectedRowKeys: [], // Check here to configure the default column
		showRowSelection:false
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
	
	
	
	
	render(){
		
		const { selectedRowKeys,showRowSelection } = this.state;
		const rowSelection = {
		    selectedRowKeys,
		    onChange: this.onSelectChange,
		};
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
			<div className="main" style={{ paddingTop: 60 }}>
				<div className="toplist_nav">
					<dl className="toplist_nav__list">
						<dt className="toplist_nav__tit">巅峰榜</dt>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link toplist_nav__link--current">飙升榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">热歌榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">新歌榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">流行指数</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">听歌识曲榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">MV榜</p>
						</dd>
					</dl>
					
					
					<dl className="toplist_nav__list">
						<dt className="toplist_nav__tit">地区榜</dt>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link toplist_nav__link--current">飙升榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">热歌榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">新歌榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">流行指数</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">听歌识曲榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">MV榜</p>
						</dd>
					</dl>
					
					<dl className="toplist_nav__list">
						<dt className="toplist_nav__tit">特色榜</dt>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link toplist_nav__link--current">飙升榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">热歌榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">新歌榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">流行指数</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">听歌识曲榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">MV榜</p>
						</dd>
					</dl>
					
					<dl className="toplist_nav__list">
						<dt className="toplist_nav__tit">全球榜</dt>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link toplist_nav__link--current">飙升榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">热歌榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">新歌榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">流行指数</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">听歌识曲榜</p>
						</dd>
						<dd className="toplist_nav__item">
							<p className="toplist_nav__link">MV榜</p>
						</dd>
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
					<div className="mod_songlist_toolbar">
						<Space>
							<Button type="primary" size="large" icon={<PlayCircleOutlined />}>播放全部</Button>
							<Popover content={content} title="" trigger="click" placement="rightBottom">
								<Button size="large" icon={<PlusSquareOutlined />}>添加到</Button>
							</Popover>
							<Button size="large" icon={<VerticalAlignBottomOutlined />}>下载</Button>
							<Button size="large" icon={<FormOutlined />} onClick={ () => this.setState({
								showRowSelection:!showRowSelection
							}) }>{ showRowSelection? '取消批量操作':'批量操作' }</Button>
						</Space>
					</div>
					<div className="mod_songlist mod_songlist--edit">
						<Table rowSelection={ showRowSelection ? rowSelection:false } columns={columns} dataSource={data}  pagination={false} rowClassName={'rowClassName'}/>
					</div>
				</div>
				
				
			</div>
		)
	}
}