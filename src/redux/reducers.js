

/* 
	包含多个reducer函数：根据老的state和指定的action返回一个新的state
 */

import { combineReducers } from 'redux'
import { AUTH_SUCCESS,AUTH_FAIL,RESET_AUTH } from './action-types.js'


const initUser = {
	username:"", //用户名
	msg:''  ,//错误信息
}
function user(state=initUser,action){
	switch(action.type){
		case AUTH_SUCCESS:
			return action.data
		case AUTH_FAIL:
			return {...state,msg:action.data }
		case RESET_AUTH:
			return {...initUser,msg:action.data}
		default:
			return state
	}
}

export default combineReducers({
	user
})