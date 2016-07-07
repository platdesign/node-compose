'use strict';

const path = require('path');
const which = require('which');
const spawn = require('child_process').spawn;
const usage = require('pidusage'); // For cpu-monitoring
const rx = require('rx');
const extend = require('extend');
const fs = require('fs');
const utils = require('./utils');





class Image {



	constructor(app, name, config) {
		this._app = app;
		this._name = name;
		this.isRunning = false;

		utils.extendEvents(this, 'events');

		this._configure(config);
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


	reload(config) {
		const that = this;

		if(this.isRunning) {
			return this.stop().then(function() {
				that._configure(config);
				return this.start();
			}.bind(this));
		} else {
			that._configure(config);
			return Promise.resolve();
		}
	}



	clean() {
		this.emit('cleanup');
		return this.stop();
	}


	toObject() {
		return {
			id: this._name,
			config: this._config,
			absPath: this.config.cwd,
			relPath: this.config.relBuildPath,
			isRunning: this.isRunning
		}
	}




	_configure(config) {
		this._config = extend({}, config);
		this._loadPkgJson();

		this.config = {
			cwd: this._getCwd(),
			relBuildPath: this._getRelBuildPath(),

			environment: this._parseEnvironmentToObject( config.environment ),
			rawEnvironment: config.environment || [],

			commands: {
				start: this._getStartCommandString(),
				test: null
			}
		};
	}





	/**
	 * Transforms an array of env exports to an object based on process.env
	 * @param  {Array} data Array of env-exports
	 * @return {Object}     key-value pairs
	 *
	 * @example
	 * 	let input = ['NODE_ENV=development', 'PORT=4444']
	 *  let output = this._parseEnvironmentToIbject(input);
	 *
	 * 	{
	 * 		"NODE_ENV":"development",
	 * 		"PORT":"4444"
	 * 	}
	 */
	_parseEnvironmentToObject(data) {
		return (data || [])
			.map((item) => {
				return item.split('=');
			})
			.reduce((res, item)=>{
				res[item[0]] = item[1];
				return res;
			}, Object.create(process.env));
	}




	/**
	 * Starts the image process
	 * @return {Object} child_process
	 */
	_startProcess() {
		const that = this;

		const nodemonCmd = which.sync('nodemon');

		const args = ['-x'].concat(
			utils.parseCmdStringToArray(
				this.config.commands.start
			)
		);

		const p = spawn(nodemonCmd, args, {
			cwd: this.config.cwd,
			env: this.config.env
		});

		this.isRunning = true;
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



	_getCwd() {
		return path.resolve(this._app._config.CWD, this._config.build);
	}

	_getRelBuildPath() {
		return path.relative(this._app._config.CWD, this._getCwd());
	}

	_loadPkgJson() {
		let pkgPath = path.join(this._getCwd(), 'package.json');

		if(fs.existsSync(pkgPath)) {
			this.pkg = JSON.parse(fs.readFileSync( pkgPath, 'utf-8'));
		} else {
			this.pkg = void 0;
		}
		return this.pkg;
	}

	_getStartCommandString() {
		if(this._config.command) {
			return this._config.command;
		} else if(this.pkg && this.pkg.scripts && this.pkg.scripts.start) {
			return this.pkg.scripts.start;
		} else {
			return 'node .';
		}
	}

}






function sanitizeProcessDataPayload(data) {
	return (data || '').toString().replace(/^\s+|\s+$/g, '');
}


module.exports = function(app, name, config) {
	const image = new Image(app, name, config);

	return image;
}
