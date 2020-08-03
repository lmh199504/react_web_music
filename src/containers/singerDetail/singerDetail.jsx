
import React, { Component } from 'react'
import { reqGetSingerDesc, reqGetSingerHotsong,reqGetSingerAblumList,reqGetSingerMV,reqGetSingerStarNum,reqAddLoveSinger,reqDelLoveSinger,reqGetSimilarSinger } from '../../api'
import { formatSongTime, formatNum,isLoveSinger } from '../../utils'
import './singerDetail.less'
import { parseString  } from 'xml2js'
import { Popover } from 'antd'
import { connect } from 'react-redux'
import Song from '../../utils/Song'
import { message } from 'antd'
import { setIndex,setCurrentSongs,addSongToPlay,resetPlaylist,setLoveSingers } from '../../redux/actions'
class SingerDetail extends Component {

    state ={
        basic:{},
        desc:'',
        singermid:'',
        totalSongs:0,
        totalMv:0,
        fanMvNum:0,
        singerMvNum:0,
        totalAblum:0,
        hotSong:[],
        albumlist:[],
        cSong:{},
        singerName:'',
        mvList:[],
        fanMvList:[],
        fansNum:0,
        singerlist:[]
    }
    componentDidMount = () => {
        const { singermid } = this.props.match.params
        this.setState({
            singermid
        })
        reqGetSingerDesc({ singermid }).then(res => {

            parseString(res.response,{explicitArray : false},(err,result) => {
                this.setState({
                    basic:result.result.data.info.basic,
                    desc:result.result.data.info.desc
                })
            })
        })

        reqGetSingerHotsong({ singermid }).then(res => {
            this.setState({
                totalSongs:res.data.singerSongList.data.totalNum,
                hotSong:res.data.singerSongList.data.songList
            })

            const { hotSong } = this.state
            const singerName = hotSong[0].songInfo.singer[0].name
            this.setState({
                singerName
            })

        })

        reqGetSingerAblumList({singermid}).then(res => {
            this.setState({
                albumlist:res.data.getAlbumList.data.albumList,
                totalAblum:res.data.getAlbumList.data.total
            })
        })

        reqGetSingerMV({singermid}).then(res => {
            this.setState({
                mvList:res.response.data.list,
                singerMvNum:res.response.data.total
            })
        })

        reqGetSingerMV({singermid,order:'time'}).then(res => {
            this.setState({
                fanMvList:res.response.data.list,
                fanMvNum:res.response.data.total
            })
        })
        reqGetSingerStarNum({singermid}).then(res => {
            this.setState({
                fansNum:res.response.num
            })
        })

        reqGetSimilarSinger({singermid}).then(res => {
            this.setState({
                singerlist:res.response.singers.items
            })
        })
    }
    getContent = (text) => {
        return (
            <div style={{width:480,maxHeight:450,overflowY:'auto'}}>
                {text}
            </div>
        )
    }
    playThis = (item,index) => {
        const song = new Song(item.songInfo)
        const { playList } =  this.props
        const { currentIndex } = this.props
        console.log(playList)
        const i =  playList.findIndex(item => {
            return item.songmid === song.songmid
        })
        console.log(i)
        if(i === -1){
            this.props.setCurrentSongs(song)
            if(currentIndex === -1){
                this.props.addSongToPlay({index:0,song})
                this.props.setIndex(0)
            }else{
                
                this.props.addSongToPlay({index:currentIndex + 1,song})
                this.props.setIndex(currentIndex + 1)
            }
        }else{
            message.info("歌曲已在播放列表中.")
            this.props.setCurrentSongs(song)
            this.props.setIndex(i)
        }

        
        
        
    }

    playHotSong = () => {
        const {hotSong} = this.state
        let playList = []
        hotSong.forEach((item,index) => {
            let song = new Song(item.songInfo)
            playList.push(song)
            if(index === 0){
                this.props.setIndex(0)
                this.props.setCurrentSongs(song)
            }
        })
        
        this.props.resetPlaylist(playList)

    }
    addLoveSinger = () => {
        const { user } = this.props

        const { singerName,singermid } = this.state
        reqAddLoveSinger({userId:user._id,singer:{singerName,singermid}}).then(res => {
            message.success("关注成功.")
            this.props.setLoveSingers()
        }).catch(() => {
            console.log("错误了.")
        })
    }

    delLoveSinger = () => {
        const { singerName,singermid } = this.state
        reqDelLoveSinger({singer:{singerName,singermid}}).then(res => {
            message.success('取消关注成功.')
            this.props.setLoveSingers()
        })
    }
    toggleLove = () => {
        const { singermid } = this.state
        const { loveSinger } = this.props
        console.log(loveSinger)
        console.log(isLoveSinger({singermid},loveSinger))
        if(isLoveSinger({singermid},loveSinger)){ //是喜欢的歌手
            this.delLoveSinger()
        }else{
            this.addLoveSinger()
        }
    }
    replaceImg = (e) => {
		e.target.src = require('../../assets/images/timg.jpg')
	}
    toSingerDetail = (item) => {
		
        this.props.history.push(`/musichall/singerDetail/${item.mid}`)
        window.location.reload()
	}
    render() {
        const { basic,desc,singermid,totalSongs,cSong,singerName,hotSong,albumlist,mvList,fanMvList,totalAblum,singerMvNum,fanMvNum,fansNum,singerlist } = this.state
        const { loveSinger } = this.props
        return (
            <div className="main singerDetail" >
                <div className="mod_data">
                    <span className="data__cover">
                        <span className="js_goto_tab js_none_index" style={{ display: 'none' }}>
                            <img src={`https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`} alt="封面" />
                        </span>

                        <img src={`https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`} alt="封面" className="data__photo js_index" />
                    </span>
                    <div className="data__cont">
                        <div className="data__name">
                            <h1 className="data__name_txt js_none_index" style={{ display: 'none' }}>
                                <span className="js_goto_tab" title={singerName} >{singerName}</span>
                            </h1>
                            <h1 className="data__name_txt js_index" title={singerName}> {singerName}</h1>
                        </div>
                        <div className="data__desc" id="singer_desc">
                            <div className="data__desc_txt" id="short_desc">
                                {
                                    basic.item ? basic.item.map(item=>(
                                        item.key+'：'+item.value+ ' '
                                    )):null
                                }
                                
                            </div>
                            <Popover placement="bottomRight" title={'歌手简介'} content={this.getContent(desc)} trigger="click">
                                <span className="js_desc detailMore">[更多]</span>
                            </Popover>
                            
                        </div>
                        <ul className="mod_data_statistic">
                            <li className="data_statistic__item">
                                <div className="js_goto_tab">
                                    <span className="data_statistic__tit">单曲</span>
                                    <strong className="data_statistic__number">{totalSongs}</strong>
                                </div>
                            </li>
                            <li className="data_statistic__item">
                                <div className="js_goto_tab">
                                    <span className="data_statistic__tit">专辑</span>
                                    <strong className="data_statistic__number">
                                        {totalAblum}
                                    </strong>
                                </div>
                            </li>
                            <li className="data_statistic__item">
                                <div className="js_goto_tab">
                                    <span className="data_statistic__tit">MV</span>
                                    <strong className="data_statistic__number">
                                        {fanMvNum+singerMvNum}
                                    </strong>
                                </div>
                            </li>
                        </ul>
                        <div className="data__actions">
                            <div className="mod_btn_green js_singer_radio" onClick={ ()=> this.playHotSong() }>
                                <i className="mod_btn_green__icon_play"></i>
                                播放歌手热门歌曲
                            </div>
                            <div className="mod_btn js_follow" onClick={ () => this.toggleLove() }>
                                <i className={`${  isLoveSinger({ singermid },loveSinger) ? 'mod_btn__icon_yes':'mod_btn__icon_more'} `} data-status="0"></i>
                                关注 {formatNum(fansNum)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="js_tab" id="index_tab">
                    <div className="mod_part">
                        <div className="part__hd">
                            <h2 className="part__tit">热门歌曲</h2>
                            <span  className="part__more js_goto_tab">全部<i className="icon_part_arrow sprite"></i></span>
                        </div>
                        

                        <div className="mod_songlist">
                            <i className="player_songlist__line"></i>
                            <ul className="songlist__header">
                                
                                <li className="songlist__header_name">歌曲</li>
                                <li className="songlist__header_author">歌手</li>
                                <li className="songlist__header_time">时长</li>
                            </ul>
                            <i className="player_songlist__line"></i>
                            <ul className="songlist__list" id="song_box">
                                {
                                    hotSong.map((item,index) => (
                                        <li key={index} className={`${index%2 !== 0 ?'line_height_list':''}`}>
                                            <div className={`songlist__item ${item.songInfo.mid === cSong.songmid?'songlist__item--playing':''}`}>
                                                <div className="songlist__number">{index + 1}</div>
                                                <div className="songlist__songname">
                                                    <span className="songlist__songname_txt" title={item.title}>{item.songInfo.title}</span>
                                                    <div className="mod_list_menu">
                                                        <div className="list_menu__item list_menu__play js_play" onClick={ () => this.playThis(item,index) }>
                                                            <i className="list_menu__icon_play"></i>
                                                            <span className="icon_txt">播放</span>
                                                        </div>
                                                        <div className="list_menu__item list_menu__add js_fav">
                                                            <i className="list_menu__icon_add"></i>
                                                            <span className="icon_txt">添加到</span>
                                                        </div>
                                                        <div className="list_menu__item list_menu__down js_down">
                                                            <i className="list_menu__icon_down"></i>
                                                            <span className="icon_txt">VIP下载</span>
                                                        </div>
                                                        <div className="list_menu__item list_menu__share js_share">
                                                            <i className="list_menu__icon_share"></i>
                                                            <span className="icon_txt">分享</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="songlist__artist">
                                                    <span className="singer_name">{item.songInfo.singer[0].name}</span>
                                                </div>
                                                <div className="songlist__time">{formatSongTime(item.songInfo.interval)}</div>
                                                <div className="songlist__other"></div>
                                                
                                                <i className="player_songlist__line"></i>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>    

                    </div>
                    <div className="mod_part">
                        <div className="part__hd">
                            <h2 className="part__tit">专辑</h2>
                            <span  className="part__more js_goto_tab">全部<i className="icon_part_arrow sprite"></i></span>
                        </div>
                        <div className="mod_playlist">
                            <ul className="playlist__list" id="albumlist">
                                {
                                    albumlist.map((item,index)=>(
                                        <li className="playlist__item" key={index}>
                                            <div className="playlist__item_box">
                                                <div className="playlist__cover mod_cover">
                                                    <div className="js_album">
                                                        <img src={`//y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMid}.jpg?max_age=2592000`} alt="专辑封面" className="playlist__pic"/>
                                                        <i className="mod_cover__icon_play js_play"></i>
                                                    </div>
                                                </div>

                                                <h4 className="playlist__title"><span className="playlist__title_txt"><span  title="Mojito" className="js_album" >{item.albumName}</span></span></h4>
                                                <div className="playlist__other">
                                                    { item.publishDate }
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                                
                            </ul>
                        </div>

                    </div>

                    <div className="mod_part">
                        <div className="part__hd">
                            <h2 className="part__tit">MV</h2>
                            <span  className="part__more js_goto_tab">全部<i className="icon_part_arrow sprite"></i></span>
                        </div>

                        <div className="mod_mv">
                            <ul className="mv_list__list" id="mv_list">
                                {
                                    mvList.map(item => (
                                        <li className="mv_list__item" key={item.vid} style={{width:'20%'}}>
                                            <div className="mv_list__item_box">
                                                <div className="mv_list__cover mod_cover js_mv">
                                                    <img src={item.pic} alt="tupian" className="mv_list__pic"/>	
                                                    <i className="mod_cover__icon_play"></i>
                                                </div>
                                                
                                                <h3 className="mv_list__title">
                                                    <span className="js_mv">{item.title}</span>
                                                </h3>	
                                                <div className="mv_list__singer">
                                                    <span className="js_singer">{ item.singer_name }</span>
                                                </div>
                                                <div className="mv_list__info">
                                                    <span className="mv_list__listen"><i className="mv_list__listen_icon sprite"></i>{item.playcnt}</span>{ formatNum(item.listenCount) }
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                                
                            </ul>
                        </div>
                    </div>
                    {
                        fanMvList.length !== 0 ? (<div className="mod_part">
                        <div className="part__hd">
                            <h2 className="part__tit">粉丝上传MV</h2>
                            <span  className="part__more js_goto_tab">全部<i className="icon_part_arrow sprite"></i></span>
                        </div>
                        <div className="mod_mv">
                            <ul className="mv_list__list" id="mv_list">
                                {
                                    fanMvList.map(item => (
                                        <li className="mv_list__item" key={item.vid} style={{width:'20%'}}>
                                            <div className="mv_list__item_box">
                                                <div className="mv_list__cover mod_cover js_mv">
                                                    <img src={item.pic} alt="tupian" className="mv_list__pic"/>	
                                                    <i className="mod_cover__icon_play"></i>
                                                </div>
                                                
                                                <h3 className="mv_list__title">
                                                    <span className="js_mv">{item.title}</span>
                                                </h3>	
                                                <div className="mv_list__singer">
                                                    <span className="js_singer">{ item.singer_name }</span>
                                                </div>
                                                <div className="mv_list__info">
                                                    <span className="mv_list__listen"><i className="mv_list__listen_icon sprite"></i>{item.playcnt}</span>{ formatNum(item.listenCount) }
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                                
                            </ul>
                        </div>
                    </div>):null
                    }
                    


                    <div className="mod_part">
                        <div className="part__hd">
                            <h2 className="part__tit">相似歌手</h2>
                            <span className="part__more js_goto_tab hidden">全部<i className="icon_part_arrow sprite"></i></span>
                        </div>
                        

                        <div id="mod-singerlist">
                            <div className="mod_singer_list">
                                <ul className="singer_list__list js_avtar_list">
                                    {
                                        singerlist.map(item => (
                                            <li className="singer_list__item" key={item.mid} onClick={ () => this.toSingerDetail(item) }>
                                                <div className="singer_list__item_box">
                                                    <div className="singer_list__cover js_singer">
                                                        <img className="singer_list__pic" src={ item.pic } alt={item.name} onError={ $event => this.replaceImg($event) } />
                                                    </div>
                                                    <h3 className="singer_list__title">
                                                        <p className="js_singer">{item.name}</p>	
                                                    </h3>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>

                    </div>
                </div> 
            </div>
        )
    }
}

export default connect(
    state=>({
        user:state.user,
        playList:state.playList,
        currentIndex:state.currentIndex,
        loveSinger:state.loveSinger
    }),
    {setCurrentSongs,setIndex,addSongToPlay,resetPlaylist,setLoveSingers}
)(SingerDetail)