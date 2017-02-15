var LoggerFactory = require('../utils/LoggerFactory');
var LoggerUtils = require('../utils/LoggerUtils');

var response = require('../entity/response');

const 
	OK = 200,
	ERROR = 400;

const 
	logger = LoggerFactory.getLogger('UserService'),
	infoer = LoggerUtils.infoer(logger),
	errorer = LoggerUtils.errorer(logger);
	
var UserModel = require('../model/user');
var md5 = require('blueimp-md5');

exports.register = user => {

	return new Promise((resolve, reject) => {

		if( !user || !user.uid || !user.pwd ){
			reject(response(ERROR, 'uid and pwd can not be null'));
		}
		else if(user.uid.length < 6){
			reject(response(ERROR, 'length of uid can not be shorter than 6'));
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
						reject(response(ERROR, 'user is existed'));
					}else{

						var registerUser = new UserModel({
							uid: user.uid,
							pwd: md5(user.pwd)
						});

						registerUser
							.save()
							.then( _user => {
								infoer('register success', user.uid);
								resolve(response(OK, 'success', _user));
							})
							.catch( err => {
								infoer('register failed', user.uid, 'unknown error');
								reject(response(ERROR, 'unknown error'));
							});
								
					}
				}).catch( err => {
					errorer(err);
					reject(response(ERROR, 'server error'));
				});
		}
	});

}

exports.login = user => {

	return new Promise( (resolve, reject) => {

		if(!user || !user.uid || !user.pwd){
			reject(response(ERROR, 'uid and pwd can not be null'));
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

							resolve(response(OK,'success', _user));		


						}else{

							infoer('login failed', user.uid, 'wrong pwd');

							reject(response(ERROR, 'wrong pwd'));

						}

					}else{
						infoer('login failed', user.uid, 'user is not existed');
						reject(response(ERROR, 'user is not existed'));						
					}
				})
				.catch( err => {
					errorer(err);
					reject(response(ERROR, 'server error'));
				});
		}

	});

}

exports.modify = (user, pwd) => {

	return new Promise( (resolve, reject) => {

		if(!(user && user.uid && user.pwd && pwd)){
			reject(response(ERROR, 'source user and pwd can not be empty'));
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
						resolve(response(OK, 'success', _user));
					}).catch( err => {
						infoer('modify failed', user.uid, 'unknown error');
						reject(response(ERROR, 'unknown error'));
					});

				}else{

					infoer('modify failed', user.uid, 'user is not existed or wrong pwd');

					reject(response(ERROR, 'user is not existed or wrong pwd'));	

				}

			}).catch( err => {
				logger.error(err);
				reject(response(ERROR, 'server error'));

			});

		}

	});

}