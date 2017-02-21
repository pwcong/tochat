import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon, message, Modal, Input, notification } from 'antd';
import style from './style/hall.css';

import { toGetRooms, toCreateRoom } from '../actions/roomstate';
import RoomItem from '../component/RoomItem';
import HallIndex from './hall.index';
import HallLoading from './hall.loading';
import Room from '../component/Room';
import UserInfo from '../component/UserInfo';

import { 
	TYPE_JOIN_ROOM, 
	TYPE_JOIN_ROOM_RESPONSE,
	TYPE_LEAVE_ROOM,
	TYPE_RECEIVE_MSG_FROM_ROOM,
	TYPE_SEND_MSG_TO_ROOM,
	TYPE_JOIN_ROOM_BROADCAST,
	TYPE_LEAVE_ROOM_BROADCAST
} from '../../../config/io.config';

import {
	toGetOtherUserInfo
} from '../actions/userstate';

import { 
	joinRoom, 
	leaveRoom 
} from '../actions/roomstate';

import { 
	receiveMsgFromRoom
} from '../actions/data';

class Hall extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			loadingRooms: false,
			joiningRoom: false,
			modalVisible: false,
			modalLoading: false,
			newRoomName: '',
			newRoomIntro: '',
		};

		this.handleGetRooms = this.handleGetRooms.bind(this);
		this.handleCreateRoom = this.handleCreateRoom.bind(this);
		this.handleJoinRoom = this.handleJoinRoom.bind(this);
		this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handleShowModal = this.handleShowModal.bind(this);
		this.handleCancelCreateRoom = this.handleCancelCreateRoom.bind(this);
		this.handleChangeNewRoomIntro = this.handleChangeNewRoomIntro.bind(this);
		this.handleChangeNewRoomName = this.handleChangeNewRoomName.bind(this);
		this.handleSendMsgToUser = this.handleSendMsgToUser.bind(this);
		this.handleReviewUserInfo = this.handleReviewUserInfo.bind(this);

	}

	componentWillMount(){

		let ctx = this;

		socket.on(TYPE_JOIN_ROOM_RESPONSE, bundle => {
			ctx.setState({
				joiningRoom: false
			});
			ctx.props.dispatch(joinRoom(bundle.payload.name));		
		});

		socket.on(TYPE_RECEIVE_MSG_FROM_ROOM, bundle => {

			ctx.props.dispatch(receiveMsgFromRoom(
				ctx.props.roomstate.name,
				bundle.dateTime,
				bundle.payload.from.uid,
				bundle.payload.from.avatar,
				bundle.payload.msg
			));

		});

		// socket.on(TYPE_JOIN_ROOM_BROADCAST, bundle => {
		// 	notification.open({
		// 		message: bundle.payload.uid + ' 已进入房间',
		// 		icon: <Icon type="notification" style={{ color: '#49a8ed' }} />,
		// 	});
		// });
		
		// socket.on(TYPE_LEAVE_ROOM_BROADCAST, bundle => {
		// 	notification.open({
		// 		message: bundle.payload.uid + ' 已离开房间',
		// 		icon: <Icon type="notification" style={{ color: '#f04134' }} />,
		// 	});
		// });
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

		if(this.state.newRoomIntro && this.state.newRoomName){

			let ctx = this;
			let { dispatch, userstate } = ctx.props;

			dispatch(toCreateRoom(
				userstate.token,
				userstate.uid,
				{
					name: ctx.state.newRoomName,
					intro: ctx.state.newRoomIntro
				},
				() => {
					ctx.setState({
						modalLoading: true
					});
				},
				() => {
					ctx.setState({
						modalVisible: false,
						modalLoading: false,
						newRoomIntro: '',
						newRoomName: ''
					});
				},
				err => {
					message.error(err);
					ctx.setState({
						modalLoading: false
					});
				}
			));

		}

	}

	handleShowModal(){
		this.setState({
			modalVisible: true,
			modalLoading: false
		});
	}

	handleCancelCreateRoom(){
		this.setState({
			modalVisible: false,
			modalLoading: false
		});
	}

	handleChangeNewRoomName(e){
		this.setState({
			newRoomName: e.target.value
		});
	}

	handleChangeNewRoomIntro(e){
		this.setState({
			newRoomIntro: e.target.value
		});
	}

	handleJoinRoom(name){
		this.setState({
			joiningRoom: true
		});
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

	handleSendMessage(msg){

		let ctx = this;

		socket.emit(TYPE_SEND_MSG_TO_ROOM, {
			dateTime: new Date().getTime(),
			payload: {
				from: {
					uid: ctx.props.userstate.uid,
					avatar: ctx.props.userstate.userinfo.avatar
				},
				to: ctx.props.roomstate.name,
				msg
			}
		});
	}

	handleReviewUserInfo(uid){
		let ctx = this;

		ctx.props.dispatch(toGetOtherUserInfo(
			uid,
			() => {

			},
			userinfo => {
				Modal.success({
					title: uid + ' 的个人信息',
					content: (
						<UserInfo
							avatar={userinfo.avatar}
							github={userinfo.github}
							email={userinfo.email}
							sex={userinfo.sex}
							nickname={userinfo.nickname}
							/>
					),
					onOk(){}
				});
			},
			err => {
				message.error(err);
			}
		));

	}

	handleGetRoomUsers(){
		message.warning('该功能还在开发中');
	}

	handleSendMsgToUser(uid){
		message.warning('该功能还在开发中');
	}

	render(){

		return (

			<div className={style.root}>
				<Modal
					confirmLoading={this.state.modalLoading}
					title="新建房间"
					visible={this.state.modalVisible}
					onOk={this.handleCreateRoom}
					onCancel={this.handleCancelCreateRoom}
					>
					<p>
						<Input 
							onChange={this.handleChangeNewRoomName} 
							value={this.state.newRoomName} 
							placeholder="房名"/>
					</p>
					<p>
						<Input 
							style={{
								marginTop: 8
							}}
							onChange={this.handleChangeNewRoomIntro} 
							placeholder="简介"
							value={this.state.newRoomIntro}
							/>
					</p>


				</Modal>


				<div className={style['room-container']}>
					<div className={style['room-head']}>

						<div className={style['room-head-item']} onClick={this.handleGetRooms}>
							<Icon type={this.state.loadingRooms ? 'loading' : 'loading-3-quarters'}/>
						</div>
						<div className={style['room-head-item']} onClick={this.handleShowModal}>
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
					{ this.state.joiningRoom ? 
						<HallLoading/> 
						:  
						this.props.roomstate.name === '' ? 
							<HallIndex />
							:
							<Room
								onGetRoomUsers={this.handleGetRoomUsers}
								onSendMsgToUser={this.handleSendMsgToUser}
								onReviewUserInfo={this.handleReviewUserInfo}
								message={this.props.data.roomMessage[this.props.roomstate.name]}
								onSendMessage={this.handleSendMessage}
								uid={this.props.userstate.uid}
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
		userstate: state.userstate,
		data: state.data
	});
}

export default connect(select)(Hall);