import { combineReducers } from 'redux';

import userstate from './userstate';
import roomstate from './roomstate';
import data from './data';

export default combineReducers({
	userstate,
	roomstate,
	data
});