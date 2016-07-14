'use strict';

// Third party deps
const path = require('path');
const fs = require('fs');
const colors = require('colors');
const Yaml = require('js-yaml');
const rx = require('rx');

// Custom deps
const utils = require('./lib/utils');
const Image = require('./lib/image');


/**
 * Main app-class which handles main config and image-store.
 *
 * @param  {Object} config App configuration
 *
 * {
 * 	CWD: <exec path>,
 * 	configFile: <name of the yml file to use>,
 * 	logger: <function which handles logs for console output>
 * }
 *
 */
class App {

	constructor(config) {

		// add utils to instance for easy use
		// and to avoid loading it from different locations.
		this.utils = utils;

		// assign given config
		this._config = config;

		// image store
		this._images = {};

		// Add on/emit methods to instance
		utils.extendEvents(this, '_eventsSubject');

		// define observables
		this._defineObservables();

		// define which logger-method to use
		// if logger is not available in given config us console.log
		this._logger = config.logger || console.log.bind(console);

		// subscribe logger to logs observable
		this.observables.logs.subscribe(function(msg) {
			this._logger(colors.green('[ ' + msg.tags.join(', ') + ' ] ') + msg.data);
		}.bind(this));

		// define vorpal command handlers
		this._defineCommands();

		// Load config file
		this.updateImagesConfig(this.loadConfigFile());

	}


	getState() {

		return utils.object2array(this._images)
			.reduce((acc, image) => {
				acc[image._name] = image.getState();
				return acc;
			}, {});

	}


	/**
	 * Helper to tranform current images-store to array
	 * @return {Array} Array of images
	 */
	imagesAsArray() {
		return Object.keys(this._images).map(function(name) {
			return this._images[name];
		}.bind(this));
	}


	/**
	 * helper to send new log entry to log observable
	 * @param  {Array} tags
	 * @param  {All} data Data which should be logged
	 * @return {Void}
	 */
	log(tags, data) {
		this.observables.logs.onNext({
			tags: tags,
			data: data,
			createdAt: Date.now()
		});
	}



	/**
	 * Loads config file and returns config object
	 *
	 * 1. Use configFile of this._config - otherwise use node-compose.yml
	 * 2. Check if file exists at given CWD
	 * 3. Load and parse yml to object
	 *
	 * @return {Object} config
	 */
	loadConfigFile() {
		const composeFileName = this._config.configFile || 'node-compose.yml';
		const composeFilePath = path.resolve(this._config.CWD, composeFileName);
		const relativeComposeFilePath = path.relative(this._config.CWD, composeFilePath);

		if (!fs.existsSync(composeFilePath)) {
			return this.exit(('File not found: '.red + composeFilePath));
		}

		let config;
		try {
			this.log(['verbose'], 'Reading file: '.cyan + relativeComposeFilePath);
			config = Yaml.safeLoad(fs.readFileSync(composeFilePath, 'utf8'));
		} catch (e) {
			return this.exit('Invalid yaml file.'.red);
		}

		return config;
	}



	/**
	 * Iterate trough given config and update/create image instances.
	 * @param  {Object} config parsed config file
	 * @return {Promise}       which resolves when all images are ready.
	 */
	updateImagesConfig(config) {

		let promises = [];

		Object.keys(config).forEach(function(name) {

			let conf = config[name];

			if (this._images[name]) {
				promises.push(this._images[name].reload(conf));
			} else {
				this._initImageAndAddToStore(name, conf);
			}

		}.bind(this));

		return Promise.all(promises);
	}



	/**
	 * Returns image from store
	 * @param  {String} name image name
	 * @return {Object}      instance of Image
	 */
	getImageByName(name) {
		if (!this._images[name]) {
			throw new Error(`Image '${name}' not found`);
		}

		return this._images[name];
	}



	/**
	 * Tries to get all requested images by given names.
	 * If an image is not found it will log an error.
	 * @param  {Array} nameArr Strings of image names
	 * @return {Array}         Image instances
	 */
	expectImagesByNameArray(nameArr) {
		return (nameArr || [])
			.map(function(name) {
				try {
					return this.getImageByName(name);
				} catch (e) {
					this.log(['error'], e.message);
				}
			}.bind(this))
			.filter(Boolean);
	}



	/**
	 * Exit the app with given reason (process will be exited)
	 * @param  {String} reason
	 * @return {Void}
	 */
	exit(reason) {
		this.close();
		this.log(['exit'], reason);
		process.exit(1);
	}

	close() {

		return Promise.all(
			utils.object2array(this._images)
				.map((image) => {
					return image.close();
				})
		);

	}

	/**
	 * Registers some observables to this.observables
	 * @return {Void}
	 */
	_defineObservables() {

		let obs = this.observables = {};

		// Logs
		obs.logs = new rx.ReplaySubject(100);

		// Events
		obs.events = this._eventsSubject;

	}



	/**
	 * Loads and registers command handlers for vorpal to this.commands
	 * @return {Void}
	 */
	_defineCommands() {

		this.commands = {
			ps: requireCommand(this, 'ps'),
			reload: requireCommand(this, 'reload'),
			start: requireCommand(this, 'start'),
			stop: requireCommand(this, 'stop'),
			restart: requireCommand(this, 'restart'),
			images: requireCommand(this, 'images'),
			monitor: requireCommand(this, 'monitor'),
			'start-script': requireCommand(this, 'start-script'),
			'stop-script': requireCommand(this, 'stop-script'),
			exit: requireCommand(this, 'exit'),
		};

	}



	/**
	 * Create Image instance and add to store.
	 * @param  {String} name   Image ID
	 * @param  {Object} config Config of image from parsed config file
	 * @return {Object}        Instance of Image
	 */
	_initImageAndAddToStore(name, config) {
		return this._images[name] = Image(this, name, config);
	}


}


/**
 * Init function to create new instance of app
 * @param  {Object} config will be passed directly to App constructor
 * @return {Object}        instance of App
 */
module.exports = function Init(config) {
	return new App(config);
};


/**
 * Helper to load a command-handler,
 * bind app to it and wrap its result into a promise
 * @param  {Object} app  instance of app
 * @param  {String} name name of command-handler-file
 * @return {Function}    Command function
 */
function requireCommand(app, name) {

	const cmd = require(path.join(__dirname, 'commands', name));

	return function() {
		return Promise.resolve(cmd.apply(app, arguments))
	}
}
