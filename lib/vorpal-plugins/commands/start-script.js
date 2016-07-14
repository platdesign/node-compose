'use strict';


module.exports = function(vorpal, options) {

	const app = options.app;

	vorpal
		.command('start-script <image:script>', 'Start a script of an image')
		.autocomplete({
			data: function() {

				return app.imagesAsArray()
					.map((image) => {

						let scriptStates = image.getState().scripts;

						return Object.keys(scriptStates)
							.filter((name) => {
								return scriptStates[name] === 'idle';
							})
							.map((name) => {
								return image._name + ':' + name;
							});
					})
					.reduce((acc, val) => {
						return acc.concat(val);
					}, []);

			}
		})
		.action(function(args) {

			let splitted = args['image:script'].split(':');
			args.image = splitted[0];
			args.script = splitted[1];
			delete args['image:script'];

			return app.commands.startScript(args);
		});

};
