'use strict';

const path = require('path');

const jsExternals = [
	'jquery',
	'angular',
	'angular-ui-router',
	'angular-moment',
	'moment-duration-format',
	'socket.io-client',
	'rx-angular',
	'ramda',
	'css-element-queries/src/ElementQueries',
	'ngstorage'
];


module.exports = function() {

	this.js([
		{
			name: 'monitor-vendor',
			src: path.join(__dirname, 'src', 'vendor.js'),
			dest: path.join(__dirname, 'public', 'vendor.js'),
			require: jsExternals
		},
		{
			name: 'monitor-app',
			src: path.join(__dirname, 'src', 'boot.js'),
			dest: path.join(__dirname, 'public', 'boot.js'),
			external: jsExternals
		}
	]);

	this.scss([
		{
			name: 'monitor-css',
			src: path.join(__dirname, 'src', 'main.scss'),
			dest: path.join(__dirname, 'public', 'main.css'),
			sass: {
				includePaths: ['node_modules', 'bower_components'],
			}
		}
	]);


	this.html({
		name: 'monitor-html',
		src: path.join(__dirname, 'src', 'index.pug'),
		dest: path.join(__dirname, 'public'),
	});

	this.font({
		name: 'monitor-fonts',
		src: [
			'./node_modules/font-awesome/fonts/**/*'
		],
		dest: path.join(__dirname, 'public', 'fonts')
	});

};
