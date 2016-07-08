'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('monitor', 'Start web monitor')
		.option('-p, --port <port>', 'Bind to custom port. (Default: 9669)')
		.option('-h, --host <host>', 'Bind to custom host. (Default: 127.0.0.1)')
		.action(function(args) {
			return app.commands.monitor(args);
		});

};
