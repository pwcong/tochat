import React, { Component, PropTypes } from 'react';
import { Input, Radio, Row, Col, Icon, Button, Tooltip  } from 'antd';

import style from './style.css';

const RadioGroup = Radio.Group;

class UserInfo extends Component {

    constructor(props){
        super(props);

        this.state = {
            nickname: this.props.nickname,
            sex: this.props.sex,
            email: this.props.email,
            github: this.props.github,
            avatar: this.props.avatar
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNickNameChange = this.handleNickNameChange.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleGithubChange = this.handleGithubChange.bind(this);
        this.handleAvatarChange = this.handleAvatarChange.bind(this);
    }

    handleSubmit(){
        this.props.onSubmit(this.state);
    }

    handleNickNameChange(e){
        this.setState({
            nickname: e.target.value
        });
    }

    handleSexChange(e){
        this.setState({
            sex: e.target.value
        });
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        });
    }

    handleGithubChange(e){
        this.setState({
            github: e.target.value
        });
    }

    handleAvatarChange(e){
        this.setState({
            avatar: e.target.value
        });
    }

    render() {
        return (
            <div className={style.root}>
                <Row gutter={24} className={style['item-container']}>
                    <Col span={4} offset={4} className={style['item-header']}>
                        <Tooltip title="昵称" placement="left">
                            <Icon type="user" />
                        </Tooltip>
                    </Col>
                    <Col span={10} className={style['item']}>
                        {
                            this.props.editing ? (
                                <Input defaultValue={this.props.nickname} onChange={this.handleNickNameChange}/>
                            ) : (
                                this.props.nickname
                            )
                        }
                    </Col>
                </Row>
                <Row gutter={24} className={style['item-container']}>
                    <Col span={4} offset={4} className={style['item-header']}>
                        <Tooltip title="性别" placement="left">
                            <Icon type="heart-o" />
                        </Tooltip>
                    </Col>
                    <Col span={10} className={style['item']}>
                        {
                            this.props.editing ? (
                                <RadioGroup defaultValue={this.props.sex} onChange={this.handleSexChange}>
                                    <Radio value={0}>未知</Radio>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            ) : (
                                getSexString(this.props.sex)
                            )
                        }
                    </Col>
                </Row>

                <Row gutter={24} className={style['item-container']}>
                    <Col span={4} offset={4} className={style['item-header']}>
                        <Tooltip title="邮箱" placement="left">
                            <Icon type="mail" />
                        </Tooltip>
                    </Col>
                    <Col span={10} className={style['item']}>
                        {
                            this.props.editing ? (
                                <Input defaultValue={this.props.email} onChange={this.handleEmailChange}/>
                            ) : (
                                this.props.email
                            )
                        }
                    </Col>
                </Row>
                <Row gutter={24} className={style['item-container']}>
                    <Col span={4} offset={4} className={style['item-header']}>
                        <Tooltip title="Github" placement="left">
                            <Icon type="github" />
                        </Tooltip>
                    </Col>
                    <Col span={10} className={style['item']}>
                        {
                            this.props.editing ? (
                                <Input defaultValue={this.props.github} onChange={this.handleGithubChange}/>
                            ) : (
                                this.props.github
                            )
                        }
                    </Col>
                </Row>

                <Row gutter={24} className={style['item-container']}>
                    <Col span={4} offset={4} className={style['item-header']}>
                        <Tooltip title="头像" placement="left">
                            <Icon type="picture" />
                        </Tooltip>
                    </Col>
                    <Col span={10} className={style['item']}>
                        {
                            this.props.editing ? (
                                <Input defaultValue={this.props.avatar} onChange={this.handleAvatarChange}/>
                            ) : (
                                this.props.avatar
                            )
                        }
                    </Col>
                </Row>

                {
                    this.props.editing ? (
                        <div className={style.btn}>
                            <Button type="primary" onClick={this.handleSubmit} loading={this.props.loading}>提交修改</Button>
                        </div>
                    ) : ''
                }

                
                
            </div>
        );
    }
}

function getSexString(sex){
    switch(sex){
        case 1: return '男';
        case 2: return '女';
        default: return '未知';
    }
}

UserInfo.propTypes = {
    loading: PropTypes.bool,
    avatar: PropTypes.string,
    sex: PropTypes.number,
    editing: PropTypes.bool,
    nickname: PropTypes.string,
    onSubmit: PropTypes.func,
    email: PropTypes.string,
    github: PropTypes.string
};

UserInfo.defaultProps = {
    loading: false,
    avatar: '',
    github: '',
    email: '',
    sex: 0,
    editing: false,
    nickname: '',
    onSubmit(values){
        console.log(values);
    }
};

export default UserInfo;