'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('start <name>', 'Start an image by <name> or all')
		.action(function(args) {
			return app.commands.start(args);
		});

};
