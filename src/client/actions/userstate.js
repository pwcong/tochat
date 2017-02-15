import 'whatwg-fetch';
import md5 from 'blueimp-md5';

export const USERSTATE_LOGIN = "USERSTATE_LOGIN";
export function login(uid){
	return ({
		type: USERSTATE_LOGIN,
		uid: uid
	});
}

export function toLogin(uid, pwd, onStart, onSuccess, onFailed){


	return dispatch => {

		onStart();

		fetch('/user/login', {
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
				dispatch(login(uid));
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

		fetch('/user/register', {
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
				dispatch(login(uid));
				onSuccess();
			}
			else
				onFailed(json.message);
		}).catch( err => {
			onFailed('server error');
		})

	}


}