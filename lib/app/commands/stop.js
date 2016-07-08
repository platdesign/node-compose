'use strict';


module.exports = function(args) {

	let images;

	if (args.image === 'all') {
		images = this.imagesAsArray()
			.filter((image) => {
				return image.state === 'running';
			});

		if(!images.length) {
			this.log(['log'], 'No running images found to stop.');
		}
	} else {
		images = this.expectImagesByNameArray(
			[args.image].concat((args.images || []))
		);
	}


	return Promise.all(
		images.map((image) => {
			return image.stop();
		})
	);

}
