var router = module.exports = require('koa-router')();
var koaBody = require('koa-body')();
var send = require('koa-send');

var UserController = require('../controller/user');
var UserInfoController = require('../controller/userinfo');
var RoomController = require('../controller/room');

router
	.get('/', function*(){
		yield send(this, 'public/index.html');
	})
	.post('/user/register', koaBody, UserController.register)
	.post('/user/login', koaBody, UserController.login)
	.post('/user/modify', koaBody, UserController.modify)
	.get('/userinfo/get/:uid',UserInfoController.get)
	.post('/userinfo/modify', koaBody, UserInfoController.modify)
	.get('/room',RoomController.get)
	.post('/room/create', koaBody, RoomController.create);
	


