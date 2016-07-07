'use strict';

const Hapi = require('hapi');
const SocketIo = require('socket.io');
const path = require('path');
const rx = require('rx');

module.exports = function(app, options) {

	const server = new Hapi.Server();


	server.connection({
		host: '127.0.0.1',
		port: options.port || 9669
	});


	const io = SocketIo(server.connections[0].listener, {
		serveClient: true,
		log: true
	});


	const logs = new rx.ReplaySubject();

	app._logs.subscribe(logs);


	io.on('connection', (socket) => {

		logs.subscribe(function(msg) {
			socket.emit('log', msg);
		});

		socket.on('cmd', function(msg) {
			app.commands[msg.cmd](msg.args);
		});

	})



	server.register([

		// public files
		{
			register: require('inert'),
		},

	], (err) => {

		if(err) {
			return app.log(['error', 'monitor'], err);
		}

		server.route({
			method: 'GET',
			path: '/{param*}',
			handler: {
				directory: {
					path: path.join(__dirname, 'public'),
					listing: false
				}
			}
		});

		server.start((err) => {
			if(err) {
				app.log(['error', 'monitor'], err);
			}
			app.log(['log', 'monitor'], `Open monitor at ${server.info.uri}`);
		});

	});



};
