'use strict';

const code = require('code');
const expect = code.expect;
const path = require('path');


module.exports = function(App) {

	describe('Testing defined image-scripts', () => {

		let app;

		beforeEach(() => {
			app = new App({
				CWD: path.join(__dirname, '..'),
				logger: function() {}
			});
		});

		describe('service-a', () => {

			it('should have method startScript', () => {
				let image = app._images['serviceA'];

				expect(image.startScript)
					.to.be.a.function();
			});

			it('should have method stopScript', () => {
				let image = app._images['serviceA'];

				expect(image.stopScript)
					.to.be.a.function();
			});

			it('should have method restartScript', () => {
				let image = app._images['serviceA'];

				expect(image.restartScript)
					.to.be.a.function();
			});



			it('should have one script defined', () => {
				let image = app._images['serviceA'];

				expect(image.config.scripts)
					.to.be.an.array()
					.and.have.length(1);

			});



			it('should start/restart/stop script', () => {

				let image = app._images['serviceA'];

				return image.startScript('test')
					.then(() => {

						expect( image.scriptProcesses.test.getState() )
							.to.be.a.string()
							.and.equal('running');

						return image.restartScript('test');
					})
					.then(() => {

						expect( image.scriptProcesses.test.getState() )
							.to.be.a.string()
							.and.equal('running');

						return image.stopScript('test');
					})
					.then(() => {

						expect( image.scriptProcesses.test.getState() )
							.to.be.a.string()
							.and.equal('idle');

					});

			});





			it('should log with expected tags on startScript()', () => {

				let image = app._images['serviceA'];

				let res = image.on('log')
				.take(2)
				.do((e) => {

					expect(e.tags)
						.to.be.an.array()
						.contain(['#verbose', 'log', '#process', '#script', 'test']);

				})
				.toPromise();

				image.startScript('test');

				return res;

			});


			it('should log with expected tags on stopScript()', () => {

				let image = app._images['serviceA'];


				return image.startScript('test')
					.then(() => {

						let res = image.on('log')
						.take(2)
						.do((e) => {

							expect(e.tags)
								.to.be.an.array()
								.contain(['#verbose', 'log', '#process', '#script', 'test']);

						})
						.toPromise();

						image.stopScript('test');

						return res;

					})



			});



			it('script process should have same cwd as image', () => {

				let image = app._images['serviceA'];
				let proc = image.scriptProcesses.test;

				expect(image.config.cwd)
					.to.equal(proc.cwd);

			});

			it('image-process should have same cwd as image', () => {

				let image = app._images['serviceA'];
				let proc = image.imageProcess;

				expect(image.config.cwd)
					.to.equal(proc.cwd);

			});



		});




	});


};
