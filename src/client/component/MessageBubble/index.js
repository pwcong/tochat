import React, { Component, PropTypes } from 'react';
import style from './style.css';
import { Menu, Popover} from 'antd';

class MessageBubble extends Component {

    constructor(props){
        super(props);

        this.state = {
            visible: false
        };

        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        
        this.handleReviewUserInfo = this.handleReviewUserInfo.bind(this);
        this.handleSendMsgToUser = this.handleSendMsgToUser.bind(this);
    }

    handleSendMsgToUser(){
        this.props.onSendMsgToUser(this.props.uid);
        this.setState({
            visible: false
        })
    }

    handleVisibleChange(visible){
        this.setState({
            visible
        });
    }

    handleReviewUserInfo(){
        this.props.onReviewUserInfo(this.props.uid);
        this.setState({
            visible: false
        });
    }

    render() {

        const menu = (
            <div 
                style={{
                    textAlign: 'center'
                }}>
                <p
                    style={{
                        padding: 8
                    }}>
                    <a onClick={this.handleReviewUserInfo}>查看用户信息</a>
                </p>
                <p
                    style={{
                        padding: 8
                    }}>
                    <a onClick={this.handleSendMsgToUser}>发送消息</a>
                </p>
            </div>
        )

        return (
            <div className={this.props.self ? style['root-right'] : style['root-left']}>
                {
                    this.props.self ? '' : (
                        <Popover
                            onVisibleChange={this.handleVisibleChange}
                            visible={this.state.visible}
                            placement="bottom"
                            content={menu}
                            trigger="click">
                            <div 
                                className={style.avatar}
                                style={{
                                    backgroundImage: 'url(' + this.props.avatar + ')'
                                }}
                                >
                            </div>
                        </Popover>
                    )
                }

                <div className={this.props.self ? style['container-right'] : style['container-left']}>
                    <h3>{this.props.uid || 'null'}</h3>
                    <div 
                        className={style.content} 
                        style={{
                            backgroundColor: this.props.self ? '#49a8ed' : 'white'
                        }}>

                        <div className={this.props.self ? style['triangle-right'] : style['triangle-left']}><span></span></div>

                        {this.props.children}
                    </div>

                </div>

                {
                    this.props.self ? (

                        <div 
                            className={style.avatar}
                            style={{
                                backgroundImage: 'url(' + this.props.avatar + ')'
                            }}
                            >
                        </div>
                        
                    ) : ''
                }
            </div>
        );
    }
}

MessageBubble.propTypes = {
    onReviewUserInfo: PropTypes.func,
    onSendMsgToUser: PropTypes.func,
    self: PropTypes.bool,
    uid: PropTypes.string,
    avatar: PropTypes.string
};

MessageBubble.defaultProps = {
    self: false,
    uid: 'null',
    avatar: '/image/avatar.jpg',
    onReviewUserInfo(uid){
        console.log('review userinfo: ' + uid );
    },
    onSendMsgToUser(uid){
        console.log('send msg to user: ' + uid);
    }
}

export default MessageBubble;