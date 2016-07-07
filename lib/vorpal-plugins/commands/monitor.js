'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('monitor', 'Start web monitor')
		.action(function(args) {
			return app.commands.monitor(args);
		});

};
