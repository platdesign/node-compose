'use strict';

// Deps
const Table = require('cli-table');
const colors = require('colors');
const psTree = require('ps-tree');
const which = require('which');
const rx = require('rx');


let utils = module.exports = {};



/**
 * Extends given object with two methods to emit and register (on) to events
 * @param  {Object} obj instance to register event system on
 * @param  {String} key private attribute which holds rx.Subject
 * @return {Void}
 */
utils.extendEvents = function(obj, key) {

	if (obj[key]) {
		throw new Error(`Key ${key} already exists.`);
	}

	// register subject
	obj[key] = new rx.Subject();


	// register method to create event listeners
	// if no handler is registered, the filterd observable is returned.
	//
	// If name is an array of strings, the event passes the filter if one of the items
	// matches the event name.
	obj.on = function(name, handler) {

		let observable = this[key].filter((e) => {

			if(Array.isArray(name)) {
				return name.some((name) => {
					return e.name === name;
				});
			}

			return e.name === name;
		});


		if(handler) {
			let sub = observable.subscribe((e) => {
				handler(e.data);
			});

			return function() {
				sub.dispose();
			};
		}

		return observable.map((e) => { return e.data; });
	};


	// register method to emit events
	obj.emit = function(name, data) {
		this[key].onNext({
			name: name,
			data: data || {}
		});
	};

};



/**
 * Transforms a given cl-string to array to use it with spawn.
 *
 * @param  {String} cmd       cl-string
 * @param  {Boolean} withWhich if false first command will not be replaced by "whiched" one
 * @return {Array}
 */
utils.parseCmdStringToArray = function(cmd, withWhich) {
	cmd = cmd.split(' ');
	if (withWhich !== false) {
		cmd[0] = which.sync(cmd[0]);
	}
	return cmd;
};



/**
 * Creates a string representing a table for console output
 * @param  {Array} headers Strings for header titles
 * @param  {Array} rows    Array of Arrays with row data
 * @return {String}
 */
utils.createTableString = function(headers, rows) {

	let table = new Table({
		head: headers.map((item) => {
			return (item).cyan
		})
	});

	table.push.apply(table, rows);
	return table.toString();

};



/**
 * Creates a console view with title, table and footer
 * @param  {String} title
 * @param  {Array} headers
 * @param  {Array} rows
 * @param  {String} footer
 * @return {String}
 */
utils.createTableView = function(title, headers, rows, footer) {
	return utils.createDefaultView(title, utils.createTableString(headers, rows), footer);
};



/**
 * Creates a console view with title, content, footer
 * @param  {String} title
 * @param  {String} content
 * @param  {String} footer
 * @return {String}
 */
utils.createDefaultView = function(title, content, footer) {

	let res = '\n';

	if (title) {
		res += colors.bold(title) + '\n';
	}

	if (content) {
		res += content + '\n\n';
	}

	if (footer) {
		res += footer;
	}

	return res;
};



/**
 * Kill process by given pid and signal
 * @param  {Number}   pid
 * @param  {String}   signal
 * @param  {Function} callback
 * @return {Void}
 */
utils.killPID = function(pid, signal, callback) {
	signal = signal || 'SIGKILL';
	callback = callback || function() {};
	var killTree = true;
	if (killTree) {
		psTree(pid, function(err, children) {
			[pid].concat(
				children.map(function(p) {
					return p.PID;
				})
			).forEach(function(tpid) {
				try {
					process.kill(tpid, signal)
				} catch (ex) {}
			});
			callback();
		});
	} else {
		try {
			process.kill(pid, signal)
		} catch (ex) {}
		callback();
	}
};
