import React, { Component, PropTypes } from 'react';
import style from './style.css';

class MessageBubble extends Component {

    constructor(props){
        super(props);
        this.handleAvatarClick = this.handleAvatarClick.bind(this);
    }

    handleAvatarClick(){
        this.props.onAvatarClick(this.props.uid);
    }

    render() {
        return (
            <div className={style.root}>
                <div 
                    onClick={this.handleAvatarClick}
                    className={style.avatar}
                    style={{
                        backgroundImage: 'url(' + this.props.avatar + ')'
                    }}
                    >
                </div>

                <div>
                    <h3>{this.props.uid}</h3>
                    <div className={style.content}>

                        <div className={style.triangle}><span></span></div>

                        {this.props.children}

                    </div>

                </div>
                
                
            </div>
        );
    }
}

MessageBubble.propTypes = {
    uid: PropTypes.string,
    avatar: PropTypes.string,
    onAvatarClick: PropTypes.func
};

MessageBubble.defaultProps = {
    uid: 'Pwcong',
    avatar: '/image/avatar.jpg',
    onAvatarClick(uid){
        console.log(uid);
    }
}

export default MessageBubble;