'use strict';

var angular = require('angular');

var mod = module.exports = angular.module('app.states', []);


mod.config(function($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/');


	$stateProvider
		.state('app', require('./app'))
		.state('app.dashboard', require('./app.dashboard'))
		.state('app.images', require('./app.images'))
		.state('app.images.image', require('./app.images.image'))

});
