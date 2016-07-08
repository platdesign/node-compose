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



	io.on('connection', (socket) => {

		// logs.subscribe(function(msg) {
		// 	socket.emit('log', msg);
		// });

		socket.on('cmd', function(msg) {
			app.commands[msg.cmd](msg.args);
		});



		// let confs = app.imagesAsArray().map((image) => {
		// 	return image._config;
		// });

		// socket.emit('images', confs);


		// app.events.subscribe((e) => {
		// 	socket.emit('event', e);
		// });



		const session = new SocketIoSession();

		session.bindSocket(socket, 'ddp');

		// Publish logs
		session.publish(
			app.observables.logs.map((log) => {
				return {
					type: 'collection',
					name: 'logs',
					id: log.createdAt,
					model: log
				}
			})
		);


		session.publish(
			app.observables.images
			.flatMap((images) => {
				return rx.Observable.from(images);
			})
			.map((image) => {
				return {
					type: 'collection',
					name: 'images',
					id: image._name,
					model: image.toObject()
				}
			})
		);

		session.publish(
			app.observables.imageStatus
			.map((image) => {
				return {
					type: 'collection',
					name: 'images',
					id: image._name,
					model: image.toObject()
				}
			})
		);




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





















class SocketSession {

	constructor() {
		this._onCloseHandlers = [];

		this.tx = new rx.Subject();
		this.rx = new rx.Subject();
	}

	publish(observable) {
		let sub = observable.subscribe( this.tx );

		this._onCloseHandlers.push(() => {
			sub.dispose();
		});
	}

	subscribe(observer) {
		let sub = this.rx.subscribe(observer);

		this._onCloseHandlers.push(() => {
			sub.dispose();
		});
	}

	close() {
		this._onCloseHandlers.forEach((fn) => {
			fn();
		});
	}

}


class SocketIoSession extends SocketSession {

	bindSocket(socket, channel) {
		const session = this;

		let txSub = session.tx.subscribe((data) => {
			socket.emit(channel, data);
		});

		socket.on(channel, (data) => {
			session.rx.onNext(data);
		});

		socket.on('disconnect', () => {
			txSub.dispose();
			session.close();
		});
	}

}


