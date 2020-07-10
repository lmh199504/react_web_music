
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter,Route,Switch }  from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'
import 'antd/dist/antd.less'
import './assets/styles/index.less'
import store from './redux/store'
ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register}/>
				<Route path="/" component={Main}/>
			</Switch>
		</HashRouter>
	</Provider>
	,
	document.getElementById('root')
)