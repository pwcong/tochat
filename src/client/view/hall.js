import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, message } from 'antd';
import style from './style/hall.css';

import { toGetRooms } from '../actions/roomstate';
import RoomItem from '../component/RoomItem';
import HallIndex from './hall.index';
import HallLoading from './hall.loading';
import Room from '../component/Room';

import { 
	TYPE_JOIN_ROOM, 
	TYPE_JOIN_ROOM_RESPONSE,
	TYPE_LEAVE_ROOM
} from '../../../config/io.config';

import { joinRoom, leaveRoom } from '../actions/roomstate';

class Hall extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			loadingRooms: false,
			enteringRoom: false
		}

		this.handleGetRooms = this.handleGetRooms.bind(this);
		this.handleCreateRoom = this.handleCreateRoom.bind(this);
		this.handleJoinRoom = this.handleJoinRoom.bind(this);
		this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
	}

	componentWillMount(){

		let ctx = this;
		
		socket.on(TYPE_JOIN_ROOM_RESPONSE, bundle => {
			this.props.dispatch(joinRoom(bundle.payload.name));
		});
	}

	handleGetRooms(){

		let ctx = this;
		
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

	handleJoinRoom(name){

		let ctx = this;
		socket.emit(TYPE_JOIN_ROOM, {
			dateTime: new Date().getTime(),
			payload: {
				uid: ctx.props.userstate.uid,
				name
			}
		});
	}

	handleLeaveRoom(){
		
		
		let ctx = this;
		
		socket.emit(TYPE_LEAVE_ROOM, {
			dateTime: new Date().getTime(),
			payload: {
				uid: ctx.props.userstate.uid,
				name: ctx.props.roomstate.name
			}
		});

		this.props.dispatch(leaveRoom());

	}

	render(){


		return (

			<div className={style.root}>
			
				<div className={style['room-container']}>
					<div className={style['room-head']}>

						<div className={style['room-head-item']} onClick={this.handleGetRooms}>
							<Icon type={this.state.loadingRooms ? 'loading' : 'loading-3-quarters'}/>
						</div>
						<div className={style['room-head-item']} onClick={this.handleCreateRoom}>
							<Icon type="plus"/>
						</div>

					</div>

					<div className={style['room-list']}>
						{
							this.props.roomstate.rooms.map((room, index) => {
								return <RoomItem 
											onClick={this.handleJoinRoom}
											active={this.props.roomstate.name === room.name}
											sign={index} 
											key={room.name} 
											name={room.name} 
											intro={room.intro}/>
							})
						}
					</div>
				</div>

				<div className={style.container}>
					{ this.state.enteringRoom ? 
						<HallLoading/> 
						:  
						this.props.roomstate.name === '' ? 
							<HallIndex />
							:
							<Room
							
								name={this.props.roomstate.name}
								onClose={this.handleLeaveRoom}/>
						
					}
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