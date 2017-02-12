var path = require('path');
var koa = require('koa');
var app = module.exports = koa();
var static = require('koa-static');
var logger = require('koa-logger');
var compress = require('koa-compress');
var router = require('./router');

app.use(logger());

app.use(compress());

app.use(static(path.resolve(__dirname, '../public/static')));

app
  .use(router.routes())
  .use(router.allowedMethods());

if(!module.parent)
	app.listen(80);

