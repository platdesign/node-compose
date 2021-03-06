'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('stop <image> [images...]', 'Stop an image by <name> or all')
		.autocomplete({
			data: function() {
				return app.imagesAsArray()
				.filter((image) => {
					return image.state === 'running';
				})
				.map((image) => {
					return image._name;
				})
			}
		})
		.action(function(args) {
			return app.commands.stop(args);
		});

};
