var LoggerFactory = require('../utils/LoggerFactory');
var LoggerUtils = require('../utils/LoggerUtils');

const 
	logger = LoggerFactory.getLogger('UserService'),
	infoer = LoggerUtils.infoer(logger),
	errorer = LoggerUtils.errorer(logger);
	
var UserModel = require('../model/user');
var md5 = require('blueimp-md5');

exports.register = user => {

	return new Promise((resolve, reject) => {

		if( !user || !user.uid || !user.pwd ){
			reject({
				message: 'uid and pwd can not be null.',
			});
		}
		else if(user.uid.length < 6){
			reject({
				message: 'length of uid can not be shorter than 6.'
			});
		}
		else {
			
			infoer('register start', user.uid);

			UserModel
				.findOne({
					uid: user.uid
				})
				.then( _user => {
					
					if(_user){
						infoer('register failed', user.uid, 'user is existed');
						reject({
							message: 'user is existed.'
						});
					}else{

						var registerUser = new UserModel({
							uid: user.uid,
							pwd: md5(user.pwd)
						});

						registerUser
							.save()
							.then( _user => {
								infoer('register success', user.uid);
								resolve({
									user: _user
								});
							})
							.catch( err => {
								infoer('register failed', user.uid, 'unknown error');
								reject({
									message: 'unknown error.'
								});
							});
								
					}
				}).catch( err => {
					errorer(err);
					reject({
						message: 'server error.'
					});
				});
		}
	});

}

exports.login = user => {

	return new Promise( (resolve, reject) => {

		if(!user || !user.uid || !user.pwd){
			reject({
				message: 'uid and pwd can not be null.'
			});
		}
		else{

			infoer('login start', user.uid);

			UserModel
				.findOne({
					uid: user.uid
				})
				.then( _user => {
				
					if(_user){

						if(_user.pwd === md5(user.pwd)){

							infoer('login success', user.uid);

							resolve({
								user: _user
							});		


						}else{

							infoer('login failed', user.uid, 'wrong pwd');

							reject({
								message: 'wrong pwd.'
							});

						}

					}else{
						infoer('login failed', user.uid, 'user is not existed');
						reject({
							message: 'user is not existed.'
						});						
					}
				})
				.catch( err => {
					errorer(err);
					reject({
						message: 'server error.'
					});
				});
		}

	});

}

exports.modify = (user, pwd) => {

	return new Promise( (resolve, reject) => {

		if(!(user && user.uid && user.pwd && pwd)){
			reject({
				message: 'source user and pwd can not be empty.'
			});
		}
		else{

			infoer('modify start', user.uid);

			UserModel.findOne({
				uid: user.uid,
				pwd: md5(user.pwd)
			}).then( _user => {

				if(_user){

					UserModel.update(
						{
							uid: user.uid
						},
						{
							pwd: md5(pwd)
						}
					).then( _user => {
						infoer('modify success', user.uid);
						resolve({
							user: _user
						});
					}).catch( err => {
						infoer('modify failed', user.uid, 'unknown error');
						reject({
							message: 'unknown error.'
						});
					});

				}else{

					infoer('modify failed', user.uid, 'user is not existed or wrong pwd');

					reject({
						message: 'user is not existed or wrong pwd.'
					});	

				}

			}).catch( err => {
				logger.error(err);
				reject({
					message: 'server error.'
				});

			});

		}

	});

}