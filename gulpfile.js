const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifyCSS = require('gulp-uglifycss');
const compress = require('gulp-babel-minify');

sass.compiler = require('node-sass');

// Compile SCSS to CSS and minify it
gulp.task('compileSCSS', () => {
    return gulp.src('./src/scss/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(uglifyCSS({
                "maxLineLen": 80,
                "uglyComments": true
            }))
            .pipe(gulp.dest('./build/css/'))
})

// Uglify (minify) JS
gulp.task('minifyJS', () => {
    return gulp.src('./src/js/app.js')
            .pipe(compress({
                mangle: {
                    keepClassName: true
                }
            }))
            .pipe(gulp.dest('./build/js/'))
})

// Watch and autosave/run tasks
gulp.task('watch', () => {
    gulp.watch(['./src/js/*.js'], gulp.series('minifyJS'));
    gulp.watch(['./src/scss/*.scss'], gulp.series('compileSCSS'));
})