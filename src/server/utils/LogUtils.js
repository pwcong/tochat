require('fs-extra').emptyDirSync('./log');

const log4js = require('log4js');

if(process.env.NODE_ENV === 'production'){
	log4js.configure('./config/log4js.json');
	console.log("Load configuration for log4j.");	
}

module.exports = log4js;

