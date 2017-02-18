import { combineReducers } from 'redux';

import userstate from './userstate';
import roomstate from './roomstate';

export default combineReducers({
	userstate,
	roomstate
});