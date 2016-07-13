'use strict';


var angular = require('angular');


var mod = module.exports = angular.module('app.directives.script-button', []);

mod.directive('scriptButton', function() {
	return {
		restrict: 'E',
		template: require('./template.pug'),
		replace: true,
		scope: {
			script: '=',
			image: '='
		},
		controller: function($scope, $cmd) {

			$scope.start = function() {
				$cmd.exec('start-script', { image: $scope.image.id, script: $scope.script.name });
			};

			$scope.stop = function() {
				$cmd.exec('stop-script', { image: $scope.image.id, script: $scope.script.name });
			};


		}
	}
});
