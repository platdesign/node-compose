'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('ps', 'List running images')
		.action(function(args) {
			return app.commands.ps(args);
		});

};
