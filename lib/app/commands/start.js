'use strict';


module.exports = function(args) {

	let images;

	if (args.image === 'all') {
		images = this.imagesAsArray()
			.filter((image) => {
				return image.state === 'idle';
			});

		if(!images.length) {
			this.log(['log'], 'No idle images found to start.');
		}
	} else {
		images = this.expectImagesByNameArray(
			[args.image].concat((args.images || []))
		);
	}


	return Promise.all(
		images.map((image) => {
			return image.start();
		})
	);

}
