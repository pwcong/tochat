var webpack = require('webpack');
var path = require('path');

module.exports = {

	entry: './src/client/index.js',
	output: {
		path: path.join(__dirname, '..', 'public', 'static', 'js'),
		filename: 'bundle.js'
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
	devtool: 'source-map',
	devServer: {
		port: 3000,
		contentBase: [
			'./public',
			'./public/static'
		],
		inline: true,
		publicPath: '/js/'
	}
}