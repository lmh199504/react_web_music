import axios from 'axios'
import { message } from 'antd'
import Cookies from 'js-cookie'
const ConfigBaseURL = '/api'
const Service = axios.create({
    timeout: 10000, // 请求超时时间
    baseURL: ConfigBaseURL,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 添加请求拦截器
Service.interceptors.request.use(config => {
    const koaSess = Cookies.get('userKey')
	if(koaSess){
		// console.log("已经登陆")
	}else{
		// console.log("还未登陆")
	}
	return config
    
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
	try{
		if(response.data.code !== 0 && response.data.data.code !== 0){
		    message.error(response.data.msg)
		}
	}catch(e){
		
	}
    
    return response.data
}, error => {
    const msg = error.Message !== undefined ? error.Message : '请求错误.'
    message.error(msg)
    return Promise.reject(error)
})

const request = (url,data={},type="POST") => {
    if(type === 'GET'){
        return Service.get(url,{params:data})
    }else{
        return Service.post(url,data)
    }
}

export default request