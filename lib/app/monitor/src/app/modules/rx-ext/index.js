'use strict';


var angular = require('angular');
require('rx-angular');


var mod = module.exports = angular.module('rx-angular-extensions', ['rx']);


mod.run(function($rootScope, $parse) {

	$rootScope.__proto__.autoDispose = function(sub) {
		this.$on('$destroy', function() {
			sub.dispose();
		});
		return this;
	};

	$rootScope.__proto__.attach = function(obj) {
		var $scope = this;

		angular.forEach(obj, function(val, key) {

			var setter = $parse(key).assign;

			var sub = val.safeApply($scope, function(result) {
				setter($scope, result);
			})
			.subscribe();

			$scope.autoDispose( sub );

		});
	};

});
