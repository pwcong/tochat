var userService = require('../service/user');

module.exports = {

	*register(next){

		if(this.is('application/json')){
			
			var user = this.request.body;

			if(!this.request || !user.uid || !user.pwd){
				yield next;
				this.throw(400, 'wrong request body.');
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
							ctx.throw(400, rej.message);
						}
					);


		}
		else
			this.throw(400, 'request header Content-Type must be application/json.');

	},
	*login(next){

		if(this.is('application/json')){

			var user = this.request.body;

			if(!this.request || !user.uid || !user.pwd){
				yield next;
				this.throw(400, 'wrong request body.');
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
							ctx.throw(400, rej.message);
						}
					);


		}else
			this.throw(400, 'request header Content-Type must be application/json.');

	}

}

