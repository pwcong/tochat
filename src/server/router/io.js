var config = require('../../../config/io.config');

module.exports = io => {

    return () => {

        io.on(config.TYPE_CONNECTION, socket => {

            console.log('one user connected: ' + socket.id);

            socket.join(config.INITIAL_ROOM, () => {
                socket.room = config.INITIAL_ROOM;
            });

            socket.on(config.TYPE_BIND_UID, bundle => {
                socket.uid = bundle.payload.uid;
                console.log("bind uid: " + JSON.stringify(bundle));
            });
 
            socket.on(config.TYPE_SEND_MSG_TO_ROOM, bundle => {
                socket
                    .to(bundle.payload.to)
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
                console.log("send msg to room: " + JSON.stringify(bundle));
            });

            socket.on(config.TYPE_JOIN_ROOM, bundle => {

                socket.join(bundle.payload.name, () => {

                    socket.room = bundle.payload.name;

                    socket.to(bundle.payload.name).emit(
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

                console.log("join room: " + JSON.stringify(bundle));
            });


            socket.on(config.TYPE_LEAVE_ROOM, bundle => {

                socket.join(config.INITIAL_ROOM, () => {

                    socket.to(bundle.payload.name).emit(
                        config.TYPE_LEAVE_ROOM_BROADCAST,
                        {
                            dateTime: new Date().getTime,
                            payload: {
                                uid: bundle.payload.uid
                            }
                        }
                    );

                });

                console.log("leave room: " + JSON.stringify(bundle));
            });

            socket.on(config.TYPE_DISCONNECT, () => {

                console.log("one user disconnected: " + socket.id);

                if(socket.room !== config.INITIAL_ROOM){

                    socket.to(socket.room).emit(
                        config.TYPE_LEAVE_ROOM_BROADCAST,
                        {
                            dateTime: new Date().getTime,
                            payload: {
                                uid: socket.uid
                            }
                        }
                    );
                }

            });

            
        });

    }

}