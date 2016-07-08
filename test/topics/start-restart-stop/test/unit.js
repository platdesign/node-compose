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

			let logs = [];

			let stopStateListener = app.on('image:state', (e) => {
				logs.push(e._image._name + ':' + e._image.state);
			});

			return app.commands.start({
					image: 'all'
				})
				.then(() => {

					let allRunning = app.imagesAsArray()
						.every((image) => {
							return image.state === 'running';
						});

					expect(allRunning).to.equal(true);
					expect(logs).to.equal([
						'serviceA:starting',
						'serviceA:running',
						'serviceB:starting',
						'serviceB:running'
					]);

					stopStateListener();
				});

		});


		it('should restart all', () => {

			let logs = [];

			let stopStateListener = app.on('image:state', (e) => {
				logs.push(e._image._name + ':' + e._image.state);
			});

			return app.commands.restart({
					image: 'all'
				})
				.then(() => {

					let allRunning = app.imagesAsArray()
						.every((image) => {
							return image.state === 'running';
						});

					expect(allRunning).to.equal(true);

					expect(logs).to.equal([
						'serviceA:stopping',
						'serviceB:stopping',
						'serviceA:idle',
						'serviceA:starting',
						'serviceA:running',
						'serviceB:idle',
						'serviceB:starting',
						'serviceB:running'
					]);

					stopStateListener();
				});

		});


		it('should stop all', () => {

			let logs = [];

			let stopStateListener = app.on('image:state', (e) => {
				logs.push(e._image._name + ':' + e._image.state);
			});

			return app.commands.stop({
					image: 'all'
				})
				.then(() => {

					let allIdle = app.imagesAsArray()
						.every((image) => {
							return image.state === 'idle';
						});

					expect(allIdle).to.equal(true);
					expect(logs).to.equal([
						'serviceA:stopping',
						'serviceB:stopping',
						'serviceA:idle',
						'serviceB:idle'
					]);

					stopStateListener();
				});

		});

	});


};
