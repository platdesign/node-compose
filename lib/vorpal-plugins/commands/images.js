'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('images', 'List all images found in config file.')
		.action(function(args) {
			return app.commands.images(args);
		});

};
