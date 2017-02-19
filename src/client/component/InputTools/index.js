import React, { Component, PropTypes } from 'react';
import { Button, Input, Popover } from 'antd';
import style from './style.css';

import { Picker } from 'react-expressions-baidu';

class InputTools extends Component {


    constructor(props){
        super(props);

        this.state = {
            message: '',
            popoverVisible: false
        };

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handlePopoverVisibleChange = this.handlePopoverVisibleChange.bind(this);
        this.handleAddSymbol = this.handleAddSymbol.bind(this);
    }

    handleMessageChange(e){
        this.setState({
            message: e.target.value
        });
    }

    handleSendMessage(){

        var message = this.state.message;
        this.props.onSendMessage(message);
        this.setState({
            message: ''
        });
        

    }

    handlePopoverVisibleChange(visible){
        this.setState({
            popoverVisible: visible
        });
    }

    handleAddSymbol(symbol){
        this.setState({
            popoverVisible: false
        });
        this.props.onAddSymbol(symbol);
    }

    render() {
        return (
            <div className={style.root}>
                
                <div className={style.btn}>
                    <Popover
                        content={
                            <Picker onItemClick={this.handleAddSymbol}/>
                        }
                        trigger="click"
                        onVisibleChange={this.handlePopoverVisibleChange}
                        visible={this.state.popoverVisible}>
                        <Button icon="smile-o" shape="circle" size="large" type="primary"/>
                    </Popover>
                </div>
                <Input onChange={this.handleMessageChange} value={this.state.message}/>

                <div className={style.btn}>
                    <Button icon="arrow-right" size="large" onClick={this.handleSendMessage}/>
                </div>
                
            </div>
        );
    }
}

InputTools.propTypes = {
    onSendMessage: PropTypes.func,
    onAddSymbol: PropTypes.func
};

InputTools.defaultProps = {
    onSendMessage(message){
        console.log(message);
    },
    onAddSymbol(symbol){
        console.log(symbol);
    }
};

export default InputTools;