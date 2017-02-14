var userService = require('../service/user');

module.exports = {

	*register(){

		if(this.is('application/json')){
			
			var user = this.request.body;

			if(!user || !user.uid || !user.pwd){

				this.status = 400;
				this.body = 'wrong request body.';
				return;
			}

			var ctx = this;	

			yield userService
					.register(user)
					.then(
						res => {
							ctx.body = {
								status: 200,
								message: 'register sucessfully.',
								result: {
									uid: res.user.uid
								}
							};
							ctx.session.uid = res.user.uid;
						},
						rej => {
							ctx.status = 400;
							ctx.body = rej.message;
						}
					);


		}
		else{
			this.status = 400;
			this.body = 'request header Content-Type must be application/json.';
		}

	},
	*login(){

		if(this.is('application/json')){

			var user = this.request.body;

			if(!user || !user.uid || !user.pwd){
				this.status = 400;
				this.body = 'wrong request body.';
				return;
			}

			var ctx = this;	

			yield userService
					.login(user)
					.then(
						res => {
							ctx.body = {
								status: 200,
								message: 'login sucessfully.',
								result: {
									uid: res.user.uid
								}
							};

							ctx.session.uid = res.user.uid;
						},
						rej => {
							ctx.status = 400;
							ctx.body = rej.message;
						}
					);


		}else{
			this.status = 400;
			this.body = 'request header Content-Type must be application/json.';
		}

	},
	*modify(){

		if(this.is('application/json')){

			var reqBody = this.request.body;

			if( !this.session.uid || this.session.uid !== reqBody.user.uid){

				this.status = 400;
				this.body = 'has not sign in.';
				return;

			}

			if(!reqBody || !reqBody.user || !reqBody.user.uid || !reqBody.user.pwd || !reqBody.pwd){
				this.status = 400;
				this.body = 'wrong request body.';
				return;
			}

			var ctx = this;	

			yield userService
					.modify(reqBody.user, reqBody.pwd)
					.then(
						res => {
							ctx.body = {
								status: 200,
								message: 'modify sucessfully.',
								result: {
									uid: res.user.uid
								}
							};

							ctx.session.uid = res.user.uid;
						},
						rej => {
							ctx.status = 400;
							ctx.body = rej.message;
						}
					);


		}else{
			this.status = 400;
			this.body = 'request header Content-Type must be application/json.';
		}

	}

}

