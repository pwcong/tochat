import React, { Component } from 'react';
import { Button, message } from 'antd';
import { connect } from 'react-redux';
import style from './style/intro.css';

import UserInfo from '../component/UserInfo';

import { toGetUserInfo, toModifyUserInfo } from '../actions/userstate';

class Intro extends Component {

    constructor(props){
        super(props);
        this.state = {
            editing: false,
            postEditing: false
        };

        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleEditUserInfoSubmit = this.handleEditUserInfoSubmit.bind(this);

    }

    componentWillMount(){
        this.props.dispatch(toGetUserInfo(
            this.props.userstate.uid,
            err => {
                message.error(err);
            }
        ));
    }

    handleEditToggle(){
        this.setState({
            editing: !this.state.editing
        });
    }

    handleEditUserInfoSubmit(values){

        const ctx = this;
        const { dispatch, userstate } = this.props;

        dispatch(toModifyUserInfo(
            userstate.uid,
            userstate.token,
            values,
            () => {
                ctx.setState({
                    postEditing: true
                })
            },
            () => {
                message.success('修改成功');
                ctx.setState({
                    postEditing: false,
                    editing: false
                })
            },
            err => {
                message.error(err);
                ctx.setState({
                    postEditing: false
                })
            }
        ));
    }

    render() {

        var { avatar, nickname, sex, email, github } = this.props.userstate.userinfo;

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
                        loading={this.state.postEditing}
                        onSubmit={this.handleEditUserInfoSubmit}
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