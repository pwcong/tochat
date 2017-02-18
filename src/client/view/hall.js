import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, message } from 'antd';
import style from './style/hall.css';

import { toGetRooms } from '../actions/roomstate';
import RoomItem from '../component/RoomItem';

class Hall extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			loadingRooms: false
		}

		this.handleGetRooms = this.handleGetRooms.bind(this);
		this.handleCreateRoom = this.handleCreateRoom.bind(this);
	}

	handleGetRooms(){
		const ctx = this;
		
		ctx.props.dispatch(toGetRooms(
			() => {
				ctx.setState({
					loadingRooms: true
				});
			},
			() => {
				ctx.setState({
					loadingRooms: false
				});
			},
			err => {
				message.error(err);
				ctx.setState({
					loadingRooms: false
				});
			}
		));

	}

	handleCreateRoom(){

	}

	render(){


		return (

			<div className={style.root}>
			
				<div className={style['room-container']}>
					<div className={style['room-head']}>

						<div className={style['room-head-item']} onClick={this.handleGetRooms}>
							<Icon type={this.state.loadingRooms ? 'loading' : 'download'}/>
						</div>
						<div className={style['room-head-item']} onClick={this.handleCreateRoom}>
							<Icon type="plus"/>
						</div>

					</div>

					<div className={style['room-list']}>
						{
							this.props.roomstate.rooms.map((room, index) => {
								return <RoomItem sign={index} key={room.name} name={room.name} intro={room.intro}/>
							})
						}
					</div>
				</div>

				<div className={style.container}>

				</div>

			</div>

		);


	}


}

function select(state){
	return ({
		roomstate: state.roomstate,
		userstate: state.userstate
	});
}

export default connect(select)(Hall);