'use strict';

const CWD = process.cwd();

const path = require('path');
const Yaml = require('js-yaml');
const fs = require('fs');
const Vorpal = require('vorpal');
const spawn = require('child_process').spawn;
const rx = require('rx');
const which = require('which');
const killpid = require('./lib/killpid');
const nodemon = require('nodemon');
const colors = require('colors');
const is = require('is');
const Table = require('cli-table');


const composeFileName = process.argv[2] || 'node-compose.yml';
const composeFile = path.join(CWD, composeFileName);

if(!fs.existsSync(composeFile)) {
	console.log((`File not found: ${composeFileName}`).red);
	process.exit(1);
}

let config;
try {
	console.log((`Using config from: ${composeFileName}`).cyan);
	config = Yaml.safeLoad(fs.readFileSync(composeFile, 'utf8'));
} catch(e) {
	console.log('Invalid yaml file.'.red);
	process.exit(1);
}


const service = Vorpal();
const logger = new rx.Subject();
const processStore = {};





const startProcessByName = function(name) {

	if(!config[name]) {
		service.log(`Cant find process ${name}`);
		return;
	}

	const p = startProcess(name, config[name]);
	processStore[name] = p;



	logger.onNext({
		type: 'log',
		name: p.name,
		payload: 'Starting ...'
	});

	const sub = p.logger.subscribe(logger);

	p.process.on('close', function(code) {
		sub.dispose();
		delete processStore[name];
	});
}


const stopProcessByName = function(name, cb) {
	if(!processStore[name]) {
		service.log(`Cant find process ${name}`);
		return;
	}

	const p = processStore[name];

	p.kill();

	if(is.fn(cb)) {
		p.process.on('close', function(code) {
			cb();
		});
	}
};


const restartProcessByName = function(name) {
	stopProcessByName(name, function() {
		startProcessByName(name);
	});
};





logger.subscribe((msg) => {

	if(msg.type === 'log') {
		service.log((`[ ${msg.name} ] `).green + `${msg.payload || ''}`);
	} else if(msg.type === 'error') {
		service.log((`[ ${msg.name} ] `).red + `${msg.payload || ''}`);
	}

});



service.find('exit')
.description('Close shell and kill all processes')
.action(function() {
	Object.keys(processStore).forEach(stopProcessByName);
});



service
	.command('start <name>', 'Start a process. Use `all` to start all')
	.autocomplete(Object.keys(config))
	.action(function(args, callback) {

		if(args.name === 'all') {
			Object.keys(config).forEach(startProcessByName);
		} else {
			startProcessByName(args.name);
		}

		this.log(	getPsView(processStore)	);

		callback();

	});


service
	.command('stop <name>', 'Stop a process. Use `all` to stop all')
	.autocomplete({
		data: function() {
			return Object.keys(processStore);
		}
	})
	.action(function(args, callback) {

		if(args.name === 'all') {
			Object.keys(processStore).forEach(stopProcessByName);
		} else {
			stopProcessByName(args.name);
		}

		callback();

	});


service
	.command('restart <name>', 'Restart a process. Use `all` to restart all')
	.autocomplete({
		data: function() {
			return Object.keys(processStore);
		}
	})
	.action(function(args, callback) {

		if(args.name === 'all') {
			Object.keys(processStore).forEach(restartProcessByName);
		} else {
			restartProcessByName(args.name);
		}

		this.log(	getPsView(processStore)	);

		callback();
	})



service
	.command('ps', 'Display all processes')
	.action(function(args, callback) {
		this.log(	getPsView(processStore)	);
		callback();
	});



service
	.command('images', 'Display all available processes')
	.action(function(args, callback) {

		let values = Object.keys(config)
		.map((name, index) => {
			let item = config[name];

			return [index+1, name, path.resolve(CWD, item.build)];
		});

		this.log(
			createTableView(
				`Available images (${values.length})`,
				['No', 'Name', 'Path'],
				values
			)
		);

		callback();
	});


service.use( require('./lib/vorpal-plugins/commands/reload'), {
	app: {}
});


service
	.delimiter('node-compose $')
	.show();








function startProcess(name, pConf) {

	//name = pConf.container_name || name;

	const env = (pConf.environment || [])
		.map((item) => {
			return item.split('=');
		})
		.reduce((res, item)=>{
			res[item[0]] = item[1];
			return res;
		}, Object.create(process.env));

	const cwd = path.resolve(CWD, pConf.build);
	const logger = new rx.Subject();


	const p = spawn(which.sync('nodemon'), ['-x', which.sync('node'), cwd], {
		cwd: cwd,
		env: env
	});

	p.stdout.on('data', (payload) => {

		logger.onNext({
			name: name,
			type: 'log',
			payload: (payload || '').toString().replace(/^\s+|\s+$/g, '')
		});

	});

	p.stderr.on('data', (payload) => {

		logger.onNext({
			name: name,
			type: 'error',
			payload: payload.toString().replace(/^\s+|\s+$/g, '')
		});

	});

	p.on('close', (code) => {

		logger.onNext({
			name: name,
			type: 'log',
			payload: 'Stopped'
		});

	});



	return {
		name: name,
		env: env,
		cwd: cwd,
		process: p,
		logger: logger,

		kill: function() {

			logger.onNext({
				type: 'log',
				name: name,
				payload: 'Stopping ...'
			});

			killpid(p.pid);
		}
	};

}




function createTableString(header, data) {

	let table = new Table({
		head: header.map((item) => {
			return (item).cyan
		})
	});

	table.push.apply(table, data);
	return table.toString();
}




function createTableView(title, head, data) {
	return createView(title, createTableString(head, data) );
}

function createView(title, content, footer) {
	return `\n${(title).bold}\n${content}\n\n${footer||''}`;
}



function getPsView(processStore) {

	let values = Object.keys(processStore)
	.map((name, index) => {
		let p = processStore[name];
		return [index+1, name];
	});

	return createTableView(
		`Running processes (${values.length})`,
		['No', 'Name'],
		values
	);

}


