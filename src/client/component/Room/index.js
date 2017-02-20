import React, { Component, PropTypes } from 'react';
import style from './style.css';
import { Button } from 'antd';
import InputTools from '../InputTools';
import MessageBubble from '../MessageBubble';

import { isSymbol, convertSymbolToReactDOMNode } from 'react-expressions-baidu';

class Room extends Component {


    constructor(props){
        super(props);

        this.state = {
            symbols: []
        };
        
        this.handleClose = this.handleClose.bind(this);
        this.handleAddSymbol = this.handleAddSymbol.bind(this);
    }

    handleClose(){
        this.props.onClose();
    }

    handleAddSymbol(symbol){
        if(isSymbol(symbol))
            this.setState({
                symbols: [...this.state.symbols, symbol]
            });
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
                        this.state.symbols.map(symbol => {
                            return <div key={Math.random()}>
                                        <MessageBubble 
                                            uid={this.props.uid}
                                            self={true}>
                                            {convertSymbolToReactDOMNode(symbol)}
                                        </MessageBubble>
                                    </div>
                        })
                    }
                </div>

                <div className={style['input-tools']}>
                    <InputTools onAddSymbol={this.handleAddSymbol}/>
                </div>


            </div>
        );
    }
}

Room.propTypes = {
    name: PropTypes.string,
    onClose: PropTypes.func,
    uid: PropTypes.string,
};

Room.defaultProps = {
    uid: 'null',
    name: 'null',
    onClose(){
        console.log('on close');
    }
}

export default Room;