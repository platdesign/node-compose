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

			describe('starting image and long-script', () => {


				beforeEach(() => {
					return Promise.all([
						app.commands.start({ image: 'service'}),
						app.commands.startScript({ image: 'service', script: 'long' })
					]);
				});

				it('image should have state: running', () => {

					expect(image.imageProcess.getState())
						.to.equal('running');

				});

				it('long-script should have state: running', () => {

					expect(image.scriptProcesses['long'].getState())
						.to.equal('running');

				});

				it('short-script should have state: idle', () => {

					expect(image.scriptProcesses['short'].getState())
						.to.equal('idle');

				});


				describe('after reloading', () => {

					beforeEach(() => {
						return app.commands.reload();
					});

					it('image should have state: running', () => {

						expect(image.imageProcess.getState())
							.to.equal('running');

					});

					it('long-script should have state: running', () => {

						expect(image.scriptProcesses['long'].getState())
							.to.equal('running');

					});

					it('short-script should have state: idle', () => {

						expect(image.scriptProcesses['short'].getState())
							.to.equal('idle');

					});

				});

				describe('after closing the app', () => {

					beforeEach(() => {
						return app.close();
					});

					it('image should have state: idle', () => {

						expect(image.imageProcess.getState())
							.to.equal('idle');

					});

					it('long-script should have state: idle', () => {

						expect(image.scriptProcesses['long'].getState())
							.to.equal('idle');

					});

					it('short-script should have state: idle', () => {

						expect(image.scriptProcesses['short'].getState())
							.to.equal('idle');

					});

				});


			});


		});




	});


};
