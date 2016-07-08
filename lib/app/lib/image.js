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

		this.isRunning = false;

		// Adds on&emit as methods to image instance
		utils.extendEvents(this, 'events');

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



	/**
	 * Starts the start-process of the image. If its already running, it will log an error.
	 * @return {Object} Promise which resolves after starting is completed.
	 */
	start() {

		if (this.isRunning) {
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



	/**
	 * Stops the image. If its not running, it will log an error.
	 * @return {Object} Promise which resolves after stopping is completed.
	 */
	stop() {
		const that = this;

		if (!this.isRunning) {
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



	/**
	 * Tries to restart the image.
	 * @return {Object} Promise which resolves on completed.
	 */
	restart() {
		if (!this.isRunning) {
			this.log(['error'], 'Not running');
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
		const that = this;

		if (this.isRunning) {
			return this.stop().then(function() {
				that._configure(config);
				return this.start();
			}.bind(this));
		} else {
			that._configure(config);
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
	 * Generates an object with information about the image.
	 * @return {Object}
	 */
	toObject() {
		return {
			id: this._name,
			config: this._config,
			absPath: this.config.cwd,
			relPath: this.config.relBuildPath,
			isRunning: this.isRunning
		}
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
		if (this._config.command) {
			return this._config.command;
		} else if (this.pkg && this.pkg.scripts && this.pkg.scripts.start) {
			return this.pkg.scripts.start;
		} else {
			return 'node .';
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
