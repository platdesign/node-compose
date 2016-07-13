'use strict';

const code = require('code');
const expect = code.expect;
const path = require('path');


module.exports = function(App) {

	describe('Testing correct parsing and setting of environment variables', () => {

		let app;

		beforeEach(() => {
			app = new App({
				CWD: path.join(__dirname, '..'),
				logger: function() {}
			});
		});

		afterEach(() => {
			app.close();
		});

		describe('service-a', () => {

			it('should have 2 raw-environment vars', () => {

				let image = app._images['serviceA'];

				let arr = image.config.rawEnvironment;

				expect(arr)
					.to.be.an.array()
					.and.have.length(2);

				expect(arr[0])
					.to.be.a.string()
					.and.equal('NODE_ENV=production');

				expect(arr[1])
					.to.be.a.string()
					.and.equal('PORT=9001');

			});

			it('should have 2 parsed environment vars', () => {

				let image = app._images['serviceA'];

				let obj = image.config.environment;

				expect(obj)
					.to.be.an.object()
					.and.have.length(2);

				expect(obj['NODE_ENV'])
					.to.be.a.string()
					.and.equal('production');

				expect(obj['PORT'])
					.to.be.a.string()
					.and.equal('9001');

			});

		});


		describe('service-b', () => {

			it('should have an empry array of raw environment vars', () => {

				let image = app._images['serviceB'];

				expect(image.config.rawEnvironment)
					.to.be.an.array()
					.and.have.length(0);

			});

			it('should have empty object of parsed environment vars', () => {

				let image = app._images['serviceB'];

				expect(image.config.environment)
					.to.be.an.object()
					.and.have.length(0);

			});

		});


	});


};
