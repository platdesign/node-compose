'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const extractScss = new ExtractTextPlugin('[name].css');


const config = module.exports = {

	entry: {
		monitor: './lib/app/monitor/src/boot'
	},

	output: {
		path: './lib/app/monitor/public',
		filename: '[name].js',
		sourceMapFilename: '[name].map',
	},

	resolve: {
		alias: {},
		modules: [],
		extensions: ['', '.js', '.jsx', '.css', '.scss']
	},

	sassLoader: {
		includePaths: [
			path.resolve(__dirname, 'node_modules')
		]
	},

	module: {
		loaders: [
			// Extract css files
			{
				test: /\.scss$/,
				//exclude: /node_modules/,
				loader: extractScss.extract('style-loader', ['css-loader', 'sass-loader'])
			},

			{
				test: /\.json$/,
				loaders: ['json-loader'],
			},

			{
				test: /\.(pug|jade)$/,
				exclude: /node_modules/,
				loader: 'pug-html-loader',
				query: {
					root: __dirname
				}
			},

			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
					'image-webpack'
				]
			},

			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file?name=fonts/[name].[ext]'
			},

			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['babel-preset-es2015']
				}
			}
		]
	},

	plugins: [
		extractScss
	],

};



if (process.env.NODE_ENV === 'production') {
	config.plugins.push(new ngAnnotatePlugin());
} else {
	config.devtool = 'source-map';
	config.devServer = {
		inline: true
	};
}
