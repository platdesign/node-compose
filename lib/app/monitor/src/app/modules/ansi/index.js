'use strict';


var angular = require('angular');
var ansi2html = require('./lib/ansi2html');

var mod = module.exports = angular.module('ansi2html', []);

mod.value('ansi2html', ansi2html);


mod.filter('ansi2html', function($sce) {
	return function(input) {
		return $sce.trustAsHtml(ansi2html(input));
	}
});
