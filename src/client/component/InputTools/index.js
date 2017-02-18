import React, { Component, PropTypes } from 'react';
import { Button,Input } from 'antd';
import style from './style.css';

class InputTools extends Component {


    constructor(props){
        super(props);

        this.state = {
            message: ''
        };

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleShowExpressions = this.handleShowExpressions.bind(this);
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

    handleShowExpressions(){
        
    }

    render() {
        return (
            <div className={style.root}>
                
                <div className={style.btn}>
                    <Button icon="smile-o" shape="circle" size="large" type="primary" onClick={this.handleShowExpressions}/>
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
    onSendMessage: PropTypes.func
};

InputTools.defaultProps = {
    onSendMessage(message){
        console.log(message);
    }
};

export default InputTools;