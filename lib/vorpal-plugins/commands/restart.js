'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('restart', 'Restart an image by <name> or all')
		.action(function(args) {
			return app.commands.restart(args);
		});

};
