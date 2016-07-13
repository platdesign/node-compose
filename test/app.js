'use strict';

const code = require('code');
const expect = code.expect;
const path = require('path');

const App = require('../lib/app');


describe('Unit', () => {
	describe('App', () => {

		require('./topics/detect-start-command/test/unit')(App);
		require('./topics/environment-vars/test/unit')(App);
		require('./topics/start-restart-stop/test/unit')(App);
		require('./topics/detect-execute-scripts/test/unit')(App);

	});

	require('./unit/class-process')();

});

