'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('reload', 'Reloads config file and restarts processes if needed.')
		.action(function(args) {
			return app.commands.reload(args);
		});

};
