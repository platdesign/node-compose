'use strict';


module.exports = function(args) {

	let config = this.loadConfigFile();

	this.log(['log'], 'Updating images configuration.');

	return this.updateImagesConfig(config)
		.then(function(res) {
			this.log(['verbose'], 'All images up-to-date');
			return res;
		}.bind(this));

}
