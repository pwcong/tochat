var index = require('../service/index');

module.exports = ctx => {

	return ({

		renderIndex(){
			ctx.body = index.getIndex();
		}

	})


}

