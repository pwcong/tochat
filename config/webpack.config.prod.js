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
					presets: ['react', 'es2015'],
					plugins: [
						['import',{
						  "libraryName": "antd",
						  "style": 'css'
						}]
					]
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
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
		new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        })
	]
}