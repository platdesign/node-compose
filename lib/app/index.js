'use strict';

const path = require('path');
const fs = require('fs');
const colors = require('colors');
const Yaml = require('js-yaml');
const utils = require('./lib/utils');

const Image = require('./lib/image');


class App {



	constructor(config) {

		// assign given config
		this._config = config;

		// image store
		this._images = {};

		this.utils = utils;

		// use console.log as default logger
		this._logger = console.log.bind(console);

		// Load config file
		this.updateImageConfig( this.loadConfigFile() );

	}



	registerLogger(logger) {
		this._logger = logger;
	}



	log() {
		this._logger.apply(null, arguments);
	}



	loadConfigFile() {
		const composeFileName = this._config.configFile || 'node-compose.yml';
		const composeFilePath = path.resolve(this._config.CWD, composeFileName);
		const relativeComposeFilePath = path.relative(this._config.CWD, composeFilePath);

		if(!fs.existsSync( composeFilePath )) {
			return this.exit(('File not found: '.red + composeFilePath));
		}

		let config;
		try {
			this.log('Reading file: '.cyan + relativeComposeFilePath);
			config = Yaml.safeLoad( fs.readFileSync(composeFilePath, 'utf8') );
		} catch(e) {
			return this.exit('Invalid yaml file.'.red);
		}

		return config;
	}



	updateImageConfig(config) {
		Object.keys(config).forEach(function (name) {

			let conf = config[name];

			if(this._images[name]) {
				this._images[name].updateConfig(conf);
			} else {
				this.initImageAndAddToStore(name, conf);
			}

		}.bind(this));
	}


	initImageAndAddToStore(name, config) {
		const image = Image(name, config);
		this._images[name] = image;
		return image;
	}


	removeImageFromStore(name) {
		if(this._images[name]) {
			this._images[name].clean();
			delete this._images[name];
		}
	}


	exit(reason) {
		this.log(reason);
		process.exit(1);
	}


}





module.exports = function(config) {
	const app = new App(config);

	app.commands = {
		ps: requireCommand(app, 'ps'),
		reload: requireCommand(app, 'reload'),
		start: requireCommand(app, 'start'),
		stop: requireCommand(app, 'stop'),
		restart: requireCommand(app, 'restart'),
		images: requireCommand(app, 'images'),
	};

	return app;
};







function requireCommand(app, name) {

	const cmd = require(path.join(__dirname, 'commands', name));

	return function() {
		return Promise.resolve( cmd.apply(app, arguments) )
	}
}
