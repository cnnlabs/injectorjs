'use strict';

const gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    minify = require('gulp-minify');

/* linting */
gulp.task('lint', function () {
    function linting () {
        /*jscs*/
        gulp.src(['./src/**/*.js'])
            .pipe(jscs())
            .pipe(jscs.reporter());

    }
    return linting();
});

gulp.task('assets', function () {
    gulp.src('src/*.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist'));
});

/* Test */
gulp.task('test', ['lint']);

/* Build */
gulp.task('build', ['test', 'assets']);

/* Default Task */
gulp.task('default', ['test']);
