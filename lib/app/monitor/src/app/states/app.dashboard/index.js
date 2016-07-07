'use strict';

module.exports = {
	url: '/',
	template: require('./template.pug'),
	controller: ['$scope', '$data', function($scope, $data) {
		$scope.attach({
			images: $data.collection('images').changes
		})
	}]
};
