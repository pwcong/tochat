import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import style from './style/about.css';


class About extends React.Component{


	render(){


		return (

			<div className={style.root}>
			
				<div className={style.content}>

					<div className={style['content-item-logo']}>
						<img 
							src="/image/chat.png" 
							alt="logo"
							style={{
								width: 30,
								height: 30,
								borderRadius: 15,
								margin: 8
							}}/>
						<h1>
							ToChat
						</h1>
					</div>

					<div className={style['content-item']}>
						<div className={style['content-item-head']}>
							<Icon type="user"/> Author
						</div>
						<a target="_blank" href="http://www.pwcong.me">Pwcong</a>	
					</div>
					<div className={style['content-item']}>
						<div className={style['content-item-head']}>
							<Icon type="github"/> Github
						</div>
						<a target="_blank" href="https://github.com/pwcong">https://github.com/pwcong</a>	
					</div>

				</div>

			</div>

		);


	}


}

function select(state){
	return ({

	});
}

export default connect(select)(About);