const webpack = require('webpack')

const isPublish = process.env.NODE_ENV === 'production'

const path = require('path')

var plugins = []

let themes = ['simple']

let entry = {}

let dir = './assets/scripts'

themes.map(key=>entry[key]= `${dir}/client/theme/${key}.js`)


Object.assign(entry,{
	login:`${dir}/admin/login.ts`,
	admin:`${dir}/admin/index.ts`,
	install:`${dir}/admin/install.ts`,
})


if (isPublish) {
	// doesn't support es6

	// plugins.push(new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false
    //     },
    //     mangleProperties: false,
    //     sourceMap:false,
    //     output:{
    //         quote_keys:true
    //     }
    // }))
}

plugins.push(new webpack.DefinePlugin({"process.env.NODE_ENV": JSON.stringify(process.env.node_env)}))

let config = {
	entry,
	output: {
		path: path.resolve('./public/js'),
		chunkFilename: 'chunk/[chunkhash:8].chunk.js',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.ts','.js'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
		}
	},
	module: {
		loaders: [
            { test: /\.ts$/, loader: 'ts-loader' },
			{ test: /\.pug$/, loader: 'pug-loader' }
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
