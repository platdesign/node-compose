'use strict';

const colors = require('colors');

module.exports = function(args) {

	let headers = ['No', 'Name', 'Start', 'CWD', 'Status'];

	let rows = this.imagesAsArray().map((image, $index) => {

		let state;
		switch(image.state) {
			case 'idle':
				state = colors.gray('Idle');
			break;
			case 'running':
				state = colors.green('Running');
			break;
			case 'starting':
				state = colors.green('Starting');
			break;
			case 'stopping':
				state = colors.red('Stopping');
			break;
			default:
				state = colors.gray('Unknown');
			break;
		}

		return [
			$index+1,
			image._name,
			image.config.commands.start,
			image.config.cwd,
			state
		];
	});


	this.log(['#stdout'],	this.utils.createTableView('Images', headers, rows));

}
