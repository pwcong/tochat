var app = require('./app');
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);

io.on('connection', function(){
	console.log("one user connected");
});

server.listen(80)
