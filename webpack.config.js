var webpack = require('webpack');
var path = require('path');

module.exports = {

	entry: path.resolve(__dirname, 'client'),
	output: {
		path: path.resolve(__dirname, 'public/static/js'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			}

		]
	},
	devServer: {
		port: 3000,
		contentBase: [
			path.join(__dirname, 'public'),
			path.join(__dirname, 'public', 'static')
		],
		inline: true,
		publicPath: '/js/'
	}
}