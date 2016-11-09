'use strict';


var angular = require('angular');


var mod = module.exports = angular.module('app.directives.image-controls', []);



mod.directive('imageControls', function() {
	return {
		restrict: 'E',
		template: require('./template.pug'),
		replace: true,
		scope: {
			image: '='
		}
	};
});
