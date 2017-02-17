var router = module.exports = require('koa-router')();
var koaBody = require('koa-body')();
var send = require('koa-send');

var UserController = require('../controller/user');
var UserInfoController = require('../controller/userinfo');
var RoomController = require('../controller/room');

var Config = require('../../../config/server.config');

const serverConfig = Config(true);

router
	.get('/', function*(){
		yield send(this, 'public/index.html');
	})
	.post(serverConfig.url.register, koaBody, UserController.register)
	.post(serverConfig.url.login, koaBody, UserController.login)
	.post(serverConfig.url.modifyUser, koaBody, UserController.modify)
	.get(serverConfig.url.getUserInfo+':uid',UserInfoController.get)
	.post(serverConfig.url.modifyUserInfo, koaBody, UserInfoController.modify)
	.get(serverConfig.url.getRooms,RoomController.get)
	.post(serverConfig.url.createRoom, koaBody, RoomController.create);
	


