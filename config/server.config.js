const isProd = process.env.NODE_ENV === 'production';

module.exports = isServer => {

    const doman = isServer ? '' : ( isProd ? '' : 'http://localhost:4000')
    return ({
        port: isProd ? 80 : 4000,
        url: {
            io: isProd ? '' : 'http://localhost:4000',
            login: doman + '/user/login',
            register: doman + '/user/register',
            modifyUser: doman + '/user/modify',
            getUserInfo: doman + '/userinfo/get',
            modifyUserInfo: doman + '/userinfo/modify',
            getRooms: doman + '/room',
            createRoom: doman + '/room/create'
        }
    })

}