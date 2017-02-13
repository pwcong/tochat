var router = module.exports = require('koa-router')();
var koaBody = require('koa-body')();
var send = require('koa-send');

var UserController = require('../controller/user');

router
	.get('/', function*(){
		yield send(this, 'public/index.html');
	})
	.post('/user/register', koaBody, UserController.register)
	.post('/user/login', koaBody, UserController.login);


