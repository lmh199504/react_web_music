
import React,{ Component } from 'react'

import './mymusic.less'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setLoveLists,setUserSheets,setLoveSingers,logout,getUserInfo } from '../../redux/actions'

import { Route,Redirect,Switch } from 'react-router-dom'
import MyLove from './myLove/myLove'
import MyClassifid from './myclassifid/myclassifid'
import MyAttention from './myAttention/myAttention'
import MyFans from './myfans/myfans'
import MyVideo from './myvideo/myvideo'
import { Modal,Form,Input,message,Upload } from 'antd'
import { LoadingOutlined,PlusOutlined } from '@ant-design/icons'
import { reqUpdateUserInfo } from '../../api'
class MyMusic extends Component{
	
	
	state = {
		visible:false,
		username:'',
		loading:false,
		imageUrl:"", //预览的图片
		password:"",  
		file:'' //要上传的图片
	}
	componentDidMount = () => {
		this.props.setLoveLists()
		this.props.setUserSheets()
		this.props.setLoveSingers()
	}
	handleOk = () => {
		const { username,password,file } = this.state 
		this.setState({loading:true})
		if(password && password.length<6){
			message.info("密码长度不能小于6.")
		}

		var forms = new FormData()
		forms.append('newUsername',username)
        forms.append('newPassword',password)
        forms.append('file',file)
		reqUpdateUserInfo(forms).then(res => {
			this.setState({
				visible:false,
				loading:false
			})

			if(password || username){
				message.info('即将退出.')
				setTimeout(() => {
					this.props.logout()
				},3000)
			}else{
				this.setState({
					username:'',
					password:'',
					file:'',
					imageUrl:''
				})
				this.props.getUserInfo()
			}
		})
		
	}
	
	handleCancel = () => {
		this.setState({visible:false})
	}
	getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
	beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        else if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }else{
            this.getBase64(file,imageUrl => {
                var base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '')
                this.setState({
                    imageUrl,
                    file:base64Data
                })
            })
        }
        return false
        // return isJpgOrPng && isLt2M;
	}
	setParam = (name,event) => {
        this.setState({
            [name]:event.target.value
        })
    }
	render(){
		const { user,loveSinger } = this.props
		const { username,imageUrl,password } = this.state
		const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
		
		return(
			<div className="mod_profile js_user_data" style={{ height:380 }}>
				<div className="section_inner">
					<div className="profile__cover_link" onClick={ () => this.setState({visible:true}) } >
						<img className="profile__cover" src={`${user.headerImg}`} alt="头像"/>
					</div>
					<div className="profile__tit">
						<span className="profile__name">
							{user.username}
						</span>
						<img src="//y.gtimg.cn/music/icon/v1/mac/svip_g@2x.png?max_age=2592000" className="lv_icon" alt="lv"/>
					</div>
					<ul className="mod_user_statistic">
						<li className="user_statistic__item">
							<span className="js_tab">
								<strong className="user_statistic__number js_num_follow">
									{loveSinger.length}
								</strong>
								<span className="user_statistic__tit">关注</span>
							</span>
						</li>
						<li className="user_statistic__item user_statistic__item--last">
							<span className="js_tab">
								<strong className="user_statistic__number js_num_fans">0</strong>
								<span className="user_statistic__tit">粉丝</span>
							</span>
						</li>
					</ul>
					<button className="sprite js_btn_lock btn_lock" title="主页已公开" ><span className="icon_txt">主页已公开</span></button>
				</div>
				
				<div className="main main--profile">
					<div className="mod_tab profile_nav">
						
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/mylove'>我喜欢</NavLink>
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/myclassifid'>我创建的歌单</NavLink>
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/myattention'>关注</NavLink>
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/myfans'>粉丝</NavLink>
						<NavLink className="mod_tab__item" activeClassName="mod_tab__current" to='/mymusic/myvideo'>我上传的视频</NavLink>


					</div>
					
					<Switch>
						<Route path="/mymusic/mylove" component={MyLove}/>	
						<Route path="/mymusic/myclassifid" component={MyClassifid}/>	
						<Route path="/mymusic/myattention" component={MyAttention}/>	
						<Route path="/mymusic/myfans" component={MyFans}/>	
						<Route path="/mymusic/myvideo" component={MyVideo}/>	
						<Redirect to="/mymusic/mylove"/>
					</Switch>

					
				</div>
				<Modal
					title="更换头像"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					cancelText="取消"
					okText="确认"
				>
					<Form>
                        <Form.Item label="账号">
                            <Input placeholder="账号." onChange={ (input) => this.setParam('username',input) } value={username}></Input>
                        </Form.Item>
                        <Form.Item label="密码">
							<Input placeholder="密码." onChange={ (input) => this.setParam('password',input) } value={password}></Input>
                        </Form.Item>
                        <Form.Item label="头像">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={this.beforeUpload}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>   
                    </Form>
				</Modal>
			</div>
		)
	}
}

export default connect(
	state=>({loveList:state.loveList,
		user:state.user,
		loveSinger:state.loveSinger
	}),
	{setLoveLists,setUserSheets,setLoveSingers,logout,getUserInfo}
)(MyMusic)