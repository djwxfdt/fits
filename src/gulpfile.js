const gulp = require('gulp')
const del = require('del')
const postcss = require('gulp-postcss')
const webpack = require('webpack')
const gutil = require('gulp-util')
const nodemon = require('gulp-nodemon')

var config = Object.create(require('./webpack.config.js'))

gulp.task('clean',cb=>{
	del.sync(['./public'])
	cb()
})

gulp.task('copy',['clean'],()=>new Promise(r=>
    gulp.src('*images/**/*.!(md)',{cwd:'./assets'})
    .pipe(gulp.dest('./public')).on('end',r)
))

gulp.task('css',['clean'],()=>
    gulp.src('*styles/**/*.css',{cwd:'./assets'})
    .pipe(postcss([])).pipe(gulp.dest('./public'))
)

let init = false
gulp.task('js',['clean'],(cb)=>{
	webpack(config, (err, stats) => {
		if (err)
			throw new gutil.PluginError("webpack", err)
		var jsonStats = stats.toJson()
		if (jsonStats.errors.length > 0)
			return gutil.log(jsonStats.errors[0])
		if (jsonStats.warnings.length > 0)
			return gutil.log(jsonStats.warnings)
		gutil.log(gutil.colors.green('Webpack Build Successful!'))
		init ? null : cb()
		init = true
	})
})

gulp.task('watch',()=>{
	nodemon({script: './index.js',watch:['./server'], ext: 'js', env: { 'NODE_ENV': 'development' }})
})

gulp.task('default',['copy','css','js','watch'])


gulp.task('dist',['copy','css','js'])
