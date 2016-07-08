'use strict';


var angular = require('angular');

var mod = module.exports = angular.module('app.cmd', []);


mod.service('$cmd', function(socket) {

	this.exec = function(cmd, args) {
		socket.tx.onNext({
			channel: 'ddp',
			data: {
				type: 'exec',
				cmd: 'command',
				params: {
					cmd: cmd,
					args: args
				}
			}
		});
	};

});

mod.run(function($cmd, $rootScope) {
	$rootScope.$cmd = $cmd;
});

