'use strict';

const createServer = require('../monitor');
const open = require('open');
const ctxq = require('ctxq');



module.exports = function(args) {

	return ctxq()
		.push(() => {

			if (this.monitorServer) {
				this.log(['error', 'monitor'], `Monitor is already running at ${this.monitorServer.info.uri}`);
			} else {
				return createServer(this, {
					port: args.options.port,
					host: args.options.host
				}).then((server) => this.monitorServer = server);
			}

		})
		.push(() => {
			if(args.options.open && this.monitorServer) {
				if(args.options.open && args.options.open !== true) {
					open(this.monitorServer.info.uri, args.options.open);
				} else {
					open(this.monitorServer.info.uri);
				}
			}
		})
		.run();

};
