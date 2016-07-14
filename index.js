'use strict';

// Deps
const path = require('path');
const App = require('./lib/app');
const Vorpal = require('vorpal');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');


// Init vorpal instance
const vorpal = Vorpal();

// Notify about module updates
updateNotifier({ pkg: pkg, updateCheckInterval: 0 }).notify({ defer: false });

// Init App
const app = App({
	CWD: process.cwd(),
	configFile: process.argv[2],
	logger: vorpal.log.bind(vorpal)
});


// RegisterVorpal-Plugins

	// Commands
	[
		'ps',
		'reload',
		'start',
		'stop',
		'restart',
		'images',
		'exit',
		'monitor',
		'start-script',
		'stop-script',
	].forEach( registerCMD )





// Final configs
vorpal
	.delimiter('node-compose $')
	.show();




function registerCMD(name) {
	vorpal.use( require( path.join(__dirname, 'lib', 'vorpal-plugins', 'commands', name) ), { app: app });
}
