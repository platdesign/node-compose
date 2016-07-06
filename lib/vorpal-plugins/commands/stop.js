'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('stop <name>', 'Stop an image by <name> or all')
		.action(function(args) {
			return app.commands.stop(args);
		});

};
