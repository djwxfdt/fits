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
}

module.exports = {
	entry,
	output: {
		path: './public/',
		chunkFilename: 'chunk/[chunkhash:8].chunk.js',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.ts','','js']
	},
	module: {
		loaders: [
             { test: /\.ts$/, loader: 'ts-loader' },
		]
	},
	plugins:plugins
}
