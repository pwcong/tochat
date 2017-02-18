import React, { Component, PropTypes } from 'react';
import style from './style.css';
import { Button } from 'antd';
import InputTools from '../InputTools';

class Room extends Component {


    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        this.props.onClose();
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

                <div className={style.content}>
                </div>

                <div className={style['input-tools']}>
                    <InputTools />
                </div>


            </div>
        );
    }
}

Room.propTypes = {
    name: PropTypes.string,
    onClose: PropTypes.func
};

Room.defaultProps = {
    name: 'Test',
    onClose(){
        console.log('on close');
    }
}

export default Room;