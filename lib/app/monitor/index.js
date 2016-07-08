'use strict';

// Third party deps
const Hapi = require('hapi');
const SocketIo = require('socket.io');
const path = require('path');
const rx = require('rx');

// Custom deps
const Session = require('./lib/session');
const Connection = require('./lib/connection');



module.exports = function(app, options) {

	const server = new Hapi.Server();

	server.connection({
		host: options.host || '127.0.0.1',
		port: options.port || 9669
	});

	const io = SocketIo(server.connections[0].listener, {
		serveClient: true,
		log: true
	});


	io.on('connection', (socket) => {

		const session = new Session.SocketIoSession();

		session.bindSocket(socket, 'ddp');

		Connection(app, session);

	});



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

	return server;

};




















