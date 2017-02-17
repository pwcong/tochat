module.exports = io => {

    return () => {

        io.on('connection', socket => {

            console.log('one user connected: ' + socket.id);
        
            socket.on("disconnect", () => {
                console.log("one user disconnected: " + socket.id);
            });
        });

    }

}