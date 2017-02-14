var userService = require('../service/user');

module.exports = {

	*register(){

		if(this.is('application/json')){
			
			var user = this.request.body;

			if(!this.request || !user.uid || !user.pwd){

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

			if(!this.request || !user.uid || !user.pwd){
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

	}

}

