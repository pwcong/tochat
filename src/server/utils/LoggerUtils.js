exports.tracer = logger => {

	return (head, msg, err) => {

		logger.trace(format(head, msg, err));

	}

} 

exports.debuger = logger => {

	return (head, msg, err) => {

		logger.debug(format(head, msg, err));

	}

} 

exports.infoer = logger => {

	return (head, msg, err) => {

		logger.info(format(head, msg, err));

	}

} 

exports.warnner = logger => {

	return (head, msg, err) => {

		logger.warn(format(head, msg, err));

	}

} 

exports.errorer = logger => {

	return err => {

		logger.error(err);

	}

} 

exports.fataler = logger => {

	return fatal => {

		logger.fatal(fatal);

	}

} 

function format(head, msg, err){

	return (head + ' ===> ' + msg + (err ? (' ---> ' + err) : ''));

}