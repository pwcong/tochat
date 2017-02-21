var config = require('../../../config/io.config');
var LoggerFactory = require('../utils/LoggerFactory');
var LoggerUtils = require('../utils/LoggerUtils');

const 
	logger = LoggerFactory.getLogger('SocketIO'),
	infoer = LoggerUtils.infoer(logger),
	errorer = LoggerUtils.errorer(logger);

module.exports = io => {

    return () => {

        io.on(config.TYPE_CONNECTION, socket => {

            console.log('one user connected: ' + socket.id);

            infoer('connectino', socket.id);

            socket.join(config.INITIAL_ROOM, () => {
                socket.room = config.INITIAL_ROOM;
            });

            socket.on(config.TYPE_BIND_UID, bundle => {
                socket.uid = bundle.payload.uid;
                infoer('bindUID', JSON.stringify(bundle));
            });
 
            socket.on(config.TYPE_SEND_MSG_TO_ROOM, bundle => {

                io
                    .to(socket.room)
                    .emit(
                        config.TYPE_RECEIVE_MSG_FROM_ROOM,
                        {
                            dateTime: new Date().getTime(),
                            payload: {
                                from: bundle.payload.from,
                                msg: bundle.payload.msg
                            }
                        }
                    );
                    
                infoer('sendMsgTORoom', JSON.stringify(bundle));
            });

            socket.on(config.TYPE_JOIN_ROOM, bundle => {

                socket.join(bundle.payload.name, () => {

                    socket.room = bundle.payload.name;

                    io.to(bundle.payload.name).emit(
                        config.TYPE_JOIN_ROOM_BROADCAST,
                        {
                            dateTime: new Date().getTime,
                            payload: {
                                uid: bundle.payload.uid
                            }
                        }
                    );

                    socket.emit(
                        config.TYPE_JOIN_ROOM_RESPONSE,
                        {
                            dateTime: new Date().getTime,
                            payload: {
                                name: bundle.payload.name,
                                status: 200
                            }                           
                        }
                    );
                    
                });

                infoer('joinRoom', JSON.stringify(bundle));

            });


            socket.on(config.TYPE_LEAVE_ROOM, bundle => {

                socket.join(config.INITIAL_ROOM, () => {

                    io.to(bundle.payload.name).emit(
                        config.TYPE_LEAVE_ROOM_BROADCAST,
                        {
                            dateTime: new Date().getTime,
                            payload: {
                                uid: bundle.payload.uid
                            }
                        }
                    );

                });

                infoer('leaveRoom', JSON.stringify(bundle));

            });

            socket.on(config.TYPE_DISCONNECT, () => {

                if(socket.room !== config.INITIAL_ROOM){

                    io.to(socket.room).emit(
                        config.TYPE_LEAVE_ROOM_BROADCAST,
                        {
                            dateTime: new Date().getTime,
                            payload: {
                                uid: socket.uid
                            }
                        }
                    );
                }

                infoer('disconnect', socket.id);

            });

            
        });

    }

}