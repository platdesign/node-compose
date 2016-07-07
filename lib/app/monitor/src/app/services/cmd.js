'use strict';


var angular = require('angular');

var mod = module.exports = angular.module('app.cmd', []);


mod.service('$cmd', function(socket) {

	this.exec = function(cmd, args) {
		console.log(cmd)
		socket.tx.onNext({
			channel: 'cmd',
			data: {
				cmd: cmd,
				args: args
			}
		});
	};

});

mod.run(function($cmd, $rootScope) {
	$rootScope.$cmd = $cmd;
});

