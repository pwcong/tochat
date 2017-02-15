import { USERSTATE_LOGIN } from '../actions/userstate'

export const INITIAL_STATE = {

	isLogined: false,
	uid: '',
	userinfo: {
		avatar: '',
		name: '',
		birthday: '',
		sex: 0,
		summary: '' 
	}

};


export default ( state = INITIAL_STATE, action) => {

	switch(action.type){

		case USERSTATE_LOGIN:
			return Object.assign({}, state, {
				isLogined: true,
				uid: action.uid
			});
		default:
			return state;

	}


}