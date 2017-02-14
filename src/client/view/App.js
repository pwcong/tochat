import React from 'react';
import style from './style/app.css';

export default class App extends React.Component{

	render(){

		return (
			<div className={style.root}>
				<img src="/image/bg.jpg" className={style.bg}/>
				{ this.props.children }
			</div>
		)
		
	}


}