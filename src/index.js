
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter,Route,Switch }  from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'
import Test from './containers/test/test'
import 'antd/dist/antd.less'
import './assets/styles/index.less'
import store from './redux/store'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register}/>
				<Route path="/test" component={Test}/>
				<Route path="/" component={Main}/>
			</Switch>
		</HashRouter>
	</Provider>
	,
	document.getElementById('root')
)