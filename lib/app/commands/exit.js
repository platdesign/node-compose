'use strict';


module.exports = function(args) {

	return this.commands.stop({
			image: 'all'
		})
		.then(() => {
			process.exit();
		});

}
