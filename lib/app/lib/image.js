'use strict';

const path = require('path');


class Image {

	constructor(app, name, config) {
		this._app = app;
		this._name = name;
		this.isRunning = false;

		this.updateConfig(config);
	}

	log(tags, data) {
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
		this.isRunning = true;
		return Promise.resolve()
		.then(function(res) {
			this.log(['log'], 'Running');
			return res;
		}.bind(this))
	}

	stop() {

		if(!this.isRunning) {
			this.log(['error'], 'Not running');
			return Promise.resolve();
		}

		this.log(['verbose'], 'Stopping ...');
		this.isRunning = false;
		return Promise.resolve()
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

	clean() {

	}

}



module.exports = function(app, name, config) {
	const image = new Image(app, name, config);

	return image;
}
