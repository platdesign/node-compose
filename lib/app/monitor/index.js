'use strict';

// Third party deps
const Hapi = require('hapi');
const socketIo = require('socket.io');
const path = require('path');
const ctxq = require('ctxq');


// Custom deps
const Session = require('./lib/session');
const connection = require('./lib/connection');





module.exports = function createServer(app, options) {

	// Init Hapi-Server instance
	const server = new Hapi.Server();



	// Add connection
	let conn = server.connection({
		host: options.host || '127.0.0.1',
		port: options.port || 9669
	});



	// Bind socketIO instance to connection listener
	const io = socketIo(conn.listener, {
		serveClient: true,
		log: true
	});




	io.on('connection', (socket) => {

		const session = new Session.SocketIoSession();

		session.bindSocket(socket, 'ddp');

		connection(app, session);

	});




	// Create a promised context-q
	return ctxq()

		// Register inert as asset-server
		.push(() => server.register(require('inert')))
		.push(() => server.register(require('h2o2')))

		.push(() => {


			let assetsRouteHandler;
			let externalAssetServer = process.env.ASSET_SERVER;

			// webpack-dev-server
			if(externalAssetServer) {
				assetsRouteHandler = {
					proxy: {
						uri: `${externalAssetServer}/{param}`,
						passThrough: true,
						localStatePassThrough: true
					}
				};
			} else {
				assetsRouteHandler = {
					directory: {
						path: path.join(__dirname, 'public'),
						redirectToSlash: false,
						index: false
					}
				};
			}


			// Define assets route based on assetsRouteHandler
			server.route({
				method: 'GET',
				path: '/assets/{param*}',
				handler: assetsRouteHandler
			});


			// Define index route
			server.route({
				method: 'GET',
				path: '/',
				handler: function(req, reply) {
					reply.file( path.join(__dirname, 'view', 'index.html'), { confine:false } );
				}
			});



		})

		// Start server
		.push(() => server.start())
		.run()
		.then(
			() => app.log(['log', 'monitor'], `Open monitor at ${server.info.uri}`),
			(err) => app.log(['error', 'monitor'], err)
		)
		.then(() => server);

};




















