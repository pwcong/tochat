import 'whatwg-fetch';
import Config from '../../../config/server.config';

const clientConfig = Config(false);

export const ROOMSTATE_GETROOMS = 'ROOMSTATE_GETROOMS';
export function getRooms(rooms){
    return ({
        type: ROOMSTATE_GETROOMS,
        payload: {
            rooms
        }
    });
}

export function toGetRooms(onStart, onSuccess, onFailed){

    return dispatch => {

        onStart();

		fetch(clientConfig.url.getRooms).then( res => {
			return res.json();
		}).then( json => {
			if(json.status === 200){
				dispatch(getRooms(json.result.rooms));
				onSuccess();
			}
			else
				onFailed(json.message);
			
		}).catch( err => {
			onFailed('server error');
		})

    }

}