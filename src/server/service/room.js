var LoggerFactory = require('../utils/LoggerFactory');
var LoggerUtils = require('../utils/LoggerUtils');

var response = require('../entity/response');

const 
	OK = 200,
	ERROR = 400;

const 
	logger = LoggerFactory.getLogger('RoomService'),
	infoer = LoggerUtils.infoer(logger),
	errorer = LoggerUtils.errorer(logger);
	
var RoomModel = require('../model/room');

exports.get = () => {

	return new Promise((resolve, reject) => {
		
        infoer('get start');

        RoomModel
            .find({
            })
            .then( rooms => {
                infoer('get success');
                resolve(response(OK, 'success', rooms));
            }).catch( err => {
                errorer(err);
                reject(response(ERROR, 'server error'));
            });
		
	});
}

exports.create = (room) => {

    return new Promise((resolve, reject) => {

        if(!room || !room.name || !room.intro){
            reject(response(ERROR, 'name and intro of room can not be empty'));
        }else{

            infoer('create start', room.name);

            RoomModel.findOne({
                name: room.name
            }).then( _room => {

                if(_room){

                    infoer('create failed', room.name, 'room is existed');
                    reject(response(ERROR, 'room is existed'));

                }else{
                    
                    var newRoom = new RoomModel({
                        name: room.name,
                        intro: room.intro
                    });

                    newRoom
                        .save()
                        .then( _newroom => {

                            if(_newroom){
                                infoer('create success', room.name);
                                resolve(response(OK, 'success', _newroom));
                            }else{
                                infoer('create failed', room.name, 'unknown error');
                                reject(response(ERROR, 'unknown error')); 
                            }
                        }).catch(err=>{
                            errorer(err);
                            reject(response(ERROR, 'server error'));
                        });
                }

            }).catch( err => {
                errorer(err);
                reject(response(ERROR, 'server error'));
            });

        }

    });


}
