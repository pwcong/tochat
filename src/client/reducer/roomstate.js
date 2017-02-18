import {
    ROOMSTATE_GETROOMS
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
            })
        default:
            return state;

    }


}

