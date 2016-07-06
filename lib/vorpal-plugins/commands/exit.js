'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;


	vorpal.find('exit')
		.description('Closing shell and stop all images')
		.action(function(args) {
			return app.commands.exit(args);
		});


};
