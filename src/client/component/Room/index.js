import React, { Component, PropTypes } from 'react';
import style from './style.css';
import { Button, Menu, Dropdown, Icon } from 'antd';
import InputTools from '../InputTools';
import MessageBubble from '../MessageBubble';

import { isSymbol, convertSymbolToReactDOMNode } from 'react-expressions-baidu';

class Room extends Component {


    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleGetRoomUsers = this.handleGetRoomUsers.bind(this);
        this.handleReviewUserInfo = this.handleReviewUserInfo.bind(this);
        this.handleSendMsgToUser = this.handleSendMsgToUser.bind(this);
    }

    handleClose(){
        this.props.onClose();
    }

    handleSendMessage(msg){
        this.props.onSendMessage(msg);
    }

    handleGetRoomUsers(){
        this.props.onGetRoomUsers();
    }
    componentDidMount(){
        let content = this.refs.content;
        content.scrollTop = content.scrollHeight;
    }

    componentDidUpdate(){
        
        let content = this.refs.content;
        content.scrollTop = content.scrollHeight;
    }

    handleReviewUserInfo(uid){
        this.props.onReviewUserInfo(uid);
    }

    handleSendMsgToUser(uid){
        this.props.onSendMsgToUser(uid);
    }

    render() {

        let key = 0;

        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={this.handleGetRoomUsers}>查看当前房间用户</a>
                </Menu.Item> 
            </Menu>
        );

        return (
            <div className={style.root}>

                <div className={style.header}>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <h2 
                            style={{
                                cursor: 'pointer'
                            }}>
                            {this.props.name}<Icon type="down"/>
                        </h2>
                    </Dropdown>
                    <div className={style['header-tools']}>
                        <Button icon="close" shape="circle" size="small" type="danger" onClick={this.handleClose}/>
                    </div>
                    
                </div>

                <div className={style.content} ref="content">

                    {
                        this.props.message.map( item => {
                            return (
                                <div key={key++}>
                                    <MessageBubble 
                                        onSendMsgToUser={this.handleSendMsgToUser}
                                        onReviewUserInfo={this.handleReviewUserInfo}
                                        uid={item.uid}
                                        avatar={item.avatar || '/image/avatar.jpg'}
                                        self={this.props.uid === item.uid}>
                                        {
                                            isSymbol(item.msg) ?  
                                                convertSymbolToReactDOMNode(item.msg)
                                                :
                                                item.msg
                                        }
                                    </MessageBubble>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={style['input-tools']}>
                    <InputTools 
                        onAddSymbol={this.handleSendMessage} 
                        onSendMessage={this.handleSendMessage}/>
                </div>


            </div>
        );
    }
}

Room.propTypes = {
    message: PropTypes.array,
    name: PropTypes.string,
    onClose: PropTypes.func,
    uid: PropTypes.string,
    onSendMessage: PropTypes.func,
    onGetRoomUsers: PropTypes.func,
    onReviewUserInfo: PropTypes.func,
    onSendMsgToUser: PropTypes.func
};

Room.defaultProps = {
    message: [],
    uid: 'null',
    name: 'null',
    onClose(){
        console.log('on close');
    },
    onSendMessage(msg){
        console.log(msg);
    },
    onGetRoomUsers(){
        console.log('on getRoomUsers');
    },
    onReviewUserInfo(uid){
        console.log('on review userinfo: ' + uid);
    },
    onSendMsgToUser(uid){
        console.log('on send msg to user:' + uid);
    }
}

export default Room;