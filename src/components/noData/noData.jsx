
import React,{ Component } from 'react'
import './noData.less'
export default class NoData extends Component{

    render(){
        return(
            <div className="none_txt_div">
                <i className="none_txt__symbol"></i>
                <p style={{ color:'#000',fontSize:18 }}>什么也没有，去<a href="/musichall">音乐馆</a>发现好音乐！</p>
            </div>
        )
    }
}