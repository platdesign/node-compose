'use strict';

const Monitor = require('../monitor');


module.exports = function(args) {

	if (this.monitorServer) {
		return this.log(['error', 'monitor'], `Monitor is already running at ${this.monitorServer.info.uri}`);
	}

	return this.monitorServer = Monitor(this, {
		port: args.options.port,
		host: args.options.host
	});

}
