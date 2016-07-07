'use strict';

module.exports = {
	url: '/images',
	template: require('./template.pug'),
	controller: ['$scope', '$data', '$state', function($scope, $data, $state) {

		$scope.$watch(function() {
			$scope.showAside = $state.params.imageId || false;
		});

		$scope.showAside = $state.params.imageId || false;

		$scope.attach({
			images: $data.collection('images').changes
		});

	}]
};
