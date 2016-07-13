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

			it('asd', () => {

				return Promise.all([
					image.start(),
					image.startScript('long')
				])
				.then(() => {
					app.close();

					console.log('TODO: Test if all processes are down');

				})



			});

		});




	});


};
