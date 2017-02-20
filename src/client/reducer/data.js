import {
    DATA_RECEIVE_MSG_FROM_ROOM
} from '../actions/data'

export const INITIAL_STATE = {
    roomMessage: {
        // 'name': [ { dateTime, uid, avatar, msg} ]
    },
    userMessage: {
        // 'uid': [ { dateTime, msg }]
    }
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){

        case DATA_RECEIVE_MSG_FROM_ROOM:
            return Object.assign({}, state, {
                roomMessage: Object.assign({}, state.roomMessage, {
                    [action.payload.room]: state.roomMessage[action.payload.room] ? [...state.roomMessage[action.payload.room], {
                        dateTime: action.payload.dateTime,
                        uid: action.payload.uid,
                        avatar: action.payload.avatar,
                        msg: action.payload.msg
                    }] : [{
                        dateTime: action.payload.dateTime,
                        uid: action.payload.uid,
                        avatar: action.payload.avatar,
                        msg: action.payload.msg
                    }]
                })
            });

        default:
            return state;

    }

}