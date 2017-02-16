var userInfoService = require('../service/userinfo');

module.exports = {

	*get(){

        var uid = this.params.uid;

        if(!uid){
            this.status = 400;
            this.body = 'wrong request params.';
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

	}
	

}

