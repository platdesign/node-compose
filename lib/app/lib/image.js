'use strict';

const path = require('path');
const which = require('which');
const spawn = require('child_process').spawn;
const usage = require('pidusage'); // For cpu-monitoring
const rx = require('rx');
const extend = require('extend');
const fs = require('fs');
const utils = require('./utils');
const Process = require('./process');


class Image {


	/**
	 * Constructor
	 * @param  {Object} app    App instance of node-compose
	 * @param  {String} name   ID of image
	 * @param  {Object} config image-config from node-compose.yml
	 * @return {Object}        self
	 */
	constructor(app, name, config) {
		this._app = app;
		this._name = name;
		this.state = 'idle';

		// Adds on&emit as methods to image instance
		utils.extendEvents(this, 'events');

		// connect this.events to apps events
		this._connectToAppEvents(app);

		// start initial configuration based on given config object
		this._configure(config);
	}


	getState() {

		return {
			image: this.imageProcess.getState(),
			scripts: utils.object2array( this.scriptProcesses )
				.map((pro) => {
					return function(acc) {
						acc[pro.name] = pro.getState();
					}
				})
				.reduce((acc, fn) => {
					fn(acc);
					return acc;
				}, {})
		}

	}


	/**
	 * Logger
	 * @param  {Array} tags  Tags to filter logs
	 * @param  {String|Object|Array|Number|Error} data Additional data which should be logged
	 */
	log(tags, data) {
		this.emit('log', {
			tags: tags,
			data: data
		});

		tags.push('#image', this._name);
		return this._app.log(tags, data);
	}



	/**
	 * Set one of following states:
	 *
	 * - starting
	 * - stopping
	 * - idle
	 * - running
	 *
	 * @param {String} state
	 */
	_setState(state) {
		this.state = state;
		this.emit('state', { state: state });

		switch (state) {
			case 'starting':
				this.log(['log'], 'Starting');
				break;
			case 'stopping':
				this.log(['log'], 'Stopping');
				break;
			case 'running':
				this.log(['log'], 'Running');
				break;
			case 'idle':
				this.log(['log'], 'Idle');
				break;
		}

	}



	/**
	 * Prefix image events with 'image' and subscribe stream to given app.
	 * @param  {Object} app Instance of App
	 * @return {Void}
	 */
	_connectToAppEvents(app) {

		var sub = this.events
			.map(function(e) {
				return extend(true, {}, e, {
					name: 'image:' + e.name,
					data: {
						_image: this
					}
				});
			}.bind(this))
			.subscribe(app._eventsSubject);

		this.on('cleanup', () => {
			sub.dispose();
		});

	}



	/**
	 * Starts the start-process of the image. If its already running, it will log an error.
	 * @return {Object} Promise which resolves after starting is completed.
	 */
	start() {

		const that = this;

		this.log(['#verbose'], 'Starting');

		return this.imageProcess
			.start()
			.catch((err) => {

				this.log(['#verbose'], 'Cant start');

				if(err.code === 2) {
					return this.log(['error'], 'Already starting');
				}

				if(err.code === 3) {
					return this.log(['error'], 'Already running');
				}

				if(err.code === 4) {
					return this.log(['error'], 'Cant start during stopping.');
				}

			});

	}



	/**
	 * Stops the image. If its not running, it will log an error.
	 * @return {Object} Promise which resolves after stopping is completed.
	 */
	stop() {

		return this.imageProcess
			.stop()
			.catch((err) => {

				if(err.code === 1) {
					return this.log(['error'], 'Cant stop idle process.');
				}

				if(err.code === 2) {
					return this.log(['error'], 'Cant stop during start.');
				}

				if(err.code === 4) {
					return this.log(['error'], 'Cant stop. Not running.');
				}

			});

	}



	/**
	 * Tries to restart the image.
	 * @return {Object} Promise which resolves on completed.
	 */
	restart() {

		if (this.state !== 'running') {
			this.log(['error'], 'Not running or during starting/stopping');
			return Promise.resolve();
		}

		return this.stop().then(this.start.bind(this));
	}



	startScript(name) {

		return this._getScriptProcessByName(name)
			.then((script) => {
				return script.start();
			});

	}


	stopScript(name) {
		return this._getScriptProcessByName(name)
			.then((script) => {
				return script.stop();
			});
	}

	restartScript(name) {
		return this._getScriptProcessByName(name)
			.then((script) => {
				return script.restart();
			});
	}




	_getScriptProcessByName(name) {
		if(!this.scriptProcesses[name]) {
			return Promise.reject( new Error(`Script ${name} not defined`));
		}

		return Promise.resolve( this.scriptProcesses[name] );
	}


	/**
	 * Reloads a new config. If image is running, it will be stopped before.
	 * @param  {Object} config new image config from node-compose.yml
	 * @return {Object}        Promise which resolves on completed.
	 */
	reload(config) {

		this.log(['#verbose'], 'Reloading');

		let state = this.getState();

		// TODO: implement, that scripts will restart after configure
		// if they were running at this time.

		// Get all scripts which are currently running
		let restartScripts = Object.keys(state.scripts)
			.filter((name) => {
				return state.scripts[name] === 'running';
			});

		// Stop running scripts
		return Promise.all(
			restartScripts
				.map(function(name) {
					return this.stopScript(name);
				}.bind(this))
		)

		// Stop image if running and reconfigure - start it again if it was running before
		.then(function() {

			if (state.image === 'running' || state.image === 'starting') {
				return this.stop()
					.then(function() {
						this._configure(config);
						return this.start();
					}.bind(this));
			} else {
				this._configure(config);
				return Promise.resolve();
			}

		}.bind(this))

		// Start before running scripts
		.then(function() {
			return Promise.all(
				restartScripts
					// Filter before running script to check if script is still available
					// after reconfiguration.
					// Maybe the package.json has changed and script command was removed.
					.filter(function(name) {
						return this.scriptProcesses[name];
					}.bind(this))
					// Start all left scripts
					.map(function(name) {
						return this.startScript(name);
					}.bind(this))
			)
		}.bind(this))

	}





	/**
	 * Clean up image and stop all running processes. Important before exit, close, etc.
	 * @return {Object} Promise which resolves on completed.
	 */
	clean() {
		this.emit('cleanup');
		return this.stop();
	}



	/**
	 * Executed on app-exit
	 * @return {Object} Promise which resolves on completed.
	 */
	close() {

		let stoppingProcesses = [this.imageProcess]
			.concat( utils.object2array(this.scriptProcesses) )
			.filter((pro) => {
				return pro.getState() === 'running';
			})
			.map((pro) => {
				return pro.stop();
			});



		return Promise.all(stoppingProcesses)
			.then(function() {
				this.emit('cleanup');
			}.bind(this));
	}



	/**
	 * Generates an object with information about the image.
	 * @return {Object}
	 */
	toObject() {

		let obj = {
			id: this._name,
			config: this._config,
			absPath: this.config.cwd,
			relPath: this.config.relBuildPath,
			isRunning: this.state === 'running',
			isIdle: this.state === 'idle',
			isStarting: this.state === 'starting',
			isStopping: this.state === 'stopping',
			state: this.state,
			commands: this.config.commands,
			scripts: Object.keys(this.scriptProcesses)
				.map(function(key) {
					let p = this.scriptProcesses[key];
					return function(acc) {
						acc[key] = {
							name: p.name,
							state: p.getState(),
							cmd: p.cmd
						}
					};
				}.bind(this))
				.reduce((acc, fn) => {
					fn(acc);
					return acc;
				}, {})
		};

		if(this.pkg) {
			obj.pkg = {
				name: this.pkg.name,
				description: this.pkg.description,
				version: this.pkg.version,
			}
		}

		return obj;
	}



	/**
	 * Configures the image based on given config (from yml file)
	 *
	 * @param  {Object} config yml-image-config
	 * @return {VOID}
	 */
	_configure(config) {

		this.emit('configure');

		this._config = extend({}, config);
		this._loadPkgJson();

		this.config = {
			cwd: this._getCwd(),
			relBuildPath: this._getRelBuildPath(),

			environment: this._parseEnvironmentToObject(config.environment),
			rawEnvironment: config.environment || [],

			commands: {
				start: this._getStartCommandString(),
				test: null
			},
			scripts: Object.keys(this.pkg && this.pkg.scripts || {})
		};


		this.imageProcess = this._createImageProcess();
		this.scriptProcesses = this._getScriptProcesses();

		this.emit('configured');
	}







	_createImageProcess() {

		let watcherCmd = this._config.nowatch ? [] : [which.sync('nodemon'), '-x'];

		let cmd = watcherCmd.concat(
			utils.parseCmdStringToArray(
				this.config.commands.start
			)
		).join(' ');

		let env = this.config.environment;
		let cwd = this.config.cwd;

		let p = new Process('#image', cmd, cwd, env);

		let state = p.state.subscribe(this._setState.bind(this));

		let logsSub = p.logs.subscribe(function(e) {
			e.tags = e.tags.concat(['#image']);
			this.log(e.tags, e.data);
		}.bind(this));

		// Dispose sub on reconfig to avoid unexpected state changes
		this.on('configure', () => {
			state.dispose();
			logsSub.dispose();
		});

		return p;
	}








	_createScriptProcess(name, cmd, cwd) {

		cmd = utils.parseCmdStringToArray( cmd ).join(' ');

		let p = new Process(name, cmd, cwd);

		let logsSub = p.logs.subscribe(function(e) {
			e.tags = e.tags.concat(['#script']);
			this.log(e.tags, e.data);
		}.bind(this));

		let stateSub = p.state.subscribe(function(e) {
			this.emit('script-state', e);
		}.bind(this));


		// Cleanup subs
		this.on(['cleanup', 'configure'], () => {
			p.stop();
			logsSub.dispose();
			stateSub.dispose();
		});

		return p;
	}



	_getScriptProcesses() {

		let processes = {};

		if(this.config.scripts) {
			this.config.scripts
				.filter((key) => {
					return ['start'].indexOf(key) === -1;
				})
				.forEach(function(key) {
					let cmd = which.sync('npm') + ' run -s ' + key;

					processes[key] = this._createScriptProcess(key, cmd, this.config.cwd);

				}.bind(this))
		}

		return processes;
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
			.reduce((res, item) => {
				let key = item.shift();
				res[key] = item.join('=');
				return res;
			}, Object.create(process.env));
	}




	/**
	 * Get absolute CWD of image
	 * @return {String}
	 */
	_getCwd() {
		return path.resolve(this._app._config.CWD, this._config.build);
	}



	/**
	 * Get relative CWD of image from origin of node-compose.yml
	 * @return {String}
	 */
	_getRelBuildPath() {
		return path.relative(this._app._config.CWD, this._getCwd());
	}



	/**
	 * Tries to load package.json from cwd
	 * @return {Object|undefined} content of package.json or undefined
	 */
	_loadPkgJson() {
		let pkgPath = path.join(this._getCwd(), 'package.json');

		if (fs.existsSync(pkgPath)) {
			this.pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
		} else {
			this.pkg = void 0;
		}

		return this.pkg;
	}



	/**
	 * Returns the start command as string based on
	 * - command attribute from image-config
	 * - start-script-command from package.json
	 * - otherwise: node .
	 *
	 * @return {String} Start command string
	 */
	_getStartCommandString() {

		let indexFile = path.join(this._getCwd(), 'index.js');

		if (this._config.command) {
			return this._config.command;
		} else if (this.pkg && this.pkg.scripts && this.pkg.scripts.start) {
			return this.pkg.scripts.start;
		} else if (fs.existsSync(indexFile)) {
			return 'node .';
		} else {
			this.log(['error'], 'Cand find a start command');
			return '';
		}

	}

}







/**
 * Image init method
 * @param  {Object} app    node-compose app instance
 * @param  {String} name   Name of the image
 * @param  {Object} config image config from node-compose.yml
 * @return {Object}        Instance of image
 */
module.exports = function(app, name, config) {
	return new Image(app, name, config);
};
