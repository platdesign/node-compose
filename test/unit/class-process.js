'use strict';

const code = require('code');
const expect = code.expect;
const path = require('path');
const rx = require('rx');


const Process = require('../../lib/app/lib/process');


module.exports = function() {

	describe('Class: Process', () => {



		it('should throw error on missing name', () => {

			let error;
			try {
				new Process();
			} catch(e) {
				error = e;
			}

			expect(error)
				.to.be.an.error();

			expect(error.message)
				.to.be.a.string()
				.and.equal('Missing name');

		});






		it('should throw error on missing command', () => {

			let error;
			try {
				new Process('test');
			} catch(e) {
				error = e;
			}

			expect(error)
				.to.be.an.error();

			expect(error.message)
				.to.be.a.string()
				.and.equal('Missing command');

		});








		it('should throw error on invalid cwd', () => {

			let error;
			try {
				new Process('test', 'ls -als', '/qweqweqweqwe');
			} catch(e) {
				error = e;
			}

			expect(error)
				.to.be.an.error();

			expect(error.message)
				.to.be.a.string()
				.and.equal('CWD not found');

		});







		it('should have env attribute which inherits from process.env', () => {

			let p = new Process('ls', 'ls -als');


			expect(p.env.__proto__)
				.to.be.an.object()
				.and.equal(process.env);

		});







		it('should have env attribute without given env-vars', () => {

			let p = new Process('ls', 'ls -als');

			expect(p.env)
				.to.be.an.object();

		});







		it('should have env attribute with given env-vars', () => {

			let p = new Process('ls', 'ls -als', __dirname, {
				NODE_ENV: 'production'
			});

			expect(p.env.NODE_ENV)
				.to.be.a.string()
				.and.equal('production');

		});







		it('should set name attribute', () => {
			let p = new Process('ls', 'ls -als');

			expect(p.name)
				.to.be.a.string()
				.and.equal('ls');

		});







		it('should set cmd attribute', () => {
			let p = new Process('ls', 'ls -als');

			expect(p.cmd)
				.to.be.a.string()
				.and.equal('ls -als');

		});







		it('should set cwd attribute', () => {
			let p = new Process('ls', 'ls -als', __dirname);

			expect(p.cwd)
				.to.be.a.string()
				.and.equal(__dirname);

		});






		it('should have method start()', () => {
			let p = new Process('ls', 'ls -als');

			expect(p.start)
				.to.be.a.function();
		});








		it('should have method stop()', () => {
			let p = new Process('ls', 'ls -als');

			expect(p.stop)
				.to.be.a.function();
		});







		it('should have method restart()', () => {
			let p = new Process('ls', 'ls -als');

			expect(p.restart)
				.to.be.a.function();
		});







		it('should have method getState()', () => {
			let p = new Process('ls', 'ls -als');

			expect(p.getState)
				.to.be.a.function();
		});







		it('should have logs observable', () => {

			let p = new Process('ls', 'ls -als');

			expect(p._logs)
				.to.be.an.instanceOf(rx.Subject);

			expect(p.logs)
				.to.be.an.object();

			expect(p.logs.subscribe)
				.to.be.a.function();

		});







		it('should have state observable', () => {

			let p = new Process('ls', 'ls -als');

			expect(p._state)
				.to.be.an.instanceOf(rx.BehaviorSubject);

			expect(p.state)
				.to.be.an.object();

			expect(p.state.subscribe)
				.to.be.a.function();

		});


















		it('start() on running should reject', () => {

			let p = new Process('ls', 'ls -als');

			return p.start()
				.then(() => {
					return p.start();
				})
				.catch((e) => {

					expect(e)
						.to.be.an.error();

					expect(e.message)
						.to.be.a.string()
						.and.equal('Not idle');

				});

		});








		it('start() on starting should reject', () => {

			let p = new Process('ls', 'ls -als');

			p.start();

			return p.start().catch((e) => {

				expect(e)
					.to.be.an.error();

				expect(e.message)
					.to.be.a.string()
					.and.equal('Not idle');

			});

		});







		it('start() on stopping should reject', () => {

			let p = new Process('ls', 'ls -als');

			return p.start()
				.then(() => {

					p.stop();

					return p.start();
				})
				.catch((e) => {

					expect(e)
						.to.be.an.error();

					expect(e.message)
						.to.be.a.string()
						.and.equal('Not idle');

				});

		});









		it('stop() on idle should reject', () => {

			let p = new Process('ls', 'ls -als');

			return p.stop()
				.catch((e) => {

					expect(e)
						.to.be.an.error();

					expect(e.message)
						.to.be.a.string()
						.and.equal('Not running');

				});

		});






		it('stop() on starting should reject', () => {

			let p = new Process('ls', 'ls -als');

			p.start();

			return p.stop()
				.catch((e) => {

					expect(e)
						.to.be.an.error();

					expect(e.message)
						.to.be.a.string()
						.and.equal('Not running');

				});

		});






		it('stop() on stopping should reject', () => {

			let p = new Process('ls', 'ls -als');

			return p.start()
				.then(() => {

					p.stop();

					return p.stop();
				})
				.catch((e) => {

					expect(e)
						.to.be.an.error();

					expect(e.message)
						.to.be.a.string()
						.and.equal('Not running');

				});

		});





		it('restart() on running should restart', () => {

			let p = new Process('ls', 'ls -als');

			let states = [];

			p.state.subscribe((state) => {
				states.push(state);
			});

			return p.start()
				.then(() => {

					expect(p.getState())
						.to.be.a.string()
						.and.equal('running');

					let res = p.restart();

					expect(p.getState())
						.to.be.a.string()
						.and.equal('stopping');

					return res;
				})
				.then(() => {

					expect(p.getState())
						.to.be.a.string()
						.and.equal('running');


					expect(states)
						.to.equal([
							'idle',
							'starting',
							'running',
							'stopping',
							'idle',
							'starting',
							'running'
						]);


				});

		});





		it('restart() on idle should reject', () => {

			let p = new Process('ls', 'ls -als');

			return p.restart()
				.catch((e) => {

					expect(e)
						.to.be.an.error();

					expect(e.message)
						.to.be.a.string()
						.and.equal('Not running');

				});

		});




		it('should run through expected states during whole life cycle', () => {

			let p = new Process('ls', 'ls -als');

			let states = [];

			p.state
				.subscribe((state) => {
					states.push(state);
				});


			expect(p.getState())
				.to.be.a.string()
				.and.equal('idle');

			return p.start()
				.then(() => {

					expect(p.getState())
						.to.be.a.string()
						.and.equal('running');

					let res = p.stop();

					expect(p.getState())
						.to.be.a.string()
						.and.equal('stopping');

					return res;
				})
				.then(() => {

					expect(p.getState())
						.to.be.a.string()
						.and.equal('idle');

					expect(states)
						.to.have.length(5)
						.and.equal([
							'idle',
							'starting',
							'running',
							'stopping',
							'idle'
						]);

				});

		});




		it('should log with expected tags on start()', () => {

			let p = new Process('qwe', 'ls -als');

			let res = p.logs
			.take(2)
			.do((e) => {

				expect(e.tags)
					.to.be.an.array()
					.and.have.length(4)
					.and.contain(['verbose', 'log', 'qwe', '#process']);

			})
			.toPromise()

			p.start();

			return res;

		});



	});

}
