

import { AUTH_SUCCESS,AUTH_FAIL,RESET_AUTH } from './action-types.js'
import { reqLogin,reqGetUserInfo } from '../api/index'
 
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
			dispatch(resetAuth(response.msg))
		}
	}
}

