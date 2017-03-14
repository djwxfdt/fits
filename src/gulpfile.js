const gulp = require('gulp')
const del = require('del')
const postcss = require('gulp-postcss')

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

gulp.task('default',['copy','css'])
