
import React,{Component} from 'react'

import { Spin } from 'antd'
import NoData from '../../../components/noData/noData'
import { connect } from 'react-redux'
import { setLoveSingers } from '../../../redux/actions'
class Attention extends Component{

    state = {
        loading:false
    }
    componentDidMount = () => {
        this.props.setLoveSingers()
    }
    replaceImg = (e) => {
        e.target.src = require('../../../assets/images/timg.jpg')
    }
    render(){
        const { loading } = this.state
        const { loveSinger } = this.props
        return (
            <div>
                {
                    loveSinger.length !== 0?
                    <div id="mod-singerlist">
                        <div className="mod_singer_list">
                            <Spin spinning={loading}>
                                <ul className="singer_list__list js_avtar_list">
                                    {
                                        loveSinger.map(item => (
                                            <li className="singer_list__item" key={item.singer_id} onClick={ () => this.toSingerDetail(item) }>
                                                <div className="singer_list__item_box">
                                                    <div className="singer_list__cover js_singer">
                                                        <img className="singer_list__pic" src={ `http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.singermid}.webp` } alt={item.singerName} onError={ $event => this.replaceImg($event) } />
                                                    </div>
                                                    <h3 className="singer_list__title">
                                                        <p className="js_singer">{item.singerName}</p>	
                                                    </h3>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Spin>
                            
                        </div>
                    </div>:
                    <NoData></NoData>
                }
            </div>
            
        )
    }
}
export default connect(
    state=>({
        loveSinger:state.loveSinger
    }),
    { setLoveSingers }
)(Attention)