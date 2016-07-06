'use strict';

// Deps
const Table = require('cli-table');
const colors = require('colors');
const psTree = require('ps-tree');


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





utils.killPID = function (pid, signal, callback) {
    signal   = signal || 'SIGKILL';
    callback = callback || function () {};
    var killTree = true;
    if(killTree) {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });
            callback();
        });
    } else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};



