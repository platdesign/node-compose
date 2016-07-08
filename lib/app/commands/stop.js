'use strict';


module.exports = function(args) {

	const that = this;

	let images;

	if (args.image === 'all') {
		images = this.imagesAsArray()
			.filter((image) => {
				return image.isRunning;
			})
			.map((image) => {
				return image._name;
			});
	} else {
		images = [args.image].concat((args.images || []))
	}



	let imagesToStart = images
		.map((name) => {
			return that.expectImageByName(name);
		})
		.filter(Boolean);



	if (imagesToStart.length) {
		that.log(['verbose'], `Stopping ${images.join(', ')}`);

		return Promise.all(
			imagesToStart.map((image) => {
				return image.stop();
			})
		)
	} else {
		that.log(['log'], 'No running images found to stop.');
		return Promise.resolve();
	}

}
