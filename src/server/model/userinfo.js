var mongoose = require('mongoose');

const schema = mongoose.Schema({
	uid: String,
	nickname: String,
	sex: Number,
	email: String,
	github: String,
	avatar: String
});

const model = mongoose.model('userinfo', schema);

module.exports = model;