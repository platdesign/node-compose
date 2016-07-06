'use strict';


class Image {

	constructor(config) {
		this._config = config;
	}

	setConfig(config) {
		this._config = config;
	}

	start() {
		return Promsie.resolve();
	}

	stop() {
		return Promsie.resolve();
	}

	restart() {
		return this.stop().then(function() {
			return this.start();
		}.bind(this));
	}

}


module.exports = Image;
