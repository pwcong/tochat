import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd';
import style from './style.css';

class RoomItem extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleClick(){
        this.props.onClick(this.props.name);
    }

    handleMouseOver(){
        this.refs.introMarquee.stop();
    }

    handleMouseOut(){
        this.refs.introMarquee.start();
    }

    render() {
        return (
            <div 
                className={style.root + (this.props.active ? (' '+ style.active) : '')} 
                onClick={this.handleClick} 
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}>
                
                <div className={style.container}>
                    <div className={style.icon}>
                        <Icon type={this.props.sign%2===0 ? 'star-o' : 'star'}/>
                    </div>
                    <p className={style.name}>
                        {this.props.name}
                    </p>
                </div>
            
                <marquee
                    direction="left" 
                    className={style.intro} 
                    ref="introMarquee">
                    {this.props.intro}
                </marquee>

            </div>
        );
    }
}

RoomItem.propTypes = {
    active: PropTypes.bool,
    sign: PropTypes.number,
    name: PropTypes.string,
    intro: PropTypes.string,
    onClick: PropTypes.func
};

RoomItem.defaultProps = {
    active: false,
    sign: 0,
    name: '',
    intro: '',
    onClick(name){
        console.log('on click: ' + name);
    }
}

export default RoomItem;