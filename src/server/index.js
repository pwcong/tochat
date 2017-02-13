/*
 * 初始化数据库连接
 */
var config = require('../../config/mongodb.config');
var mongoose = require('mongoose');

mongoose.connect(config.uri, config.options);

var db = mongoose.connection;
db.on('error', error => {
	console.log('connection error: ' + error);
	process.exit(0);
})
db.once('open' , () => {
	console.log("mongoose has connected database successfully.")
})

/*
 * 初始化Web服务器
 */

var path = require('path');
var koa = require('koa');
var static = require('koa-static');
var logger = require('koa-logger');
var compress = require('koa-compress');
var router = require('./router');
var session = require('koa-session');
var Keygrip = require('Keygrip');

var app = koa();

app.keys = Keygrip(["ToChat", "Pwcong"]);

process.env.NODE_ENV === 'production' || app.use(logger());
	
app.use(compress());

app.use(static(path.resolve(__dirname, '../../public/static')));

app.use(session({
	key: 'tochat:sess',
	maxAge: 86400000,
	overwrite: true,
	httpOnly: true,
	signed: true
}, app));

app
  .use(router.routes())
  .use(router.allowedMethods());

/*
 * 初始化Socket服务器
 */

var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);

io.on('connection', socket => {
	console.log("one user connected: " + socket.id);
	socket.emit("message", "welcome");
	socket.on("message", msg => {
		console.log(msg);
	});
	socket.on("disconnect", () => {
		console.log("one user disconnected: " + socket.id);
	});
});


var port = process.env.NODE_ENV === 'production' ? 80 : 3000;

server.listen( port, () => {
	console.log("listening on 127.0.0.1:" + port);
});
