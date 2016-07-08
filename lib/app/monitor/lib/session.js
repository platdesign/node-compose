'use strict';

const rx = require('rx');



class SocketSession {

	constructor() {
		this._onCloseHandlers = [];

		this.tx = new rx.Subject();
		this.rx = new rx.Subject();
	}

	publish(observable) {
		let sub = observable.subscribe(function(e) {
			this.tx.onNext(e);
		}.bind(this));

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



module.exports = {
	SocketSession: SocketSession,
	SocketIoSession: SocketIoSession
};
