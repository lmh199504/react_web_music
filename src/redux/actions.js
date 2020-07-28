

import { AUTH_SUCCESS,AUTH_FAIL,RESET_AUTH,GET_HOME,RESET_PLAYLIST,SET_CURRENT_SONG,SHOW_BIGPLAYER,HIDE_BIGPLAYER,PLAYING,SET_INDEX,STOP_PLAY } from './action-types.js'
import Cookies from 'js-cookie'
import { reqLogin,reqGetUserInfo,reqLogout,reqRegister,reqGetHome,reqGetSongListDetail,reqGetMusicVKey } from '../api/index'
import Song from '../utils/Song.js'
import { message } from 'antd'

//登陆成功的同步action
const authSuccess = (data) => ({type:AUTH_SUCCESS,data})

//登陆等其他 用户 授权失败的同步action 
const authFail = (data) => ({type:AUTH_FAIL,data})

//重置用户信息的同步action
const resetAuth = (data) => ({type:RESET_AUTH,data})

//登陆成功的异步action 

export const login = (data) => {
	return async dispatch => {
		const response = await reqLogin(data)
		if(response.code === 0){
			dispatch(authSuccess(response.data))
		}else{
			dispatch(authFail(response.msg))
		}
	}
}

export const getUserInfo = (data) => {
	return async dispatch => {
		const response = await reqGetUserInfo(data)
		
		if(response.code === 0){
			dispatch(authSuccess(response.data))
		}else{
			Cookies.remove('userKey')
			dispatch(resetAuth(response.msg))
		}
	}
}

export const logout = () => {
	return async dispatch => {
		const response = await reqLogout()
		Cookies.remove('userKey')
		dispatch(resetAuth(response.msg))
	}
}

export const register = (data) => {
	return async dispatch => {
		const response = await reqRegister(data)
		if(response.code === 0){
			dispatch(authSuccess(response.data))
		}
	}
}

// 首页信息获取的同步action
export const getHome = (data) => ({type:GET_HOME,data})

// 首页信息获取的异步action 
export const getHomeData = () => {
	return async dispatch => {
		const response = await reqGetHome()
		if(response.response.code === 0){
			dispatch(getHome(response.response))
		}
	}
}

//重置播放列表的同步action
export const resetPlaylist = (data) => ({type:RESET_PLAYLIST,data})
//重置播放列表的异步action
export const resetPlaylists = (item) => {
	return async dispatch => {
		const response = await reqGetSongListDetail({disstid:item.tid || item.content_id});
		const songlist = response.response.cdlist[0].songlist
		let playList = []
		for (let cd of songlist) {
			// const re = await reqGetMusicVKey({songmid:cd.mid})
			// if(re.response.req_0.data.midurlinfo[0].vkey !== ''){
			// 	cd.src = re.response.playLists[0]
			// }
			let song = new Song(cd)
			playList.push(song)
			if(playList.length === 1){
				
				const re = await reqGetMusicVKey({songmid:cd.mid})
				if(re.response.req_0.data.midurlinfo[0].vkey !== ''){
					cd.src = re.response.playLists[0]
				}
				
				song = new Song(cd)
				dispatch(setIndex(0))
				dispatch(setCurrentSong(song))
			}
			
			
		}
		dispatch(resetPlaylist(playList))
	}
}

// 设置当前播放歌曲的同步action
const setCurrentSong = (data) => ({type:SET_CURRENT_SONG,data})
// 设置当前播放歌曲的异步action
export const setCurrentSongs = (data) => {

	return async dispatch => {
		const re = await reqGetMusicVKey({songmid:data.songmid})
		if(re.response.req_0.data.midurlinfo[0].vkey !== ''){
			data.src = re.response.playLists[0]
		}else{
			data.src = 'http://www.baidu.com'
			message.warning('vip歌曲,即将跳过。')
		}
		dispatch(setCurrentSong(data))
	}
}

//显示大播放器
export const showBigplayer = (data) => ({type:SHOW_BIGPLAYER,data})
//隐藏大播放器
export const hideBigPlayer = (data) => ({type:HIDE_BIGPLAYER,data})
//设置播放中
export const playing = (data) => ({type:PLAYING,data})
//设置暂停
export const stopPlay = (data) => ({type:STOP_PLAY,data})
//设置当前序号
export const setIndex = (data) => ({type:SET_INDEX,data})
