var mongoose = require('mongoose');

const schema = mongoose.Schema({
	name: String,
	intro: String
});

const model = mongoose.model('room', schema);

module.exports = model;