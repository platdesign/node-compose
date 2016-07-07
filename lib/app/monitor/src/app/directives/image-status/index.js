'use strict';



var angular = require('angular');


var mod = module.exports = angular.module('app.directives.image-status', []);



mod.directive('imageStatus', function() {
	return {
		restrict: 'E',
		template: require('./template.pug'),
		replace: true,
		scope: {
			image: '='
		}
	}
});
