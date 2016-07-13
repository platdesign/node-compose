'use strict';

const code = require('code');
const expect = code.expect;
const path = require('path');


module.exports = function(App) {

	describe('Testing defined image-scripts', () => {

		let app;

		before(() => {
			app = new App({
				CWD: path.join(__dirname, '..'),
				logger: function() {}
			});
		});


		describe('service-a', () => {

			it('should have method runScript', () => {
				let image = app._images['serviceA'];

				expect(image.runScript)
					.to.be.a.function();
			});



			it('should have one script defined', () => {
				let image = app._images['serviceA'];

				expect(image.config.scripts)
					.to.be.an.object()
					.and.have.length(1);

			});



			it('should execute script', () => {

				let image = app._images['serviceA'];

				image.runScript('test')

				expect(image.config.scripts)
					.to.be.an.object()
					.and.have.length(1);

			});



		});




	});


};
