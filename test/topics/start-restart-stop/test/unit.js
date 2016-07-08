'use strict';

const code = require('code');
const expect = code.expect;
const path = require('path');


module.exports = function(App) {

	describe('Start - Restart - Stop with all', () => {

		let app;

		before(() => {
			app = new App({
				CWD: path.join(__dirname, '..'),
				logger: function() {}
			});
		});

		it('should start all', () => {

			return app.commands.start({
					image: 'all'
				})
				.then(() => {

					let allRunning = app.imagesAsArray()
						.every((image) => {
							return image.state === 'running';
						});

					expect(allRunning).to.equal(true);

				});

		});


		it('should restart all', () => {

			return app.commands.restart({
					image: 'all'
				})
				.then(() => {

					let allRunning = app.imagesAsArray()
						.every((image) => {
							return image.state === 'running';
						});

					expect(allRunning).to.equal(true);

				});

		});


		it('should stop all', () => {

			return app.commands.stop({
					image: 'all'
				})
				.then(() => {

					let allIdle = app.imagesAsArray()
						.every((image) => {
							return image.state === 'idle';
						});

					expect(allIdle).to.equal(true);

				});

		});

	});




	describe('Start - Restart - Stop with single service', () => {

		let app;

		before(() => {
			app = new App({
				CWD: path.join(__dirname, '..'),
				logger: function() {}
			});
		});

		it('should start serviceA', () => {

			let logs = [];

			let stopStateListener = app.on('image:state', (e) => {
				logs.push(e._image._name + ':' + e._image.state);
			});

			return app.commands.start({
					image: 'serviceA'
				})
				.then(() => {

					expect( app.getImageByName('serviceA').state ).to.equal('running');

					expect(logs).to.equal([
						'serviceA:starting',
						'serviceA:running'
					]);

					stopStateListener();
				});

		});


		it('should restart serviceA', () => {

			let logs = [];

			let stopStateListener = app.on('image:state', (e) => {
				logs.push(e._image._name + ':' + e._image.state);
			});

			return app.commands.restart({
					image: 'serviceA'
				})
				.then(() => {

					expect( app.getImageByName('serviceA').state ).to.equal('running');

					expect(logs).to.equal([
						'serviceA:stopping',
						'serviceA:idle',
						'serviceA:starting',
						'serviceA:running'
					]);

					stopStateListener();
				});

		});


		it('should stop serviceA', () => {

			let logs = [];

			let stopStateListener = app.on('image:state', (e) => {
				logs.push(e._image._name + ':' + e._image.state);
			});

			return app.commands.stop({
					image: 'serviceA'
				})
				.then(() => {

					expect( app.getImageByName('serviceA').state ).to.equal('idle');

					expect(logs).to.equal([
						'serviceA:stopping',
						'serviceA:idle',
					]);

					stopStateListener();
				});

		});

	});
};
