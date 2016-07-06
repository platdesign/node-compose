'use strict';



class Image {

	constructor(name, config) {

	}

	start() {

	}

	stop() {

	}

	restart() {

	}

	clean() {

	}

}



module.exports = function(name, config) {
	const image = new Image(name, config);

	return image;
}
