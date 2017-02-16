import React, { Component } from 'react';
import { Button, message } from 'antd';
import { connect } from 'react-redux';
import style from './style/intro.css';

import UserInfo from '../component/UserInfo';

class Intro extends Component {

    constructor(props){
        super(props);
        this.state = {
            editing: false
        };

        this.handleEditToggle = this.handleEditToggle.bind(this);

    }

    handleEditToggle(){
        this.setState({
            editing: !this.state.editing
        });
    }

    render() {

        var { avatar, nickname, sex, email, github } = this.props.userstate.intro;

        return (
            <div className={style.root}>

                <div className={style.title}>
                    <h2>个人信息</h2>
                </div>

                <div className={ style.tools + ' ' + (this.state.editing ? style['tools-left'] : style['tools-right'])}>
                    {
                        this.state.editing ? (
                            <Button type="danger" onClick={this.handleEditToggle}>返回</Button>
                        ) : (
                            <Button type="primary" onClick={this.handleEditToggle}>修改</Button>
                        )
                    }
                </div>

                <div className={style.container}>

                    <UserInfo 
                        avatar={avatar}
                        nickname={nickname}
                        sex={sex}
                        email={email}
                        github={github}
                        editing={this.state.editing}
                        />

                </div>
            </div>
        );
    }
}

function select(state){
    return ({
        userstate: state.userstate
    });
}

export default connect(select)(Intro);