var router = module.exports = require('koa-router')();

var index = require('../controller/index');

router
	.get('/', function *(){
		index(this).renderIndex();
	});


