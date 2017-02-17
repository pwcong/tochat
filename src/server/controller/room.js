var roomService = require('../service/room');

module.exports = {

	*get(){

        var ctx = this;	

        yield roomService
                .get()
                .then(
                    res => {
                        ctx.body = {
                            status: res.status,
                            message: res.message,
                            result: {
                                rooms: res.result
                            }
                        };
                    },
                    rej => {
                        ctx.body = {
                            status: rej.status,
                            message: rej.message
                        };
                    }
                );

	},
    *create(){

        if(this.is('application/json')){
                
            var body = this.request.body;

            var uid = body.uid;
            var room = body.room;
            var token = body.token;

            if(!uid || !room || !token){
                this.status = 400;
                this.body = 'wrong request body';
                return;       
            }

            var _token = yield new Promise(resolve=>{
                redisClient.get(uid, (err,reply) => {
                    resolve(reply);
                });
            })

            if(_token !== token){
                this.status = 400;
                this.body = 'token validate failed';
                return;              
            }

            var ctx = this;

            yield roomService
                    .create(room)
                    .then(
                        res => {
                            ctx.body = {
                                status: res.status,
                                message: res.message,
                                result: {
                                    room: res.result
                                }
                            };
                        },
                        rej => {
                            ctx.body = {
                                status: rej.status,
                                message: rej.message
                            };
                        }
                    )

        }else{
			this.status = 400;
			this.body = 'request header Content-Type must be application/json';
		}

    }

}

