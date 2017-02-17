const prod = process.env.NODE_ENV === 'production';

module.exports = {

    ioUrl: prod ? 'http://localhost' : 'http://localhost:4000',
    loginUrl: prod ? '/user/login' : 'http://localhost:4000/user/login',
    registerUrl: prod ? '/user/register' : 'http://localhost:4000/user/register',
    getUserInfoUrl: prod ? '/userinfo/get/' : 'http://localhost:4000/userinfo/get/',
    modifyUserInfoUrl: prod ? '/userinfo/modify' : 'http://localhost:4000/userinfo/modify'

}