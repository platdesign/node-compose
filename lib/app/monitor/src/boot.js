'use strict';

var $ = global.$ = global.jQuery = require('jquery');
var angular = require('angular');
var app = require('./app');

var EQ = require('css-element-queries/src/ElementQueries');

// Really the best approach?
app.run(function($rootScope) {
	$rootScope.$watch(function() {
		EQ.init();
	});
});


$(document).ready(function() {
	try {
		angular.bootstrap($('html'), [app.name]);
	} catch(e) {
		console.error(e.message)
	}
});

