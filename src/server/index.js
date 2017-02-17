/*
 * 替换为 bluebird 的 Promise，提高性能
 */

global.Promise = require('bluebird');

/*
 * 初始化mongo数据库连接
 */
var mongooseConfig = require('../../config/mongodb.config');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(mongooseConfig.uri, mongooseConfig.options);

var db = mongoose.connection;
db.on('error', error => {
	console.log('Mongoose connection error: ' + error);
	process.exit(0);
})
db.once('open' , () => {
	console.log("Mongoose has connected database successfully")
})

/*
 * 初始化redis数据库连接
 */
var redisConfig = require('../../config/redis.config');
var redis = require('redis');
global.redisClient = redis.createClient(redisConfig);
redisClient.on('error', error => {
	console.log('Redis connectino error: ' + error);
	process.exit(0);
})
redisClient.on('connect', () => {
	console.log('Redis has connected database successfully');
})

/*
 * 初始化Web服务器
 */

var path = require('path');
var koa = require('koa');
var static = require('koa-static');
var KoaLogger = require('koa-logger');
var compress = require('koa-compress');
var router = require('./router');
var cors = require('koa-cors');
var Keygrip = require('Keygrip');
var logger = require('./utils/LoggerFactory').getLogger('http');

var app = koa();

app.keys = Keygrip(["ToChat", "Pwcong"]);

process.env.NODE_ENV === 'production' ? 
	app.use(function *(next){
		logger.info('<-- %s %s', this.method, this.url)
		var start = new Date;
		yield next;
		var ms = new Date - start;
		logger.info('--> %s %s %s %s -', this.method, this.url, this.status, ms + 'ms');
	}) : app.use(KoaLogger());

app.use(cors());	

app.use(compress());

app.use(static(path.resolve(__dirname, '../../public/static')));

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


var port = process.env.NODE_ENV === 'production' ? 80 : 4000;

server.listen( port, () => {
	console.log("Listening on 127.0.0.1:" + port);
});
