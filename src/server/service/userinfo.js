var LoggerFactory = require('../utils/LoggerFactory');
var LoggerUtils = require('../utils/LoggerUtils');

var response = require('../entity/response');

const 
	OK = 200,
	ERROR = 400;

const 
	logger = LoggerFactory.getLogger('UserInfoService'),
	infoer = LoggerUtils.infoer(logger),
	errorer = LoggerUtils.errorer(logger);
	
var UserInfoModel = require('../model/userinfo');
var md5 = require('blueimp-md5');

exports.get = uid => {

	return new Promise((resolve, reject) => {

		if( !uid ){
			reject(response(ERROR, 'uid can not be null'));
		}
        
		else {
			
			infoer('get start', uid);

			UserInfoModel
				.findOne({
					uid: uid
				})
				.then( userinfo => {
					
					if(!userinfo){

                        var newUserInfo = new UserInfoModel({
                            uid: uid,
                            nickname: '',
                            sex: 0,
                            email: '',
                            github: '',
                            avatar: ''
                        });

                        newUserInfo
                            .save()
                            .then( _userinfo => {
                                if(_userinfo){
                                    infoer('get success', uid);
                                    resolve(response(OK, 'success', _userinfo));
                                }else{
                                    infoer('get failed', uid);
                                    reject(response(ERROR, 'unknown error'));
                                }
                            }).catch( err => {
                                errorer(err);
					            reject(response(ERROR, 'server error'));
                            });

					}else{
                        infoer('get success', uid);
                        resolve(response(OK, 'success', userinfo));
					}
				}).catch( err => {
					errorer(err);
					reject(response(ERROR, 'server error'));
				});
		}
	});
}

exports.modify = (uid, userinfo) => {

	return new Promise( (resolve, reject) => {
		if(!uid || !userinfo){
			reject(response(ERROR, 'uid and userinfo can not be null'));
		}else{

			infoer('modify start', uid);

			UserInfoModel
				.findOne({
					uid: uid
				}).then( _userinfo => {

					if(!_userinfo){
						infoer('modify failed', uid, 'userinfo is not existed');
						reject(response(ERROR, 'userinfo is not existed'));

					}else{

						UserInfoModel
							.update({uid: uid}, userinfo)
							.then( result => {

								if(result.ok){
									infoer('modify success', uid);
									resolve(response(OK, 'success'));
								}else{
									infoer('modify failed', uid, 'unknown error');
									reject(response(ERROR, 'unknown error'));
								}
							}).catch( err => {
								errorer(err);
								reject(response(ERROR, 'unknown error'));
							});
					}

				}).catch( err => {
					errorer(err);
					reject(response(ERROR, 'server error'));
				})

		}
        

	});

}