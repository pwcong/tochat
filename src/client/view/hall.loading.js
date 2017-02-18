import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd';
import style from './style/hall.loading.css';

class HallLoading extends Component {
    render() {
        return (
            <div className={style.root}>
                <Icon type="loading"/>
            </div>
        );
    }
}

HallLoading.propTypes = {

};

export default HallLoading;