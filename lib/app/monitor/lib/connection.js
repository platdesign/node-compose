'use strict';

const rx = require('rx');

module.exports = function(app, session) {

	// Transform images array to ddp-collection-add messages
	const images = rx.Observable.from(app.imagesAsArray())
		.map((image) => {
			return {
				type: 'collection',
				collection: 'images',
				method: 'add',
				id: image._name,
				model: image.toObject()
			}
		});

	// Publish images
	session.publish(images);



	// Transform image state changes to ddp-collection-update messages
	const imagesStateChanges = app.on(['image:state', 'image:configured'])
		.map(function(d) {
			return d._image;
		})
		.map((image) => {
			return {
				type: 'collection',
				collection: 'images',
				method: 'update',
				id: image._name,
				model: image.toObject()
			}
		})

	// Publish imageStateChanges
	session.publish(imagesStateChanges);



	// Transform logs to ddp-collection-update messages
	const logs = app.observables.logs
		.map((log) => {
			return {
				type: 'collection',
				collection: 'logs',
				method: 'add',
				id: log.createdAt,
				model: log
			}
		})

	// Publish logs
	session.publish(logs);



	const exec = session.rx.filter((e) => {
		return e.type === 'exec';
	});

	const commands = exec.filter((e) => {
			return e.cmd === 'command';
		})
		.map((e) => {
			return e.params;
		});


	commands.subscribe(function(e) {
		app.commands[e.cmd](e.args);
	});

};
