'use strict';


module.exports = function(args) {

	return this.close()
		.then(() => {
			process.exit();
		});

}
