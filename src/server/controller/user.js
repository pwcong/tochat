var userService = require('../service/user');
var uuidV1 = require('uuid/v1');

module.exports = {

	*register(){

		if(this.is('application/json')){
			
			var user = this.request.body;

			if(!user || !user.uid || !user.pwd){

				this.status = 400;
				this.body = 'wrong request body';
				return;
			}

			var ctx = this;	

			yield userService
					.register(user)
					.then(
						res => {

							var uuid = uuidV1();

							ctx.body = {
								status: res.status,
								message: res.message,
								result: {
									uid: res.result.uid,
									token: uuid
								}
							};
							
							redisClient.set(res.result.uid, uuid);

						},
						rej => {
							ctx.body = {
								status: rej.status,
								message: rej.message
							};
						}
					);


		}
		else{
			this.status = 400;
			this.body = 'request header Content-Type must be application/json';
		}

	},
	*login(){

		if(this.is('application/json')){

			var user = this.request.body;

			if(!user || !user.uid || !user.pwd){
				this.status = 400;
				this.body = 'wrong request body';
				return;
			}

			var ctx = this;	

			yield userService
					.login(user)
					.then(
						res => {

							var uuid = uuidV1();

							ctx.body = {
								status: res.status,
								message: res.message,
								result: {
									uid: res.result.uid,
									token: uuid
								}
							};

							redisClient.set(res.result.uid, uuid);
						},
						rej => {
							ctx.body = {
								status: rej.status,
								message: rej.message
							};
						}
					);


		}else{
			this.status = 400;
			this.body = 'request header Content-Type must be application/json';
		}

	},
	*modify(){

		if(this.is('application/json')){

			var reqBody = this.request.body;

			if(!reqBody || !reqBody.user || !reqBody.user.uid || !reqBody.user.pwd || !reqBody.pwd){
				this.status = 400;
				this.body = 'wrong request body';
				return;
			}

			var ctx = this;	

			yield userService
					.modify(reqBody.user, reqBody.pwd)
					.then(
						res => {
							ctx.body = {
								status: 200,
								message: 'modify sucessfully',
								result: {
									uid: res.user.uid
								}
							};
						},
						rej => {
							ctx.status = 400;
							ctx.body = rej.message;
						}
					);


		}else{
			this.status = 400;
			this.body = 'request header Content-Type must be application/json';
		}

	}

}

