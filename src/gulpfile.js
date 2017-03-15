const gulp = require('gulp')
const del = require('del')
const scss = require('gulp-sass')
const webpack = require('webpack')
const gutil = require('gulp-util')
const nodemon = require('gulp-nodemon')


var config = Object.create(require('./webpack.config.js'))

gulp.task('clean',cb=>{
	del.sync(['./public'])
	cb()
})

gulp.task('copy',['clean'],()=>{
	gulp.src('*images/**/*.!(md)',{cwd:'./assets'}).pipe(gulp.dest('./public'))
	gulp.src('*/dist/**/*',{cwd:'./bower_components'}).pipe(gulp.dest('./public/3rd'))
})

gulp.task('css',()=>
    gulp.src('*styles/**/?(theme|admin)/*.scss',{cwd:'./assets'})
    .pipe(scss().on('error', scss.logError)).pipe(gulp.dest('./public'))
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
	gulp.watch(['./assets/styles/**/*.scss'],['css'])
	nodemon({script: './index.js',watch:['./server','./test'], ext: 'js json', env: { 'NODE_ENV': 'development' }})
})

gulp.task('default',['copy','css','js','watch'])


gulp.task('dist',['copy','css','js'])
