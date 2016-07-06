'use strict';

const colors = require('colors');

const stop = require('./stop');

module.exports = function(args) {

	return stop.bind(this)({image: 'all'})
	.then(() => {
		process.exit();
	});

}
