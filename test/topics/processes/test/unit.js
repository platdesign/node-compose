'use strict';

const code = require('code');
const expect = code.expect;
const path = require('path');


module.exports = function(App) {

	describe('expected process handling', () => {

		let app;
		let image;

		beforeEach(() => {
			app = new App({
				CWD: path.join(__dirname, '..'),
				logger: function() {}
			});

			image = app._images['service'];



		});

		afterEach(() => {
			app.close();
		});



		describe('service', () => {

			it('should stop all processes on app.close()', () => {

				return Promise.all([
					image.start(),
					image.startScript('long')
				])
				.then(() => {
					return app.close()
				})
				.then(() => {

					expect(image.imageProcess.getState())
						.to.equal('idle');

					expect(image.scriptProcesses['long'].getState())
						.to.equal('idle');

				});

			});



			it('should stop all processes on config-reload and start previously running ones again', () => {

				return Promise.all([
					image.start(),
					image.startScript('long')
				])
				.then(() => {
					return app.commands.reload();
				})
				.then(() => {

					console.log(app.getState());

				});

			});


		});




	});


};
