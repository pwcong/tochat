import React, { PropTypes } from 'react';
import style from './style/index.css';
import { connect } from 'react-redux';
import { Form, Input, Icon, Row, Col, Button } from 'antd';
const FormItem = Form.Item;

const RegisterForm = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      	this.props.onSubmit(values);
      }
    });
  },
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('pwd')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },
  handleToLogin(){
  	this.props.onToLogin();
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} className={style['register-form'] + (this.props.hide ? (' ' + style['register-form-hide']) : '')}>
        <FormItem
          {...formItemLayout}
          label="用户名"
          hasFeedback
        >
          {getFieldDecorator('uid', {
            rules: [{
              required: true, message: '请输入用户名！',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('pwd', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" onBlur={this.handlePasswordBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button 
          	type="primary" 
          	htmlType="submit" 
          	size="large" 
          	loading={this.props.loading}
          	className={style['register-form-button']}
          	>
          	注册
          </Button>
          <div>
          已有账号？ <a onClick={this.handleToLogin}>立即登陆</a>
          </div>
        </FormItem>
      </Form>
    );
  },
}));

RegisterForm.propTypes = {
	loading: PropTypes.bool,
	hide: PropTypes.bool,
	onSubmit: PropTypes.func,
	onToLogin: PropTypes.func
};

RegisterForm.defaultProps = {
	loading: false,
	hide: false,
	onSubmit(values){
		console.log(values);
	},
	onToLogin(){
		console.log('to login');
	}

};

const LoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	this.props.onSubmit(values);
      }
    });
  },
  handleToRegister(){
  	this.props.onToRegister();
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form 
      	onSubmit={this.handleSubmit} 
      	className={ style['login-form'] + ( this.props.hide ? (' ' + style['login-form-hide']) : '')}>

        <FormItem>
          {getFieldDecorator('uid', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="用户名" size="large"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('pwd', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" size="large"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={style['login-form-button']} loading={this.props.loading}>
            登陆
          </Button>
          <div>
          没有账号？ <a onClick={this.handleToRegister}>注册一个</a>
          </div>
        </FormItem>
      </Form>
    );
  }
}));

LoginForm.defaultProps = {
	hide: false,
	loading: false,
	onSubmit(values){
		console.log(values);
	},
	onToRegister(){
		console.log('to register');
	}

};

LoginForm.propTypes = {
	hide: PropTypes.bool,
	loading: PropTypes.bool,
	onSubmit: PropTypes.func,
	onToRegister: PropTypes.func
};


class Index extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			toggle: false
		};

		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle(){
		this.setState({
			toggle: !this.state.toggle
		})
	}

	render(){
		return (

			<div className={style.root}>

				<div className={style.logo + (this.state.toggle ? (' ' + style['logo-left']) : '')}>
      		
      				<img src="/image/chat.png" alt="logo"/>
		      		<h1>To<span>C</span>hat</h1>

      			</div>

				<LoginForm hide={this.state.toggle} onToRegister={this.handleToggle}/>
				<RegisterForm hide={!this.state.toggle} onToLogin={this.handleToggle}/>
			</div>
			
		);
		
	}

}

function select(state){
	return ({
		data: state.data
	});
}

export default connect(select)(Index);