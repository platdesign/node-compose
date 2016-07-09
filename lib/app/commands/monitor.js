'use strict';

const Monitor = require('../monitor');
const open = require('open');

module.exports = function(args) {

	if (this.monitorServer) {
		this.log(['error', 'monitor'], `Monitor is already running at ${this.monitorServer.info.uri}`);
	} else {
		this.monitorServer = Monitor(this, {
			port: args.options.port,
			host: args.options.host
		});
	}




	if(args.options.open && this.monitorServer) {
		if(args.options.open && args.options.open !== true) {
			open(this.monitorServer.info.uri, args.options.open);
		} else {
			open(this.monitorServer.info.uri);
		}

	}

}
