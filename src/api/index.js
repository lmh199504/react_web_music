
import request from '../utils/request'

//注册
export const reqRegister = (data) => request('/user/register',data)
//登陆
export const reqLogin = (data) => request('/user/login',data)
//获取用户信息
export const reqGetUserInfo = (data) => request('/user/getuserinfo',data,"GET")
//退出登录
export const reqLogout = (data) => request('/user/logout',data,"GET")
//首页跟单推荐获取
export const reqGetHomeClass = (data) => request('/getHomeClassifid',data,"GET")
//首页新歌
export const reqGetHomeNewSong = (data) => request('/getHomeNewSong',data,"GET")
//获取首页信息
export const reqGetHome = (data) => request('/getRecommend',data,"GET")
//获取首页新碟
export const reqGetHomeNewAblum = (data) => request('/getHomeNewAblum',data,"GET")
//获取mv
export const reqGetMvByTag = (data) => request('/getMvByTag',data,"GET")
//获取歌手列表
export const reqGetSingerList = (data) => request('/getSingerList',data,"GET")

//音乐馆新碟
export const reqGetNewDisks = (data) => request('/getNewDisks',data,"GET")
//获取排行榜
export const reqGetRanks = (data) => request('/getRanks',data,"GET")
//获取歌单分类标签
export const reqGetSongListCategories = (data) => request('/getSongListCategories',data,"GET")
//获取歌单详情
export const reqGetSongLists = (data) => request('/getSongLists',data,"GET")
//获取电台信息
export const reqGetRadioLists = (data) => request("/getRadioLists",data,"GET")
//获取mv标签
export const reqGetMV = (data) => request('/getMV',data,"GET")
//获取数字专辑
export const reqGetDigitalAlbumLists = (data) => request('/getDigitalAlbumLists',data,"GET")
//批量获取歌曲的相关信息
export const reqBatchGetSongInfo = (data) => request('/batchGetSongInfo',data,"GET")
//获取歌单详情
export const reqGetSongListDetail = (data) => request('/getSongListDetail',data,"GET")
//获取歌曲的vkey
export const reqGetMusicVKey = (data) => request('/getMusicVKey',data,"GET")