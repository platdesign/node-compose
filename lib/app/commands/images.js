'use strict';


module.exports = function(args) {

	let headers = ['No', 'Name', 'Path'];

	let rows = this.imagesAsArray().map((image, $index) => {
		return [$index+1, image._name, image._getRelBuildPath()];
	});


	this.log(['#stdout'],	this.utils.createTableView('Images', headers, rows));

}
