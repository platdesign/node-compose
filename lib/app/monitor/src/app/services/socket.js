'use strict';

var angular = require('angular');
var SocketIo = require('socket.io-client');


var mod = module.exports = angular.module('socket', [
	'rx'
]);



mod.service('socket', function(rx) {

	var socket = SocketIo();

	var onevent = socket.onevent;
	socket.onevent = function (packet) {
		var args = packet.data || [];
		onevent.call (this, packet);    // original call
		packet.data = ["*"].concat(args);
		onevent.call(this, packet);      // additional call to catch-all
	};

	var _rx = this.rx = new rx.Subject();
	var _tx = this.tx = new rx.Subject();

	socket.on('*',function(channel, data) {
		_rx.onNext({
			channel: channel,
			data: data
		})
	});


	_tx.subscribe(function(msg) {
		console.log(msg);
		socket.emit(msg.channel, msg.data);
	});


	this.channelObservable = function(name) {
		return _rx.filter(function(e) {
			return e.channel = name;
		})
		.map(function(e) {
			return e.data;
		});
	};

	this.channelObserver = function(name) {
		return rx.Observer.create(function(data) {
			_tx.onNext({
				channel: name,
				data: data
			})
		});
	};

});
