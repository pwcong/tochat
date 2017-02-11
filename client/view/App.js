import React from 'react'
import style from './style/app.css'

export default class App extends React.Component{

	render(){

		return (
			{ this.props.children }
		)
		
	}


}