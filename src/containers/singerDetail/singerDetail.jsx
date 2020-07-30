
import React, { Component } from 'react'
import { reqGetSingerDesc, reqGetSingerHotsong } from '../../api'
import { formatSongTime } from '../../utils'
import './singerDetail.less'
import { parseString  } from 'xml2js'
import { Popover } from 'antd'
import { connect } from 'react-redux'

class SingerDetail extends Component {

    state ={
        basic:{},
        desc:'',
        singermid:'',
        totalSongs:0,
        totalMv:0,
        totalAblum:0,
        hotSong:[],
        cSong:{}
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
            console.log(res)
            this.setState({
                totalSongs:res.data.singerSongList.data.totalNum,
                hotSong:res.data.singerSongList.data.songList
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

    render() {
        const { basic,desc,singermid,totalSongs,cSong } = this.state
        const checkall = false
        const { playList } = this.props
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
                                <span className="js_goto_tab" title="周杰伦" >周杰伦</span>
                            </h1>
                            <h1 className="data__name_txt js_index" title="周杰伦"> 周杰伦</h1>
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
                                    <strong className="data_statistic__number">55</strong>
                                </div>
                            </li>
                            <li className="data_statistic__item">
                                <div className="js_goto_tab">
                                    <span className="data_statistic__tit">MV</span>
                                    <strong className="data_statistic__number">1937</strong>
                                </div>
                            </li>
                        </ul>
                        <div className="data__actions">
                            <div className="mod_btn_green js_singer_radio">
                                <i className="mod_btn_green__icon_play"></i>
                                播放歌手热门歌曲
                            </div>
                            <div className="mod_btn js_follow">
                                <i className="mod_btn__icon_more" data-status="0"></i>
                                关注 2384.0万
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
                                <li className={`songlist__edit sprite ${checkall ?'songlist__edit--check':''}`} onClick={ () => this.selectAll()}>
                                    <input type="checkbox" className="songlist__checkbox js_check_all"/>
                                </li>
                                <li className="songlist__header_name">歌曲</li>
                                <li className="songlist__header_author">歌手</li>
                                <li className="songlist__header_time">时长</li>
                            </ul>
                            <i className="player_songlist__line"></i>
                            <ul className="songlist__list" id="song_box">
                                {
                                    playList.map((item,index) => (
                                        
                                        <li key={index}>
                                            <div className={`songlist__item ${item.songmid === cSong.songmid?'songlist__item--playing':''}`}>
                                                <div className={`songlist__edit sprite ${item.checked===true ? 'songlist__edit--check':''}`} onClick={ () => this.checkedSong(item) }>
                                                    <input type="checkbox" className="songlist__checkbox"/>
                                                </div>
                                                <div className="songlist__number">{index + 1}</div>
                                                <div className="songlist__songname">
                                                    <span className="songlist__songname_txt" title={item.title}>{item.title}</span>
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
                                                    <span className="singer_name">{item.singer[0].name}</span>
                                                </div>
                                                <div className="songlist__time">{formatSongTime(item.interval)}</div>
                                                <div className="songlist__other"></div>
                                                <span className="songlist__delete js_delete">
                                                    <span className="icon_txt">删除</span>
                                                </span>
                                                <i className="player_songlist__line"></i>
                                            </div>
                                        </li>
                                    ))
                                }
                            
                                
                            </ul>
                        </div>    

                    </div>
                </div> 
            </div>
        )
    }
}

export default connect(
    state=>({playList:state.playList})
)(SingerDetail)