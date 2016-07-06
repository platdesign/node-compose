'use strict';


module.exports = function(args) {

	let headers = ['No', 'Name'];

	let rows = this.imagesAsArray()
	.filter((image) => {
		return image.isRunning;
	})
	.map((image, $index) => {
		return [$index+1, image._name];
	});


	this.log(['#stdout'],	this.utils.createTableView('Running images', headers, rows));

}
