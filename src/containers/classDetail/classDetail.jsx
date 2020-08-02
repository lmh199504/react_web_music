import React,{ Component } from 'react'

export default class ClassDetail extends Component{


    componentDidMount = () => {
        const { disstid } = this.props.match.params
        console.log(disstid)
    }

    render(){
        return(

            <div>歌单详情</div>
        )
    }
}