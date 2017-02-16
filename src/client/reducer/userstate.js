import { 
	USERSTATE_LOGIN,
	USERSTATE_LOGOUT
} from '../actions/userstate'

export const INITIAL_STATE = {

	isLogined: true,
	uid: '',
	intro: {
		avatar: '',
		nickname: 'Pwcong',
		sex: 1,
		email: 'pwcong@foxmail.com',
		github: 'https://github.com/pwcong'
	}

};


export default ( state = INITIAL_STATE, action) => {

	switch(action.type){

		case USERSTATE_LOGIN:
			return Object.assign({}, state, {
				isLogined: true,
				uid: action.payload.uid
			});
		case USERSTATE_LOGOUT:
			return state;
		default:
			return state;

	}


}