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
		controller: function($scope, $data, $element, rx, observeOnScope) {

			$scope.$storage = $localStorage;

			if(!$scope.$storage.monitorConfig) {
				$scope.$storage.monitorConfig = {
					limit: 50,
					verbose: false
				};
			}

			$scope.monitorConfig = $scope.$storage.monitorConfig;




			const filter$ = rx.Observable.combineLatest(
				observeOnScope($scope, 'filter').pluck('newValue'),
				rx.Observable.merge(
					$scope.$createObservableFunction('selectTab').pluck('filter'),
					rx.Observable.of({})
				),
				(a, b) => angular.extend({}, a, b)
			);



			const monitorConfig$ = rx.Observable.combineLatest(
				observeOnScope($scope, 'monitorConfig.verbose').pluck('newValue'),
				observeOnScope($scope, 'monitorConfig.limit').pluck('newValue'),
				(verbose, limit) => ({
					verbose,
					limit
				})
			);



			const $screen = $element.find('.screen');



			const scolledDown$ = rx.Observable.merge(
				rx.Observable
					.fromEvent($screen, 'scroll')
					.pluck('target')
					.map((e) => e.scrollTop + e.offsetHeight === e.scrollHeight),
				rx.Observable.of(true)
			);



			const scrollBottomSubject$ = new rx.Subject();



			const scrollBottom$ = scrollBottomSubject$
				.pausable(scolledDown$)
				.debounce(10)
				.do(() => {
					$screen[0].scrollTop = $screen[0].scrollHeight;
				});



			const items$ = rx.Observable.combineLatest(
				filter$,
				$data.collection('logs').changes,
				monitorConfig$,
				(filter, items, monitorConfig) => items

					// Filter items based on filter object
					.filter( createLogsFilter( filter ) )

					// remove items which have #verbose if monitorConfig.verbose === false
					.filter((log) => monitorConfig.verbose ? true : log.tags.indexOf('#verbose') === -1)

					// limit items to monitorConfig.limit
					.slice(0 - monitorConfig.limit)

					.map((item) => {
						item.displayTags = getDisplayTags(item.tags, filter);
						return item;
					})

			)
			.distinctUntilChanged()
			.do(() => scrollBottomSubject$.onNext());





			$scope.attach({
				logs: items$,
				_scrollBottom: scrollBottom$
			});



			$scope.getItemClassDef = (tags) => ({
				verbose: tags.indexOf('#verbose') !== -1,
				log: tags.indexOf('log') !== -1,
				error: tags.indexOf('error') !== -1,
			});



		}
	};
});















function getDisplayTags(tags, filter) {

	if(filter.removeDisplayTags) {
		tags = tags.filter(function(tag) {
			return !$some(tag, filter.removeDisplayTags);
		});
	}

	return tags.filter(function(tag) {
		return !$some(tag, ['#verbose', '#process', '#script', '#image', 'log', 'error']);
	});

}






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
