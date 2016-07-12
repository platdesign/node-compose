'use strict';


var angular = require('angular');


var mod = module.exports = angular.module('app.directives.log-monitor', [
	require('ngstorage').name,
]);


mod.directive('logMonitor', function($localStorage) {
	return {
		restrict: 'E',
		template: require('./template.jade'),
		replace: true,
		scope: {
			tags: '='
		},
		link: function(scope, el) {

		},
		controller: function($scope, $data, $element) {

			$scope.$storage = $localStorage;

			if(!$scope.$storage.logMonitor) {
				$scope.$storage.logMonitor = {
					limit: 50,
					verbose: false
				};
			}

			var $screen = $element.find('.screen');

			$scope.attach({
				logs: $data.collection('logs').changes
				.map(function(logs) {
					return logs.filter(function(log) {
						if($scope.tags) {
							return $every($scope.tags, log.tags);
						} else {
							return true;
						}
					});
				})
				.do(function(logs) {
					if(logs && logs.length) {
						setTimeout(function() {
							$screen[0].scrollTop = $screen[0].scrollHeight
						});
					}
				})
			});

		}
	}
});


mod.filter('logMonitorTags', function() {
	return function(tags, remove) {
		return tags.filter(function(tag) {
			return !$some(tag, ['#image', 'log', 'error'].concat(remove||[]))
		})
	}
});


mod.filter('logMonitorFilterVerbose', function() {
	return function(logs, verbose) {
		return logs.filter(function(log) {
			if(!verbose) {
				return log.tags.indexOf('verbose') === -1;
			}
			return true;
		})
	}
});


function $every(needle, haystack ) {
	if (Array.isArray(needle)) {
		return needle.every(function(val) {
			return haystack.indexOf(val) !== -1;
		});
	} else {
		return haystack.indexOf(needle) !== -1
	}
}


function $some(needle, haystack ) {
	if (Array.isArray(needle)) {
		return needle.every(function(val) {
			return haystack.indexOf(val) !== -1;
		});
	} else {
		return haystack.indexOf(needle) !== -1
	}
}
