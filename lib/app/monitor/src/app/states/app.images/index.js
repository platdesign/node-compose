'use strict';

module.exports = {
	url: '/images',
	template: require('./template.pug'),
	controller: ['$scope', '$data', function($scope, $data) {

		$scope.attach({
			images: $data.collection('images').changes
		});

	}]
};
