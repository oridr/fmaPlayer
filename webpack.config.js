'use strict';

const DEV_SERVER_PORT = 3333;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

const config = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './index.js'
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'app.js'
	},
	module: {
		preLoaders: [
			{test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
		],
		loaders: [
			{
				test: /\.js$/,
				loader: "babel",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loaders: [
					'style',
					'css?sourceMap'
				]
			},
			{
				test: /\.less$/,
				loaders: [
					'style',
					'css?sourceMap',
					'less?sourceMap'
				]
			},
			{
				test: /\.html$/,
				loader: "html"
			}
		]
	},
	resolve: {
		root: path.join(__dirname, 'src'),
		extensions: ['', '.js']
	},
	devtool: 'source-map',
	plugins: [
		new WebpackNotifierPlugin({ alwaysNotify: true }),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html'
		})
	],
	devServer: {
		port: DEV_SERVER_PORT,
		contentBase: './src',
		colors: true,
		noInfo: true,
		historyApiFallback: true
	}
};

module.exports = config;