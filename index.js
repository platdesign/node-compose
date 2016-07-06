'use strict';

// Deps
const path = require('path');
const App = require('./lib/app');
const Vorpal = require('vorpal');

// Init App
const app = App({
	CWD: process.cwd(),
	configFile: process.argv[2],
});

// Init vorpal instance
const vorpal = Vorpal();


// Register vorpal-logger on app
app.registerLogger( vorpal.log.bind(vorpal) );


// RegisterVorpal-Plugins

	// Commands
	[
		'ps',
		'reload',
		'start',
		'stop',
		'restart',
		'images',
	].forEach( registerCMD )



// Final configs
vorpal
	.delimiter('node-compose $')
	.show();






function registerCMD(name) {
	vorpal.use( require( path.join(__dirname, 'lib', 'vorpal-plugins', 'commands', name) ), { app: app });
}
