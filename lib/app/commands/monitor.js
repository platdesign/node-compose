'use strict';

const colors = require('colors');

const Monitor = require('../monitor');

module.exports = function(args) {

	if(this.monitorServer) {
		return this.log(['error', 'monitor'], `Monitor is already running at ${this.monitorServer.info.uri}`);
	} else {
		this.monitorServer = Monitor(this, {});
	}

}
