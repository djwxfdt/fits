const webpack = require('webpack')

const isPublish = process.env.node_env === 'production'

var plugins = []

let themes = ['simple']

let entry = {}

themes.map(key=>entry[key]= `./client/theme/${key}.js`)

if (isPublish) {
	plugins.push(new webpack.optimize.UglifyJsPlugin({
        test: /(\.jsx|\.js)$/,
        compress: {
            warnings: false
        }
    }))

	plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangleProperties: false,
        sourceMap:false,
        output:{
            quote_keys:true
        }
    }))
}

plugins.push(new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify(process.env.node_env)}))

let config = {
	entry,
	output: {
		path: './public/js',
		chunkFilename: 'chunk/[chunkhash:8].chunk.js',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.ts','.js']
	},
	module: {
		loaders: [
             { test: /\.ts$/, loader: 'ts-loader' },
		]
	},
	plugins:plugins
}

if(!isPublish){
	config.watch = true
	config.devtool = 'source-map'
	config.cache = true
}

module.exports = config
