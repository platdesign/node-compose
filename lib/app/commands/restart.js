'use strict';


module.exports = function(args) {

	const that = this;

	let images;

	if(args.image === 'all') {
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




	let imagesToRestart = images
		.map((name) => {
			return that.expectImageByName(name);
		})
		.filter((image) => {
			if(!image) {
				return false;
			} else if(!image.isRunning) {
				that.log(['error'], `Image '${image._name}' is not running.`);
				return false;
			}
			return true;
		});



	if(imagesToRestart.length) {
		that.log(['verbose'], `Restarting ${images.join(', ')}`);

		return Promise.all(
			imagesToRestart.map((image) => {
				return image.restart();
			})
		)
		.then((res) => {
			that.log(['verbose'], `Restarted ${images.join(', ')}`);
			return res;
		});
	} else {
		that.log(['log'], 'No running image(s) to restart.');
		return Promise.resolve();
	}




}
