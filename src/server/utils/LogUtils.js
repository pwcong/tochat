const log4js = require('log4js');

try {
  require('fs').mkdirSync('./log');
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}

if(process.env.NODE_ENV === 'production'){
	log4js.configure('./config/log4js.json');
	console.log("Load configuration for log4j.");	
}

module.exports = log4js;

