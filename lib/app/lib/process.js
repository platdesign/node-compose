'use strict';

const rx = require('rx');
const utils = require('./utils');
const spawn = require('child_process').spawn;
const fs = require('fs');
const extend = require('extend');





class Process {




	constructor(name, cmd, cwd, env) {

		if(!name) {
			throw new Error('Missing name');
		}

		if(!cmd) {
			throw new Error('Missing command');
		}

		this.name = name;
		this.cmd = cmd;


		if(cwd && !fs.existsSync(cwd)) {
			throw new Error('CWD not found');
		}

		this.cwd = cwd;
		this.env = extend(true, Object.create(process.env), env);


		this.process = null;


		this._logs = new rx.Subject();
		this._state = new rx.BehaviorSubject('idle');

		this.state = this._state.filter(Boolean);

		this.logs = this._logs.map((e) => {
			e.tags.push('#process', name);
			return e;
		});

	}






	_log(tags, data) {
		this._logs.onNext({
			tags: tags,
			data: data
		});
	}






	_setState(state) {
		this._state.onNext(state);
	}




	getState() {
		return this._state.getValue();
	}




	start() {

		if(this.getState() !== 'idle') {
			return Promise.reject( new Error('Not idle') );
		}

		let args = utils.parseCmdStringToArray(this.cmd);
		let cmd = args.shift();

		this._setState('starting');

		const p = spawn(cmd, args, {
			cwd: this.cwd,
			env: this.env
		});

		this.process = p;

		p.stdout.on('data', function(payload) {
			this._log(['log'], utils.sanitizeProcessDataPayload(payload));
		}.bind(this));

		p.stderr.on('data', function(payload) {
			this._log(['error'], utils.sanitizeProcessDataPayload(payload));
		}.bind(this));

		p.on('exit', function(code) {
			this.process = null;
			this._setState('idle');
		}.bind(this));

		this._setState('running');

		return Promise.resolve();
	}







	stop() {
		const that = this;

		if(this.getState() !== 'running') {
			return Promise.reject( new Error('Not running') );
		}

		this._setState('stopping');

		return new Promise((resolve, reject) => {
			that.process.on('exit', () => {

				/**
				 * Process-State is set to idle as soon as that.process emits an exit event.
				 * The handler for that is registered after starting the process
				 * to avoid state-inconsistency on unexpected process-exits.
				 */

				resolve();
			});


			utils.killPID(that.process.pid);
		});

	}







	restart() {
		if(this.getState() === 'running') {
			return this.stop()
				.then(function() {
					return this.start();
				}.bind(this));
		}

		return this.stop();
	}





}


module.exports = Process;
