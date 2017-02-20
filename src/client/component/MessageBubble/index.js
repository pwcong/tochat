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
            <div className={this.props.self ? style['root-right'] : style['root-left']}>
                {
                    this.props.self ? '' : (
                        <div 
                            onClick={this.handleAvatarClick}
                            className={style.avatar}
                            style={{
                                backgroundImage: 'url(' + this.props.avatar + ')'
                            }}
                            >
                        </div>
                    )
                }

                <div className={this.props.self ? style['container-right'] : style['container-left']}>
                    <h3>{this.props.uid}</h3>
                    <div 
                        className={style.content} 
                        style={{
                            backgroundColor: this.props.self ? '#65f031' : 'white'
                        }}>

                        <div className={this.props.self ? style['triangle-right'] : style['triangle-left']}><span></span></div>

                        {this.props.children}
                    </div>

                </div>

                {
                    this.props.self ? (
                        <div 
                            onClick={this.handleAvatarClick}
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
    self: PropTypes.bool,
    uid: PropTypes.string,
    avatar: PropTypes.string,
    onAvatarClick: PropTypes.func
};

MessageBubble.defaultProps = {
    self: false,
    uid: 'null',
    avatar: '/image/avatar.jpg',
    onAvatarClick(uid){
        console.log(uid);
    }
}

export default MessageBubble;