import React,{ Component } from 'react'
import './userSheetDetail.less'
import Toolbar from '../../components/toolbar/toolbar'
import { Table,Button,Space,Popover,Spin,message } from 'antd'
import { VerticalAlignBottomOutlined,CaretRightOutlined,PlusOutlined,ShareAltOutlined } from '@ant-design/icons';
import { reqAddLoveSheet,reqDelLoveSheet,reqGetUserSheetSong } from '../../api'
import { formatSongTime,formatNum,isLoveSheet } from '../../utils'
import { connect } from 'react-redux'
import { setIndex,setCurrentSongs,resetPlaylist,setLoveSheets,addSongToPlay } from '../../redux/actions'

class ClassDetail extends Component{

    state = {
        islove:false,
        list:[],
        desc:'',
        tags:[],
        logo:'',
        headurl:'',
        visitnum:0,
        dissname:'',
        loading:false,
        nickname:'',
        sheetId:''
    }
    replaceImg = (e) => {
        e.target.src = require('../../assets/images/timg.jpg')
    }
    componentDidMount = () => {
        const { sheetId } = this.props.match.params
        this.setState({
            loading:true,
            sheetId
        })
        reqGetUserSheetSong({sheetId}).then(res => {
            console.log(res)
            this.setState({
                loading:false,
                desc:res.data.sheetData.desc,
                dissname:res.data.sheetData.name,
                logo:res.data.sheetData.sheetCover,
                list:res.data.songList
            })
        }).catch(()=>{
            this.setState({
                loading:false
            })
        })
    }
    playAll = () => {
        console.log("播放全部")
        const { list } = this.state
        list.forEach((item,index) => {
            if(index === 0){
                this.props.setIndex(index)
                this.props.setCurrentSongs(item)
            }
        })
        this.props.resetPlaylist(list)
    }
    setLove = () => {
        const { sheetId } = this.state
        const { loveSheet } = this.props
        if(isLoveSheet({sheetId},loveSheet)){
            this.delLoveSheet()
        }else{
            this.addLoveSheet()
        }
        
    }
    addLoveSheet = () => {
        const { disstid,visitnum,logo,dissname,nickname } = this.state
        this.setState({
            loading:true
        })
        reqAddLoveSheet({sheet:{disstid,visitnum,logo,dissname,nickname}}).then(() => {
            this.props.setLoveSheets()
            message.info('收藏成功.')
            this.setState({
                loading:false
            })
        }).catch(() => {
            this.setState({
                loading:false
            })
        })
    }
    delLoveSheet = () => {
        const { disstid,visitnum,logo,dissname } = this.state
        this.setState({
            loading:true
        })
        reqDelLoveSheet({sheet:{disstid,visitnum,logo,dissname}}).then(res => {
            this.props.setLoveSheets()
            message.info('取消收藏.')
            this.setState({
                loading:false
            })
        }).catch(() => {
            this.setState({
                loading:false
            })
        })
    }
    getContent = () => {
        const { desc } = this.state
        return <div style={{maxWidth:450}}>{desc}</div>
    }
    playOne = (record) => {
        const { currentIndex,playList } = this.props
        console.log(record)
		const i = playList.findIndex(listItem => {
			return listItem.songmid === record.songmid
		})
		if(i === -1){
			if(currentIndex === -1){
				this.props.setIndex(0)
				this.props.addSongToPlay({index:0,record})
				this.props.setCurrentSongs(record)
			}else{
				this.props.setIndex(currentIndex+1)
				this.props.addSongToPlay({index:currentIndex+1,record})
				this.props.setCurrentSongs(record)
			}
		}else{
			message.info('歌曲已在播放列表中.')
			this.props.setCurrentSongs(record)
			this.props.setIndex(i)
		}
    }
    render(){

        const columns = [
            {
              title: '歌曲',
              dataIndex: 'singerName',
              render:(text, record, index) => {
                  return (
                      
                      <div className="song_msg">
                          <div className="mod_songlist--edit songlist__number" style={{ color: "#000" }}>{ index+1 }</div>
                          <img src={`https://y.gtimg.cn/music/photo_new/T002R90x90M000${record.album.mid}.jpg?max_age=2592000`} alt="封面" className="song_cover" onError={ ($event) => this.replaceImg($event)} />
                          <div className="song_name">
                              {record.title}
                          </div>
                          <div className="mod_list_menu mytoolbtn">
                              <Space>
                                  <Button shape="circle" icon={<CaretRightOutlined />} onClick={ () => this.playOne(record) }></Button>
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
              width:"10%",
              render:(text,record,index) => {
                return (<div>{record.singer[0].name}</div>)
              }
            },
            {
                title:"专辑",
                dataIndex:"ablum",
                width:"10%",
                render:(text,record,index) =>{
                    return (<div>
                                {record.album.name}
                            </div>)
                }
            },
            {
              title: '时长',
              dataIndex: 'interval',
              width:"10%",
              render:(text,record,index) => {
                return (<div>{formatSongTime(record.interval)}</div>)
              }
            },
        ];
        const { list,logo,visitnum ,desc,dissname,tags,loading,nickname,} = this.state
        const { user } = this.props
        return(
            <div className="main userSheetDetial">
                <Spin spinning={loading}>
                    <div className="mod_data">
                        <span className="data__cover">
                            <img src={logo}  alt={dissname} className="data__photo"/>
                        </span>
                        <div className="data__cont">
                            <div className="data__name js_box">
                                <h1 className="data__name_txt" title={dissname} id="p_name_show">{dissname}</h1>
                            </div>
                            <div className="data__singer">
                            <i className="icon_singer sprite"></i><span title={nickname} className="data__singer_txt js_user" >{user.username}</span>
                            </div>

                            <ul className="data__info">
                                <li className="data_info__item js_box">
                                    <div className="data_tag_box">
                                        标签：<span id="choosebox1">
                                                {
                                                    tags.map(item=> (<span className="data_info__tags js_jump" key={item.id}>{item.name}</span>))
                                                }
                                                
                                            </span>
                                    </div>
                                </li>
                                <li className="data_info__item">播放量：{formatNum(visitnum)}</li>
                                <li className="data_info__item">收藏量：5.4万</li>
                            </ul>
                            <Toolbar playAll={this.playAll} shoucan={false} add={false} down={false} piliang={false}  comment={true} more={true}></Toolbar>
                        </div>
                    </div>
                    <div className="detail_layout">
                        <div className="detail_layout__main js_main">
                            <Table columns={columns} dataSource={list}  pagination={false} rowClassName={'rowClassName'}/>
                        </div>
                        <div className="detail_layout__other">
                            <div className="mod_about js_box">
                                <h3 className="about__tit">简介</h3>
                                <div className="about__cont">
                                    <p>{desc}</p>
                                </div>
                                <Popover content={this.getContent()} placement="bottomLeft" trigger="click">
                                    <div className="about__more">[更多]</div> 
                                </Popover>
                            </div>
                        </div> 
                    </div>
                </Spin>    
            </div>
        )
    }
}

export default connect(
    state=>({
        user:state.user,
        playList:state.playList,
        currentIndex:state.currentIndex
    }),
    {setIndex,setCurrentSongs,resetPlaylist,setLoveSheets,addSongToPlay }
)(ClassDetail)