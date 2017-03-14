const isPublish = process.env.node_env === 'production'

var plugins = []

if (isPublish) {
	plugins.push(new webpack.optimize.UglifyJsPlugin({
        test: /(\.jsx|\.js)$/,
        compress: {
            warnings: false
        }
    }))
}

module.exports = {
	entry: {
		index:'./client/index.ts'
	},
	output: {
		path: './public/',
		chunkFilename: 'chunk/[chunkhash:8].chunk.js',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.ts','']
	},
	module: {
		loaders: [
             { test: /\.ts$/, loader: 'ts-loader' },
		]
	},
	plugins:plugins
}
