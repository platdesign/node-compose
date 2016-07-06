'use strict';


module.exports = function(args) {

	const images = this._images;

	let headers = ['No', 'Name', 'Path'];

	let rows = Object.keys(images).map((name, $index) => {
		let image = images[name];

		return [$index+1, name];
	});


	this.log(
		this.utils.createTableView('Images', headers, rows)
	);

}
