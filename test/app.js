'use strict';

const code = require('code');
const expect = code.expect;
const path = require('path');

const App = require('../lib/app');


describe('Unit', () => {
	describe('App', () => {

		require('./projects/start-command/test/unit')(App);
		require('./projects/environment-vars/test/unit')(App);

	});
});

