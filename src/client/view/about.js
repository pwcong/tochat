import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import style from './style/about.css';


class About extends React.Component{


	render(){


		return (

			<div className={style.root}>
			
				<h1>About</h1>


			</div>

		);


	}


}

function select(state){
	return ({

	});
}

export default connect(select)(About);