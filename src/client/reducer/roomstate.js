import {
    ROOMSTATE_GETROOMS,
    ROOMSTATE_JOINROOM,
    ROOMSTATE_LEAVEROOM,
    ROOMSTATE_CREATEROOM
} from '../actions/roomstate';

export const INITIAL_STATE = {
    name: '',
    rooms: []
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type){

        case ROOMSTATE_GETROOMS:
            return Object.assign({}, state, {
                rooms: action.payload.rooms
            });
        case ROOMSTATE_CREATEROOM:
            return Object.assign({}, state, {
                rooms: [...state.rooms, action.payload.room]
            })
        case ROOMSTATE_JOINROOM:
            return Object.assign({}, state, {
                name: action.payload.name
            });
        case ROOMSTATE_LEAVEROOM:
            return Object.assign({}, state, {
                name: ''
            });
        default:
            return state;

    }


}

