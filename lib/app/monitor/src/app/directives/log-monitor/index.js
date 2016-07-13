'use strict';


var angular = require('angular');
require('rx-angular');

var mod = module.exports = angular.module('app.directives.log-monitor', [
	require('ngstorage').name,
	'rx'
]);


mod.directive('logMonitor', function($localStorage) {
	return {
		restrict: 'E',
		template: require('./template.jade'),
		replace: true,
		scope: {
			config: '=',
			filter: '='
		},
		link: function(scope, el) {

		},
		controller: function($scope, $data, $element, rx) {

			$scope.$storage = $localStorage;

			if(!$scope.$storage.logMonitor) {
				$scope.$storage.logMonitor = {
					limit: 50,
					verbose: false
				};
			}

			var $screen = $element.find('.screen');


			var logsFilter = new rx.BehaviorSubject({});


			$scope.$createObservableFunction('selectTab')
				.pluck('filter')
				.subscribe(logsFilter);




			var items = $data.collection('logs').changes
				.filter(Boolean)
				.flatMap(function(items) {
					return logsFilter
						.map(function(filter) {
							return items
								.filter( createLogsFilter( $scope.filter || {} ) )
								.filter( createLogsFilter(filter) )
						});
				})
				.do(function(logs) {
					if(logs && logs.length) {
						setTimeout(function() {
							$screen[0].scrollTop = $screen[0].scrollHeight
						});
					}
				})


			$scope.attach({
				logs: items
			});



			$scope.getItemClassDef = function(tags) {
				return {
					verbose: tags.indexOf('#verbose') !== -1,
					log: tags.indexOf('log') !== -1,
					error: tags.indexOf('error') !== -1,
				}
			}



		}
	}
});









function createLogsFilter(options) {

	return function(item) {
		var all = [];

		if(options.every) {
			all.push(
				options.every.every(function(tag) {
					return item.tags.indexOf(tag) !== -1;
				})
			)
		}

		if(options.none) {
			all.push(
				options.none.every(function(tag) {
					return item.tags.indexOf(tag) === -1;
				})
			)
		}

		return all.every(Boolean);
	}

}










mod.filter('logMonitorTags', function() {
	return function(tags, remove) {
		return tags.filter(function(tag) {
			return !$some(tag, ['#verbose', '#process', '#script', '#image', 'log', 'error'].concat(remove||[]))
		})
	}
});


mod.filter('logMonitorFilterVerbose', function() {
	return function(logs, verbose) {
		return logs.filter(function(log) {
			if(!verbose) {
				return log.tags.indexOf('#verbose') === -1;
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
