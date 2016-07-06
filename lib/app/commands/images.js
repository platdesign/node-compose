'use strict';

const colors = require('colors');

module.exports = function(args) {

	let headers = ['No', 'Name', 'Path', 'Status'];

	let rows = this.imagesAsArray().map((image, $index) => {
		return [$index+1, image._name, image._getRelBuildPath(), image.isRunning ? colors.green('Running') : colors.gray('Off')];
	});


	this.log(['#stdout'],	this.utils.createTableView('Images', headers, rows));

}
