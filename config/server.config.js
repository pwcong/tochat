const isProd = process.env.NODE_ENV === 'production';

const port = isProd ? 80: 4000;

module.exports = isServer => {

    const doman = isServer ? '' : ( isProd ? '' : 'http://localhost:' + port);

    return ({
        port: port,
        url: {
            io: isProd ? '' : doman,
            login: doman + '/user/login',
            register: doman + '/user/register',
            modifyUser: doman + '/user/modify',
            getUserInfo: doman + '/userinfo',
            modifyUserInfo: doman + '/userinfo/modify',
            getRooms: doman + '/room',
            createRoom: doman + '/room/create'
        }
    })

}