var path = require('path');
var koa = require('koa');
var app = module.exports = koa();
var static = require('koa-static');
var logger = require('koa-logger');

var router = require('./router');

app.use(logger());

app.use(static(path.resolve(__dirname, '../public/static')));

app.use()

if(!module.parent)
	app.listen(80);