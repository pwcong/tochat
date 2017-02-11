import React from 'react'
import style from './style/index.css'
import { connect } from 'react-redux'

class Index extends React.Component{

	render(){

		return (

			<h1>{ "Hello I'm " + this.props.data.author }</h1>
		)
		
	}

}

function select(state){
	return ({
		data: state.data
	})
}

export default connect(select)(Index)