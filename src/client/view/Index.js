import React from 'react';
import style from './style/index.css';
import { connect } from 'react-redux';

class Index extends React.Component{

	constructor(props) {
		super(props);
	}


	render(){

		return (

			<div className={style.root}>
				<h1>{ "Hello I'm " + this.props.data.author }</h1>
			</div>
			
		);
		
	}

}

function select(state){
	return ({
		data: state.data
	});
}

export default connect(select)(Index);