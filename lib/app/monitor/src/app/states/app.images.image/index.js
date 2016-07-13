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


		var monitorConfig = image.map((image) => {

			var imageTab = {
				title: image.id,
				filter: {
					every: ['#image', image.id],
					none: ['#script']
				},
				icon: image.isRunning ? 'fa-heart' : 'fa-heart-o'
			};

			var scriptTabs = Object.keys(image.scripts)
				.map(function(key) {
					return image.scripts[key];
				})
				.map(function(script) {
					return {
						title: script.name,
						filter: {
							every: ['#script', image.id, script.name]
						},
						icon: 'fa-code'
					}
				});



			return {
				tabs: scriptTabs.length ? [imageTab].concat(scriptTabs) : []
			}
		});


		$scope.attach({
			image: image,
			monitorConfig: monitorConfig
		});


	}]
};
