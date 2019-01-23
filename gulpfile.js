const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');

sass.compiler = require('node-sass');

// Compile SCSS to CSS
gulp.task('compileSCSS', ()=>{
    return gulp.src('./src/scss/*.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest('./build/css/'))
});

// Compile ES6+ to ES5 code
gulp.task('compileJS', ()=>{
    return gulp.src('./src/js/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(minify({
                mangle: {
                    keepClassName: true
                }
            }))
            .pipe(gulp.dest('./build/js/'));
})

// Watch - auto re-compile on save
gulp.task('watch', () => {
    gulp.watch(['./src/js/**/*.js'], gulp.series('compileJS'));
    gulp.watch(['./src/scss/**/*.scss'], gulp.series('compileSCSS'));
})