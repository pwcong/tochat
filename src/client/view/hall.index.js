import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd';
import style from './style/hall.index.css';

class HallIndex extends Component {
    render() {
        return (
            <div className={style.root}>
                <img src="/image/hall_bg.jpg" alt="bg"/>
            </div>
        );
    }
}

HallIndex.propTypes = {

};

export default HallIndex;