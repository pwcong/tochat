var mongoose = require('mongoose');

const schema = mongoose.Schema({
	uid: String,
	pwd: String
});

const model = mongoose.model('user', schema);

module.exports = model;