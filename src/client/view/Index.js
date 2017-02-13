import React from 'react';
import style from './style/index.css';
import { connect } from 'react-redux';

class Index extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			count: 0
		};

		this.handleClick = this.handleClick.bind(this)

	}

	handleClick(){
		socket.emit("message", "count: " + this.state.count);
		console.log("message", "count: " + this.state.count);
		this.setState({
			count: this.state.count + 1
		});
	}

	render(){

		return (

			<div className={style.root}>
				<h1>{ "Hello I'm " + this.props.data.author }</h1>
				<button 
					onClick={this.handleClick}>
					Send Message
				</button>	
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