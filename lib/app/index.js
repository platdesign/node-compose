'use strict';

const path = require('path');
const fs = require('fs');
const colors = require('colors');
const Yaml = require('js-yaml');
const utils = require('./lib/utils');
const rx = require('rx');

const Image = require('./lib/image');


class App {

	constructor(config) {

		const that = this;

		// assign given config
		this._config = config;

		// image store
		this._images = {};

		this.utils = utils;

		// use console.log as default logger
		this._logger = console.log.bind(console);

		this._logs = new rx.ReplaySubject();

		this._logs.subscribe(function(msg) {
			that._logger( colors.green('[ '+msg.tags.join(', ') +' ] ') + msg.data );
		})

		this.events = new rx.Subject();

		// Load config file
		this.updateImagesConfig( this.loadConfigFile() );

	}

	imagesAsArray() {
		const that = this;
		return Object.keys(that._images).map((name) => {
			return that._images[name];
		});
	}

	registerLogger(logger) {
		this._logger = logger;
	}



	log(tags, data) {
		this._logs.onNext({
			tags: tags,
			data: data,
			createdAt: Date.now()
		});
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
			this.log(['verbose'], 'Reading file: '.cyan + relativeComposeFilePath);
			config = Yaml.safeLoad( fs.readFileSync(composeFilePath, 'utf8') );
		} catch(e) {
			return this.exit('Invalid yaml file.'.red);
		}

		return config;
	}



	updateImagesConfig(config) {

		let promises = [];

		Object.keys(config).forEach(function (name) {

			let conf = config[name];

			if(this._images[name]) {
				promises.push( this._images[name].updateConfig(conf) );
			} else {
				this.initImageAndAddToStore(name, conf);
			}

		}.bind(this));

		return Promise.all(promises);
	}


	initImageAndAddToStore(name, config) {
		const that = this;
		const image = Image(this, name, config);
		this._images[name] = image;

		image.subscribeEvents((e) => {
			that.events.onNext({
				name: 'image',
				data: e
			})
		});

		return image;
	}


	removeImageFromStore(name) {
		if(this._images[name]) {
			this._images[name].clean();
			delete this._images[name];
		}
	}

	getImage(name) {
		return this._images[name];
	}

	expectImageByName(name) {
		let image = this._images[name];

		if(!image) {
			this.log(['error'], `Image '${name}' not found`);
			return;
		}
		return image;
	}


	exit(reason) {
		this.log(['exit'], reason);
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
		monitor: requireCommand(app, 'monitor'),
		exit: requireCommand(app, 'exit'),

	};


	app.observables = {
		logs: app._logs,
		images: new rx.BehaviorSubject(app.imagesAsArray())
	};

	return app;
};







function requireCommand(app, name) {

	const cmd = require(path.join(__dirname, 'commands', name));

	return function() {
		return Promise.resolve( cmd.apply(app, arguments) )
	}
}
