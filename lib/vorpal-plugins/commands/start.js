'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('start <image> [images...]', 'Start an image by <name> or all')
		.autocomplete(
			app.imagesAsArray()
			.filter((image) => {
				return !image.isRunning;
			})
			.map((image) => {
				return image._name;
			})
		)
		.action(function(args) {
			return app.commands.start(args);
		});

};
