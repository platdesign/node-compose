'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('start <image> [images...]', 'Start an image by <name> or all')
		.autocomplete({
			data: function() {
				return app.imagesAsArray()
				.filter((image) => {
					return image.state === 'idle';
				})
				.map((image) => {
					return image._name;
				})
			}
		})
		.action(function(args) {
			return app.commands.start(args);
		});

};
