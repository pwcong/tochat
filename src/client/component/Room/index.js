import React, { Component, PropTypes } from 'react';
import style from './style.css';
import { Button } from 'antd';
import InputTools from '../InputTools';
import MessageBubble from '../MessageBubble';

import { isSymbol, convertSymbolToReactDOMNode } from 'react-expressions-baidu';

class Room extends Component {


    constructor(props){
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    handleClose(){
        this.props.onClose();
    }

    handleSendMessage(msg){
        this.props.onSendMessage(msg);
    }

    componentDidMount(){
        let content = this.refs.content;
        content.scrollTop = content.scrollHeight;
    }

    componentDidUpdate(){
        
        let content = this.refs.content;
        content.scrollTop = content.scrollHeight;
    }

    render() {
        return (
            <div className={style.root}>

                <div className={style.header}>
                    <h2>{this.props.name}</h2>
                    <div className={style['header-tools']}>
                        <Button icon="close" shape="circle" size="small" type="danger" onClick={this.handleClose}/>
                    </div>
                    
                </div>

                <div className={style.content} ref="content">

                    {
                        this.props.message.map( item => {
                            return (
                                <div key={item.dateTime}>
                                    <MessageBubble 
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
    onSendMessage: PropTypes.func
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
    }
}

export default Room;