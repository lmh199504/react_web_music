
import React,{Component} from 'react'
import { Button,Space,Table,message } from 'antd';
import Toolbar from '../../../components/toolbar/toolbar'
import { VerticalAlignBottomOutlined,CaretRightOutlined,PlusOutlined,ShareAltOutlined } from '@ant-design/icons';
import { formatSongTime,formatNum } from '../../../utils'
import { connect } from 'react-redux';
import { setIndex,setCurrentSongs,resetPlaylist,addSongToPlay,setLoveSheets } from '../../../redux/actions'
import './myLove.less'  
class MyLove extends Component{

    state = {
		selectedRowKeys: [], // Check here to configure the default column
        showRowSelection:false,
        index:1
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
    render(){
        const { loveList,loveSheet } = this.props
        const { index } = this.state
        loveList.forEach((element,index) => {
            element.key = index
        });

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
                                  <Button shape="circle" icon={<CaretRightOutlined />}  onClick={() =>this.playThis(record,index) }></Button>
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


        const { showRowSelection,selectedRowKeys } = this.state
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

                <div className="profile_cont">
                    <div className={`js_sub ${index === 1?'':'hidden'}`}id="like_song_box">
                        <Toolbar setShowRow={this.setShowRow} showRowSelection={showRowSelection} playAll={ this.playAll } piliang={true} down={true} add={true} shoucan={false}></Toolbar>
                        <div className="mod_songlist mod_songlist--edit">
                            <Table rowSelection={ showRowSelection ? rowSelection:false } columns={columns} dataSource={loveList}  pagination={false} rowClassName={'rowClassName'}/>
                        </div>
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
                                                    <i className="mod_cover__icon_play js_play" onClick={ () => this.playThis(item) }></i>
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
                        <div className="none_txt">
                            <i className="none_txt__symbol"></i>
                            <p style={{ color:'#000',fontSize:18 }}>什么也没有，去<a href="/musichall">音乐馆</a>发现好音乐！</p>
                        </div>
                    </div>
                    <div className={`js_sub ${index === 4?'':'hidden'}`}>
                        <div className="none_txt">
                            <i className="none_txt__symbol"></i>
                            <p style={{ color:'#000',fontSize:18 }}>什么也没有，去<a href="/musichall">音乐馆</a>发现好音乐！</p>
                        </div>
                    </div>

                </div>
            </div>
            
        )
    }
}

export default connect(
    state=>({loveList:state.loveList,
        playList:state.playList,
        currentIndex:state.currentIndex,
        loveSheet:state.loveSheet
    }),
    { setIndex,setCurrentSongs,resetPlaylist,addSongToPlay,setLoveSheets }
)(MyLove)