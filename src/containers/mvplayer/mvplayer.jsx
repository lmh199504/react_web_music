
import React,{Component} from 'react'
import './mvplayer.less'
import { connect } from 'react-redux'
import { CloseCircleOutlined } from '@ant-design/icons'
import { hideMvPlayer } from '../../redux/actions'
class MvPlayer extends Component{
    
    state = {
        mvInfo:{}
    }

    componentDidMount = () => {

    }
    componentDidUpdate = () => {

        const { isShowMv,currentMv } = this.props
        const { mvInfo } = this.state

        if(isShowMv){
			setTimeout(() => {
				document.getElementsByTagName('body')[0].style.overflow = 'hidden'
			})
		}else{
			setTimeout(() => {
				document.getElementsByTagName('body')[0].style.overflow = 'auto'
			})
			
        }
        
        if(mvInfo.url === currentMv.url){
            // console.log("一样的mv")
        }else{
            this.setState({
                mvInfo:currentMv
            })
            this.refs.myVideo.src = currentMv.url
            this.refs.myVideo.play()
        }
    }

    hidePlayer = () => {
        this.refs.myVideo.pause()
        this.props.hideMvPlayer()
    }
    render(){
        const { isShowMv } = this.props
        return(
            <div className={ `mvplayer ${isShowMv ?'showmv':'' }` }>
                <div className="closeBtn">
                    <CloseCircleOutlined  className="closeIcon" onClick={ () => this.hidePlayer() }/>
                </div>
                <video src="" ref="myVideo" autoPlay={false} className="myVideo" controls></video>
                
            </div>
        )
    }
}
export default connect(
    state=>({
        isShowMv:state.isShowMv,
        currentMv:state.currentMv
    }),
    { hideMvPlayer }
)(MvPlayer)