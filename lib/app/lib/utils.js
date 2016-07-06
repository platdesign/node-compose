'use strict';

// Deps
const Table = require('cli-table');
const colors = require('colors');


let utils = module.exports = {};



utils.createTableString = function(headers, rows) {

	let table = new Table({
		head: headers.map((item) => {
			return (item).cyan
		})
	});

	table.push.apply(table, rows);
	return table.toString();

};


utils.createTableView = function(title, headers, rows, footer) {
	return utils.createDefaultView(title, utils.createTableString(headers, rows), footer);
};


utils.createDefaultView = function(title, content, footer) {

	let res = '\n';

	if(title) {
		res += colors.bold(title) + '\n';
	}

	if(content) {
		res += content + '\n\n';
	}

	if(footer) {
		res += footer;
	}

	return res;
};

