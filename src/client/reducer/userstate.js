import { 
	USERSTATE_LOGIN,
	USERSTATE_LOGOUT,
	USERSTATE_GETUSERINFO,
	USERSTATE_MODIFYUSERINFO
} from '../actions/userstate'

export const INITIAL_STATE = {

	isLogined: false,
	uid: '',
	token: '',
	userinfo: {
		avatar: '',
		nickname: '',
		sex: 0,
		email: '',
		github: ''
	}

};


export default ( state = INITIAL_STATE, action) => {

	switch(action.type){

		case USERSTATE_LOGIN:
			return Object.assign({}, state, {
				isLogined: true,
				uid: action.payload.uid,
				token: action.payload.token
			});
		case USERSTATE_LOGOUT:
			return INITIAL_STATE;
		case USERSTATE_GETUSERINFO:
			return Object.assign({}, state, {
				userinfo: action.payload.userinfo
			})
		case USERSTATE_MODIFYUSERINFO:
			return Object.assign({}, state, {
				userinfo: action.payload.userinfo
			})
		default:
			return state;

	}


}