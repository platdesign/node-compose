'use strict';


var angular = require('angular');
require('rx-angular');


var mod = module.exports = angular.module('app', [

	require('angular-ui-router'),
	require('angular-moment'),
	'rx',


	require('./modules/ansi').name,
	require('./modules/rx-ext').name,


	require('./services/socket').name,
	require('./services/data').name,
	require('./services/cmd').name,

	require('./directives/log-monitor').name,
	require('./directives/image-status').name,
	require('./directives/image-controls').name,
	require('./directives/image-script-controls').name,

	require('./directives/script-button').name,

	require('./states').name,
]);

mod.value('config', {

});



mod.run(function(socket, $data) {

	var ddpRx = socket.channelObservable('ddp');
	var ddpTx = socket.channelObserver('ddp');

	ddpRx
	.subscribe(function(e) {

		if(e.type === 'collection') {

			if(e.method === 'add' || e.method === 'update') {

				$data.collection(e.collection).push(e.id, e.model);
			}

		}
	});

});


