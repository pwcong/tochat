export const DATA_RECEIVE_MSG_FROM_ROOM = 'DATA_RECEIVE_MSG_FROM_ROOM';
export function receiveMsgFromRoom(room, dateTime, uid, avatar, msg){
    return ({
        type: DATA_RECEIVE_MSG_FROM_ROOM,
        payload: {
            room,
            dateTime,
            uid,
            avatar,
            msg
        }
    });
}

