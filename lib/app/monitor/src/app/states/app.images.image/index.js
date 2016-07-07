'use strict';

module.exports = {
	url: '/:imageId',
	template: require('./template.pug'),
	controller: ['$scope', '$state', '$data', 'rx', function($scope, $state, $data, rx) {

		var id = $state.params.imageId;

		var image = $data.collection('images')
		.changes.flatMap(function(items) {
			return rx.Observable.from(items);
		})
		.filter(function(model) {
			return model.id === id;
		});

		$scope.attach({
			image: image
		});

	}]
};
