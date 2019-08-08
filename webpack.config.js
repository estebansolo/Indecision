// entry -> output

const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.join(__dirname, 'public', 'scripts'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				// loaders:[
				//     'babel-loader'
				// ]
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.s?css$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			}
		]
	},
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		publicPath: '/scripts/'
	}
};

// Loader
