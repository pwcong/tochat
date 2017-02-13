var logger = require('../utils/LogUtils').getLogger('UserService');
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
		else{

			logger.info('register start ===> ' + user.uid);

			UserModel.findOne({
				uid: user.uid
			}, (err, _user) => {

				if(err){
					logger.error(err);
					reject({
						message: 'server error.'
					});
				}else {
				
					if(_user){
						logger.info('register failed ===> ' + user.uid + ' ---> user is existed');
						reject({
							message: 'user is existed.'
						});
					}else{
						var registerUser = new UserModel({
							uid: user.uid,
							pwd: md5(user.pwd)
						});

						registerUser.save((err, _user) => {

							if(err){
								logger.info('register failed ===> ' + user.uid + ' ---> unknown error');
								reject({
									message: 'unknown error.'
								});
							}else{
								logger.info('register success ===> ' + user.uid)
								resolve({
									user: _user
								});
							}

						});						
					}
				}

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
			logger.info('login start ===> ' + user.uid);

			UserModel.findOne({
				uid: user.uid
			}, (err, _user) => {

				if(err){
					logger.error(err);
					reject({
						message: 'server error.'
					});
				}else {
				
					if(_user){

						if(_user.pwd === md5(user.pwd)){

							logger.info('login success ===> ' + user.uid);

							resolve({
								user: _user
							});		


						}else{

							logger.info('login failed ===> ' + user.uid + ' ---> wrong pwd');

							reject({
								message: 'wrong pwd.'
							});

						}


					}else{
						logger.info('login failed ===> ' + user.uid + ' ---> user is not existed');
						reject({
							message: 'user is not existed.'
						});						
					}
				}

			});
		}
	});


}