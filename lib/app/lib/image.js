'use strict';

const path = require('path');
const which = require('which');
const spawn = require('child_process').spawn;
const usage = require('pidusage'); // For cpu-monitoring
const rx = require('rx');
//const nodemon = require('nodemon');


class Image {

	constructor(app, name, config) {
		this._app = app;
		this._name = name;
		this.isRunning = false;

		this.usage = new rx.BehaviorSubject();

		this.events = new rx.Subject();

		this.updateConfig(config);
	}


	on(name, handler) {
		let sub = this.events.filter((e) => {
			return e.name === name;
		})
		.subscribe((e) => {
			handler(e.data);
		});

		return function() {
			sub.dispose();
		};
	}

	emit(name, data) {
		this.events.onNext({
			name: name,
			data: data
		});
	}

	subscribeEvents(handler) {
		const that = this;
		let sub = this.events.map((e) => {
			return {
				image: that._name,
				event: e
			}
		})
		.subscribe(handler);

		this.on('cleanup', () => {
			sub.dispose();
		});
	}

	log(tags, data) {
		this.emit('log', {
			tags: tags,
			data: data
		});

		tags.push('#image', this._name);
		return this._app.log(tags, data);
	}

	_getAbsBuildPath() {
		return path.resolve(this._app._config.CWD, this._config.build);
	}

	_getRelBuildPath() {
		return path.relative(this._app._config.CWD, this._getAbsBuildPath());
	}

	updateConfig(config) {
		if(this.isRunning) {
			return this.stop().then(function() {
				this._config = config;

				return this.start();
			}.bind(this));
		} else {
			this._config = config;
			return Promise.resolve();
		}
	}


	start() {

		if(this.isRunning) {
			this.log(['error'], 'Already running');
			return Promise.resolve();
		}

		this.log(['verbose'], 'Starting ...');

		this._startProcess();

		return Promise.resolve()
		.then(function(res) {
			this.log(['log'], 'Running');
			return res;
		}.bind(this))
	}

	stop() {
		const that = this;

		if(!this.isRunning) {
			this.log(['error'], 'Not running');
			return Promise.resolve();
		}

		this.log(['verbose'], 'Stopping ...');
		return new Promise((resolve, reject) => {
			that._app.utils.killPID(that._process.pid, null, function() {
				that._process.on('exit', () => {
					resolve();
				});
			});
		})
		.then(function(res) {
			this.log(['log'], 'Stopped');
			return res;
		}.bind(this))

	}

	restart() {
		if(!this.isRunning) {
			this.log(['error'], 'Not running');
			return Promise.resolve();
		}

		return this.stop().then( this.start.bind(this) );
	}


	_startProcess() {

		const that = this;

		const env = (this._config.environment || [])
			.map((item) => {
				return item.split('=');
			})
			.reduce((res, item)=>{
				res[item[0]] = item[1];
				return res;
			}, Object.create(process.env));



		const cwd = this._getAbsBuildPath();

		that.isRunning = true;

		const p = spawn(which.sync('nodemon'), ['-x', which.sync('node'), cwd], {
			cwd: cwd,
			env: env
		});

		// const p = spawn(which.sync('node'), ['.'], {
		// 	cwd: cwd,
		// 	env: env
		// });


		this.emit('running', true);


		that._process = p;



		p.stdout.on('data', (payload) => {
			that.log(['log'], sanitizeProcessDataPayload(payload));
		});

		p.stderr.on('data', (payload) => {
			that.log(['error'], sanitizeProcessDataPayload(payload));
		});

		p.on('exit', (code) => {
			that.emit('running', false);
			that.isRunning = false;
			delete that._process;
		});





		return p;

	}



	clean() {
		this.emit('cleanup');
		return this.stop();
	}

}


function sanitizeProcessDataPayload(data) {
	return (data || '').toString().replace(/^\s+|\s+$/g, '');
}


module.exports = function(app, name, config) {
	const image = new Image(app, name, config);

	return image;
}
