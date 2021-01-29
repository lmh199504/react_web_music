
import React,{ Component } from 'react'
import { Button,Space,Table,Spin,message,Popover } from 'antd';
import { VerticalAlignBottomOutlined,CaretRightOutlined,PlusOutlined,ShareAltOutlined } from '@ant-design/icons';
import './ranking.less'
import {tags} from './tags.js'
import { reqGetRanks,reqAddLoveSong } from '../../../api'
import  Song  from '../../../utils/Song'
import Toolbar from '../../../components/toolbar/toolbar'
import { connect } from 'react-redux'
import { setIndex,setCurrentSongs,resetPlaylist,addSongToPlay } from '../../../redux/actions'
import { dwonFromSongMid } from '../../../utils'
import Share from 'social-share-react'


class RankingList extends Component{
	
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

			const songList = res.response.detail.data.songInfoList
			const dataList = res.response.detail.data.data.song
			for(let i = 0;i<songList.length;i++){
				songList[i] = {...songList[i],...dataList[i]}

			}
			this.setState({
				data:res.response.detail.data.songInfoList,
				loading:false
			})
		}).catch(() => {
			this.setState({
				loading:false
			})
		})
	}
	

	playAll = () => {
		const { data } = this.state
		let playList = []
		data.forEach((item,index) => {
			let song = new Song(item)
			playList.push(song)
			if(index === 0){
				this.props.setIndex(0)
				this.props.setCurrentSongs(song)
			}
		})
		this.props.resetPlaylist(playList)

	}
	playThisOne = (record) => {
		const { currentIndex,playList } = this.props
		// console.log(record)
		let song = new Song(record)
		const i = playList.findIndex(listItem => {
			return listItem.songmid === song.songmid
		})
		if(i === -1){
			if(currentIndex === -1){
				this.props.setIndex(0)
				this.props.addSongToPlay({index:0,song})
				this.props.setCurrentSongs(song)
			}else{
				this.props.setIndex(currentIndex+1)
				this.props.addSongToPlay({index:currentIndex+1,song})
				this.props.setCurrentSongs(song)
			}
		}else{
			message.info('歌曲已在播放列表中.')
			this.props.setCurrentSongs(song)
			this.props.setIndex(i)
		}
	}
	addToPlay = () => {
		const { playList,isPlay } = this.props
		const { selectedRowKeys,data } =  this.state
		if(selectedRowKeys.length === 0){
			message.info("请先选择歌曲.")
		}else{
			selectedRowKeys.forEach(i => {
				const index = playList.findIndex(item => item.songmid === new Song(data[i]).songmid)
				if(index === -1){
					playList.push(new Song(data[i]))
				}
			})			
			if(isPlay){
				console.log("歌曲已经播放了...")
				
			}else{
				console.log("歌曲还未播放...")
				this.props.setCurrentSongs(playList[0])
				this.props.setIndex(0)
			}
			this.props.resetPlaylist(playList)
		}
	}
	downSelect = async () => {
		const { selectedRowKeys,data } = this.state
		console.log(data)
        const downList = []
        if(selectedRowKeys.length === 0){
            message.info("请先选择要下载的歌曲.")
        }else{
            selectedRowKeys.forEach(i=>{
                downList.push(new Song(data[i]))
            })

            for(let item of downList){
                try{
                    await dwonFromSongMid(item)
                }catch(e){

                }
            }
        }
    }
	addToMyLove = () => {
		const { selectedRowKeys,data } = this.state
		const { user } = this.props
		const songList = []

		if(selectedRowKeys.length === 0){
			message.info('请先选择歌曲')
			return
		}
		selectedRowKeys.forEach(i => {
			songList.push(new Song(data[i]))
		})
		reqAddLoveSong({songList,userId:user._id}).then(() => {
			message.success("歌曲添加成功.")
		})

	}
	render(){
		
		const { selectedRowKeys,showRowSelection,topId,data,loading } = this.state;
		const rowSelection = {
		    selectedRowKeys,
		    onChange: this.onSelectChange,
		};
		data.forEach((item,index) => {
			item.key = index
		})
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
						  <img src={`https://y.gtimg.cn/music/photo_new/T002R90x90M000${record.album.mid}.jpg?max_age=2592000`} alt="封面" className="song_cover"/>
						  <div className="song_name">
							  {record.title}
						  </div>
						  <div className="mod_list_menu ">
							  <Space>
								  <Button shape="circle" icon={<CaretRightOutlined />} onClick={ () => this.playThisOne(record)}></Button>
								  <Button shape="circle" icon={<PlusOutlined />}></Button>
								  <Button shape="circle" icon={<VerticalAlignBottomOutlined />} onClick={ () => dwonFromSongMid({songmid:record.mid,title:record.title}) }></Button>
								  <Popover content={<Share title={record.title} sites={["qzone","qq","weibo","wechat"]} image={`https://y.gtimg.cn/music/photo_new/T002R90x90M000${record.album.mid}.jpg?max_age=2592000`}></Share>}>
                                    <Button shape="circle" icon={<ShareAltOutlined />}></Button>
                                  </Popover>
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
			  dataIndex: 'interval',
			  width:"15%"
			},
		];
		
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
							<span className="toplist_switch__data js_chosed_week">{ () => new Date() }</span>
						</span>
						<p className="toplist__rule js_desc">榜单规则</p>
					</div>
					<Toolbar showRowSelection={showRowSelection} downSelect={this.downSelect} setShowRow={this.setShowRow} playAll={this.playAll} piliang={true} down={true} add={true} shoucan={false} addToPlay={this.addToPlay} addToMyLove={ this.addToMyLove }></Toolbar>
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
export default connect(
	state=>({
		playList:state.playList,
		currentIndex:state.currentIndex,
		isPlay:state.isPlay,
		user:state.user
	}),
	{setIndex,setCurrentSongs,resetPlaylist,addSongToPlay}
)(RankingList)