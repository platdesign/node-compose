'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('stop <image> [images...]', 'Stop an image by <name> or all')
		.autocomplete(
			app.imagesAsArray()
			.filter((image) => {
				return image.isRunning;
			})
			.map((image) => {
				return image._name;
			})
		)
		.action(function(args) {
			return app.commands.stop(args);
		});

};
