'use strict';

const Image = require('./lib/image');



class ProcessManager {

	constructor() {

	}

	registerImage(name, config) {
		let image = new Image(name, config);
		this._images[name] = image;
		return image;
	}

	startById(id) {
		return Promise.resolve();
	}

	stopById(id) {
		return Promise.resolve();
	}

	restartById(id) {
		const that = this;
		return this.stopById(id)
		.then(() => {
			return that.startById(id);
		});
	}

}
