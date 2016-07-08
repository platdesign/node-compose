'use strict';

const code = require('code');
const expect = code.expect;
const path = require('path');


module.exports = function(App) {

	describe('Testing start command configuration', () => {

		let app;

		before(() => {
			app = new App({
				CWD: path.join(__dirname, '..'),
				logger: function() {}
			});
		});

		describe('service-a (with command attr)', () => {

			it('should have start command: node server.js', () => {
				let image = app._images['serviceA'];

				expect(image.config.commands.start)
					.to.be.a.string()
					.and.equal('node server.js');
			});

		});



		describe('service-b (no command)', () => {

			it('should have empty start command', () => {
				let image = app._images['serviceB'];

				expect(image.config.commands.start)
					.to.be.a.string()
					.and.to.be.empty()
			});

		});



		describe('service-c (found index.js)', () => {

			it('should have start command: node .', () => {
				let image = app._images['serviceC'];

				expect(image.config.commands.start)
					.to.be.a.string()
					.and.equal('node .');
			});

		});


		describe('service-d (start script command from package.json)', () => {

			it('should have start command: node run.js', () => {
				let image = app._images['serviceD'];

				expect(image.config.commands.start)
					.to.be.a.string()
					.and.equal('node run.js');
			});

		});


	});


};
