'use strict';


var angular = require('angular');
require('rx-angular');

var mod = module.exports = angular.module('app.data', [
	'rx'
]);


mod.factory('$data', function(rx) {



	function Collection() {

		var store = {};

		var observable = new rx.BehaviorSubject([]);

		let updateTimer;


		function update() {

			clearTimeout(updateTimer);

			updateTimer = setTimeout(() => {
				var models = Object.keys(store).map(function(id) {
					return store[id];
				});
				observable.onNext(models);
			});
		}


		this.push = function(id, data) {
			if(store[id]) {
				angular.extend(store[id], data);
			} else {
				store[id] = data;
			}
			update();
		};

		this.changes = observable;

	}



	var service = {};
	var collections = {};

	service.collection = function(name) {
		if(collections[name]) {
			return collections[name];
		} else {
			return (collections[name] = new Collection());
		}
	};

	return service;





});



