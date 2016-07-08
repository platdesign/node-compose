'use strict';


module.exports = function(args) {
	let config = this.loadConfigFile();
	return this.updateImagesConfig(config);
}
