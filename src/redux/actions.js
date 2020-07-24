

import { AUTH_SUCCESS,AUTH_FAIL,RESET_AUTH,GET_HOME } from './action-types.js'
import Cookies from 'js-cookie'
import { reqLogin,reqGetUserInfo,reqLogout,reqRegister,reqGetHome } from '../api/index'

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