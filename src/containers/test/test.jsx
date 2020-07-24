
import React,{ Component } from 'react'

export default class Test extends Component{
	render(){
		return (
			<div>11111
				<span>{document.write(navigator.userAgent)}</span>
			</div>
		)
	}
}