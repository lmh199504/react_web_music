
import React,{Component} from 'react'
import { Button,Space,Table,message,Spin,Popover } from 'antd';
import Toolbar from '../../../components/toolbar/toolbar'
import { VerticalAlignBottomOutlined,CaretRightOutlined,PlusOutlined,ShareAltOutlined,DeleteOutlined } from '@ant-design/icons';
import { formatSongTime,formatNum,dwonFromSongMid } from '../../../utils'
import { connect } from 'react-redux';
import { setIndex,setCurrentSongs,resetPlaylist,addSongToPlay,setLoveSheets,setLoveLists } from '../../../redux/actions'
import { reqDelLoveSong,reqAddLoveSong,reqGetSongListDetail,reqAddSongToSheet } from '../../../api'
import NoData from '../../../components/noData/noData'
import Share from 'social-share-react'
import './myLove.less'  
import Song from '../../../utils/Song'
class MyLove extends Component{

    state = {
		selectedRowKeys: [], // Check here to configure the default column
        showRowSelection:false,
        index:1,
        loading:false
    }
    componentDidMount = () => {
        this.props.setLoveSheets()
    }
    setCurrent = (index) => {
        this.setState({
            index
        })
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
    
    playAll = () => {
        const { loveList } = this.props
        loveList.forEach((item,index) => {
            if(index === 0){
                this.props.setIndex(index)
                this.props.setCurrentSongs(item)
            }
        })

        this.props.resetPlaylist(loveList)
    }
    playThis = (item) => {
  

        const { currentIndex,playList } = this.props
		const song = item

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
    //删除喜欢
    delLove = (record) => {
        const { user } = this.props

        this.setState({loading:true})
        reqDelLoveSong({
            userId:user._id,
            delList:[{...record}]
        }).then(() => {
            this.props.setLoveLists()
            this.setState({loading:false})
            message.success("删除成功")
        }).catch(() => {
            this.setState({loading:false})
        })
    }

    addToPlay =　() => {
        const { selectedRowKeys } = this.state
        const addList = []
        if(selectedRowKeys.length === 0){
            message.info("请先选择歌曲")
        }else{
            const { playList,loveList } = this.props
            selectedRowKeys.forEach(i => {
                const index = playList.findIndex(play => play.songmid === loveList[i].songmid)
                if(index === -1){
                    addList.push(loveList[i])
                }
            })
            this.props.resetPlaylist([...playList,...addList])
            message.success('已添加到播放列表')
            this.setState({showRowSelection:false})
        }
    }
    addToMyLove = () => {
        const { selectedRowKeys } = this.state
        const addList = []
        if(selectedRowKeys.length === 0){
            message.info("请先选择歌曲")
        }else{
            const { loveList } = this.props
            this.setState({loading:true})
            selectedRowKeys.forEach(i => {
                addList.push(loveList[i])
            })
            const { user } = this.props
            reqAddLoveSong({userId:user._id,songList:addList}).then(() => {
                this.props.setLoveLists()
                message.success("添加成功.")
                this.setState({loading:false})
            }).catch(() => {
                this.setState({loading:false})
            })
        }
    }

    toClassDetail = (item) => {
		this.props.history.push(`/musichall/classDetail/${item.disstid}`)
	} 
    addToSheet = (sheet,record) => {
        console.log(sheet,record)
        const songList = []
        songList.push(record)
        reqAddSongToSheet({sheetId:sheet.sheetId,songList}).then( res => {
            if(res.data.num === 0){
                message.info('歌曲已存在')
            }else{
                message.success("收藏成功.")
            }

        })
    }


    dowonMusic = (item) => {
        dwonFromSongMid(item)
    }
    playThisSheet = (item) => {
        reqGetSongListDetail({disstid:item.disstid}).then(res => {
			const list = res.response.cdlist[0].songlist
			let playList = []
			list.forEach((item,index) => {
				let song = new Song(item)
				playList.push(song)
				if(index === 0){
					this.props.setIndex(0)
					this.props.setCurrentSongs(song)
				}
			})
			this.props.resetPlaylist(playList)

		})
    }

    downSelect = async () => {
        const { selectedRowKeys } = this.state
        const { loveList } = this.props
        const downList = []
        if(selectedRowKeys.length === 0){
            message.info("请先选择要下载的歌曲.")
        }else{
            selectedRowKeys.forEach(i=>{
                downList.push(loveList[i])
            })

            for(let item of downList){
                try{
                    await dwonFromSongMid(item)
                }catch(e){

                }
            }
            
        }
    }

    getSheetId = (sheetId) => {
        const { selectedRowKeys,data } = this.state
        if(selectedRowKeys.length === 0){
            message.info("请先选择各歌曲.")
            return
        }
        const addList = []
        selectedRowKeys.forEach(i => {
            addList.push(data[i])
        })
        console.log(sheetId)
        reqAddSongToSheet({songList:addList,sheetId})
    }
    render(){
        const { loveList,loveSheet,userSheet } = this.props
        const { index } = this.state
        loveList.forEach((element,index) => {
            element.key = index
        });

        const getContent = (record) => (
            userSheet.map(item => (
                <div key={item.sheetId} className="mylove_sheetItem" onClick={ () => this.addToSheet(item,record) }> {item.name} </div>
            ))
        )
        const shareContent = (
            <div>
                <Share 
                    title='音乐分享'
                    disabled={['google', 'facebook', 'twitter']} >
                </Share>
            </div>
        )
        const columns = [
            {
              title: '歌曲',
              dataIndex: 'title',
              render:(text, record, index) => {
                  return (
                      
                      <div className="song_msg">
                          <div className="mod_songlist--edit songlist__number" style={{ color: "#000" }}>{ index+1 }</div>
                          <div className="songlist__rank" style={{ display:'none' }}>
                              <i className="icon_rank_popular"></i>
                              168%
                          </div>
                          <img src={ record.cover } alt="封面" className="song_cover"/>
                          <div className="song_name">
                              {text}
                          </div>
                          <div className="mod_list_menu ">
                              <Space>
                                    <Button shape="circle" icon={<CaretRightOutlined />}  onClick={() =>this.playThis(record,index) }></Button>
                                    <Popover content= {getContent(record)} titel="添加歌单到" trigger="click" placement="rightBottom">
                                        <Button shape="circle" icon={<PlusOutlined />}></Button>
                                    </Popover>
                                    <Button shape="circle" icon={<VerticalAlignBottomOutlined />}  onClick={ () => this.dowonMusic(record) }></Button>
                                    <Popover content={ shareContent } titel="分享" trigger="click" placement="top">
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
              render:(text,record) => {
                  return (
                    <div className="mylove_delBtn">
                        <div className="time"> { formatSongTime(text) }</div>
                        <div className="del" onClick={ () => this.delLove(record) }><Button shape="circle" icon={<DeleteOutlined />}></Button></div>
                    </div>
                  )
              }
            },
        ];


        const { showRowSelection,selectedRowKeys,loading } = this.state
		const rowSelection = {
		    selectedRowKeys,
		    onChange: this.onSelectChange,
		};
        return (
            <div>

                <div className="js_box" id="like_box">
                    <div className="mod_tab">
                        <li className={`mod_tab__item ${index ===1 ?'mod_tab__current':''}`} onClick={ () => this.setCurrent(1) }>歌曲 {loveList.length}</li>
                        <li className={`mod_tab__item ${index ===2 ?'mod_tab__current':''}`} onClick={ () => this.setCurrent(2) }>歌单 {loveSheet.length}</li>
                        <li className={`mod_tab__item ${index ===3 ?'mod_tab__current':''}`} onClick={ () => this.setCurrent(3) }>专辑 0</li>
                        <li className={`mod_tab__item ${index ===4 ?'mod_tab__current':''}`} onClick={ () => this.setCurrent(4) }>视频 0</li>
                    </div>
                </div>
                <Spin spinning={loading}>
                    <div className="profile_cont">
                        <div className={`js_sub ${index === 1?'':'hidden'}`}id="like_song_box">
                            {
                                loveList.length!==0?
                                <div>
                                    <Toolbar setShowRow={this.setShowRow} showRowSelection={showRowSelection} 
                                        playAll={ this.playAll } piliang={true} down={true} add={true} shoucan={false}
                                        addToPlay={ this.addToPlay }
                                        addToMyLove={ this.addToMyLove }
                                        downSelect = {this.downSelect}
                                    ></Toolbar>
                                    <div className="mod_songlist mod_songlist--edit">
                                        <Table rowSelection={ showRowSelection ? rowSelection:false } columns={columns} dataSource={loveList}  pagination={false} rowClassName={'rowClassName'}/>
                                    </div>
                                </div>:<NoData/>
                            }
                        </div>


                        <div className={`js_sub ${index === 2?'':'hidden'}`}>
                            <div style={{ position:'relative',width:'100%',display:'flex',flexWrap:'wrap' }}>
                                    {
                                        loveSheet.map(item => (
                                            <div className="playlist__item slide__item classified" key={item.disstid} style={{display:'block'}}>
                                                <div className="playlist__item_inner">
                                                    <div className="playlist__cover ">
                                                        <img className="playlist__pic" src={item.logo} alt="封面" />
                                                        <i className="mod_cover__mask"  onClick={ () => this.toClassDetail(item) }></i>
                                                        <i className="mod_cover__icon_play js_play" onClick={ () => this.playThisSheet(item) }></i>
                                                    </div>
                                                    <h4 className="playlist__title">
                                                        <span className="playlist__title_txt">{item.dissname}</span>	
                                                    </h4>
                                                    <div className="playlist__other">
                                                        播放量：{formatNum(item.visitnum)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                            </div>
                        </div>
                        <div className={`js_sub ${index === 3?'':'hidden'}`}>
                            <NoData></NoData> 
                        </div>
                        <div className={`js_sub ${index === 4?'':'hidden'}`}>
                            <NoData></NoData>  
                        </div>

                    </div>
                </Spin>
            </div>
            
        )
    }

}

export default connect(
    state=>({loveList:state.loveList,
        playList:state.playList,
        currentIndex:state.currentIndex,
        loveSheet:state.loveSheet,
        user:state.user,
        userSheet:state.userSheet
    }),
    { setIndex,setCurrentSongs,resetPlaylist,addSongToPlay,setLoveSheets,setLoveLists }
)(MyLove)