var React = require('react');

var router = module.exports = require('koa-router')();

var IndexController = require('../controller/IndexController');

router
	.get('/', function *(){
		IndexController(this)
	});


