'use strict';


module.exports = function(args) {

	let image;
	try {
		image = this.getImageByName(args.image);
	} catch(e) {
		return this.log(['error'], e.message);
	}

	return image.stopScript(args.script);

}
