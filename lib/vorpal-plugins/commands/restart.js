'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('restart <image> [images...]', 'Restart one or more images by given name or all')
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
			return app.commands.restart(args);
		});

};
