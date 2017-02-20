import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink, hashHistory } from 'react-router';
import style from './style/home.css';
import { message } from 'antd';
import { logout, toGetUserInfo } from '../actions/userstate';
import { toGetRooms } from '../actions/roomstate';

import { TYPE_BIND_UID } from '../../../config/io.config';

class Home extends React.Component{

	constructor(props) {
		super(props);
		
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentWillMount() {
		if(!this.props.userstate.isLogined){
			hashHistory.push('/');
		}else{

			socket.emit(TYPE_BIND_UID, {
				dateTime: new Date().getTime(),
				payload: {
					uid: this.props.userstate.uid
				}
			});

			this.props.dispatch(toGetUserInfo(
				this.props.userstate.uid,
				err => {
					message.error(err);
				}
			));

			this.props.dispatch(toGetRooms(
				()=>{},
				()=>{},
				err => {
					message.error(err);
				}
			));

		}
		
	}

	handleLogout(){
		this.props.dispatch(logout());
		hashHistory.push('/');
	}

	render(){

		const { userinfo } = this.props.userstate;

		return (

			<div className={style.root}>

				<div className={style.sidebar}>

					<Link to="/home/intro">
						<img 
							className={style['sidebar-avatar']}
							src={userinfo ? ( userinfo.avatar || '/image/avatar.jpg' ) : '/image/avatar.jpg'} 
							alt="avatar"/>

					</Link>

					<div className={style['sidebar-menu']}>

						<div>
							<IndexLink to="/home" activeClassName={style['sidebar-menu-active']}>
								<span className="fa fa-home fa-4x"></span>
							</IndexLink>
						</div>

						<div>
							<Link to="/home/about" activeClassName={style['sidebar-menu-active']}>
								<span className="fa fa-info fa-4x"></span>
							</Link>						
						</div>
					</div>

					<div className={style['btn-logout']} onClick={this.handleLogout}>
						<a><span className="fa fa-power-off fa-2x"></span></a>
					</div>


				</div>

				<div className={style.container}>
					
					<div className={style.content}>
						
						{this.props.children}

					</div>


				</div>				


			</div>

		);


	}


}

function select(state){
	return ({
		userstate: state.userstate
	});
}

export default connect(select)(Home);