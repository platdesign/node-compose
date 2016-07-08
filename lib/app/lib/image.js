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
		this.log(['verbose', 'state'], state);

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
				e.name = 'image:' + e.name;
				e.data._image = this;
				return e;
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

		if (!this.config.commands.start) {
			this.log(['error'], 'No start command found');
			return Promise.resolve();
		}

		if (this.state === 'starting') {
			this.log(['error'], 'Already starting');
			return Promise.resolve();
		}

		if (this.state === 'running') {
			this.log(['error'], 'Already running');
			return Promise.resolve();
		}

		if (this.state === 'stopping') {
			this.log(['error'], 'Cant start during stopping.');
			return Promise.resolve();
		}

		if (this.state !== 'idle') {
			this.log(['error'], 'Cant start. Not idle.');
			return Promise.resolve();
		}


		this._setState('starting');

		try {
			let p = this._startProcess();

			p.on('exit', (code) => {
				that._setState('idle');
			});

			this._setState('running');
		} catch (e) {
			this.log(['error'], e);
			this._setState('idle');
		}

		return Promise.resolve();
	}



	/**
	 * Stops the image. If its not running, it will log an error.
	 * @return {Object} Promise which resolves after stopping is completed.
	 */
	stop() {

		const that = this;

		if (this.state === 'starting') {
			this.log(['error'], 'Cant stop during start.');
			return Promise.resolve();
		}

		if (this.state === 'stopping') {
			this.log(['error'], 'Already stopping');
			return Promise.resolve();
		}

		if (this.state === 'idle') {
			this.log(['error'], 'Cant stop idle process.');
			return Promise.resolve();
		}

		if (this.state !== 'running') {
			this.log(['error'], 'Cant stop. Not running.');
			return Promise.resolve();
		}

		this._setState('stopping');

		return new Promise((resolve, reject) => {
			utils.killPID(that._process.pid, null, function() {
				that._process.on('exit', () => {

					/**
					 * Image-State is set to idle as soon as that._process emits an exit event.
					 * The handler for that is registered after starting to avoid state-inconsistency
					 * on unexpected process-exit.
					 */

					resolve();
				});
			});
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



	/**
	 * Reloads a new config. If image is running, it will be stopped before.
	 * @param  {Object} config new image config from node-compose.yml
	 * @return {Object}        Promise which resolves on completed.
	 */
	reload(config) {

		this.log(['verbose'], 'Reloading');

		if (this.state !== 'idle') {
			return this.stop().then(function() {
				this._configure(config);
				return this.start();
			}.bind(this));
		} else {
			this._configure(config);
			return Promise.resolve();
		}

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
	exit() {
		return this.clean();
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
			commands: this.config.commands
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
			}
		};

		this.emit('configured');
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
			env: this.config.environment
		});

		that._process = p;

		p.stdout.on('data', (payload) => {
			that.log(['log'], sanitizeProcessDataPayload(payload));
		});

		p.stderr.on('data', (payload) => {
			that.log(['error'], sanitizeProcessDataPayload(payload));
		});

		p.on('exit', (code) => {
			delete that._process;
		});

		return p;
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
 * Transform given string|buffer to whitespace-trimmed string
 * @param  {String|Buffer} data
 * @return {String}
 */
function sanitizeProcessDataPayload(data) {
	return (data || '').toString().replace(/^\s+|\s+$/g, '');
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
