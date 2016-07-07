'use strict';


var angular = require('angular');


var mod = module.exports = angular.module('app.directives.log-monitor', []);


mod.directive('logMonitor', function() {
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

			var $screen = $element.find('.screen');
			console.log($screen);

			$scope.attach({
				logs: $data.collection('logs').changes
				.map(function(logs) {
					return logs.filter(function(log) {
						if($scope.tags) {
							return $every($scope.tags, log.tags);
						} else {
							return true;
						}
					})
				})
				.do(function() {
					setTimeout(function() {
						$screen[0].scrollTop = $screen[0].scrollHeight
					});
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
