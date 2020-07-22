
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

