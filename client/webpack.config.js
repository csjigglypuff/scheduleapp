const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './client/src/index.tsx',
	module: {
		rules: [
			/* Loader for typescript files */
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			/* For Style Sheets */
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			/* Server our images */
			{
				test: /\.(webp|png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name][ext]',
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './client/src/index.html',
			filename: 'index.html',
		}),
	],
	devServer: {
		compress: true,
		port: 8080,
		historyApiFallback: true,
		static: [
			{
				directory: path.resolve('dist'),
				publicPath: '/',
			},
		],
		proxy: [
			{
				context: ['/'],
				target: 'http://localhost:3000',
			},
		],
	},
};
