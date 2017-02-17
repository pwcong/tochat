var userInfoService = require('../service/userinfo');

module.exports = {

	*get(){

        var uid = this.params.uid;

        if(!uid){
            this.status = 400;
            this.body = 'wrong request params';
            return;
        }

        var ctx = this;	

        yield userInfoService
                .get(uid)
                .then(
                    res => {
                        ctx.body = {
                            status: res.status,
                            message: res.message,
                            result: {
                                userinfo: res.result
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
    *modify(){

        var body = this.request.body;
        var uid = body.uid;
        var userinfo = body.userinfo;
        var token = body.token;

        if(!uid || !userinfo || !token){
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

        yield userInfoService
                .modify(uid, userinfo)
                .then(
                    res => {
                        ctx.body = {
                            status: res.status,
                            message: res.message
                        };                    
                    },
                    rej => {
                        ctx.body = {
                            status: rej.status,
                            message: rej.message
                        };
                    }
                );

    }
	

}

