import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import style from './style/hall.css';


class Hall extends React.Component{


	render(){


		return (

			<div className={style.root}>
			
				<h1>Hall</h1>


			</div>

		);


	}


}

function select(state){
	return ({

	});
}

export default connect(select)(Hall);