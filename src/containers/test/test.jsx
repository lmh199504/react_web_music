
import React,{ Component } from 'react'

export default class Test extends Component{
	render(){
		return (
			<div>
				<span>{document.write(navigator.userAgent)}</span>
			</div>
		)
	}
}