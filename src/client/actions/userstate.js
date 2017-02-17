import 'whatwg-fetch';
import md5 from 'blueimp-md5';
import Config from '../../../config/server.config';

const clientConfig = Config(false);

export const USERSTATE_LOGIN = "USERSTATE_LOGIN";
export function login(uid, token){
	return ({
		type: USERSTATE_LOGIN,
		payload: {
			uid,
			token
		}
	});
}

export function toLogin(uid, pwd, onStart, onSuccess, onFailed){


	return dispatch => {

		onStart();

		fetch(clientConfig.url.login, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				uid: uid,
				pwd: md5(pwd)
			})
		}).then( res => {
			return res.json();
		}).then( json => {
			if(json.status === 200){
				dispatch(login(json.result.uid, json.result.token));
				onSuccess();
			}
			else
				onFailed(json.message);
			
		}).catch( err => {
			onFailed('server error');
		})

	}


}


export function toRegister(uid, pwd, onStart, onSuccess, onFailed){


	return dispatch => {

		onStart();

		fetch(clientConfig.url.register, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				uid: uid,
				pwd: md5(pwd)
			})
		}).then( res => {
			return res.json();
		}).then( json => {
			if(json.status === 200){
				dispatch(login(json.result.uid, json.result.token));
				onSuccess();
			}
			else
				onFailed(json.message);
		}).catch( err => {
			onFailed('server error');
		})

	}


}

export const USERSTATE_LOGOUT = 'USERSTATE_LOGOUT';
export function logout(){
	return ({
		type: USERSTATE_LOGOUT
	});
}

export const USERSTATE_GETUSERINFO = 'USERSTATE_GETUSERINFO';
export function getUserInfo(userinfo){
	return ({
		type: USERSTATE_GETUSERINFO,
		payload: {
			userinfo
		}
	});
}

export function toGetUserInfo(uid, onFailed){

	return dispatch => {

		fetch(clientConfig.url.getUserInfo + '/' + uid)
		.then( res => {
			return res.json();
		}).then( json => {
			if(json.status === 200){
				dispatch(getUserInfo(json.result.userinfo));
			}
			else
				onFailed(json.message);
		}).catch( err => {
			onFailed('server error');
		})


	}
}

export const USERSTATE_MODIFYUSERINFO = 'USERSTATE_MODIFYUSERINFO';
export function modifyUserInfo(userinfo){
	return ({
		type: USERSTATE_MODIFYUSERINFO,
		payload: {
			userinfo
		}
	});
}

export function toModifyUserInfo(uid, token, userinfo, onStart, onSuccess, onFailed){

	return dispatch => {

		var postUserInfo = {};

		userinfo.avatar && (postUserInfo.avatar = userinfo.avatar);
		userinfo.nickname && (postUserInfo.nickname = userinfo.nickname);
		(userinfo.sex||userinfo.sex===0) ? (postUserInfo.sex = userinfo.sex) : '';
		userinfo.email && (postUserInfo.email = userinfo.email);
		userinfo.github && (postUserInfo.github = userinfo.github);

		onStart();

		fetch(clientConfig.url.modifyUserInfo, {

			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				uid,
				token,
				userinfo: postUserInfo
			})
		})
		.then( res => {
			return res.json();
		}).then( json => {
			if(json.status === 200){
				onSuccess();
				dispatch(modifyUserInfo(userinfo));
			}
			else
				onFailed(json.message);
		}).catch( err => {
			onFailed('server error');
		})		

	}

}