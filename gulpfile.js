'use strict';

const gulp = require('gulp'),
    clean = require('gulp-clean'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    jscs = require('gulp-jscs'),
    minify = require('gulp-minify'),
    webpack = require('webpack'),
    webpackComponents = require('./webpack.config.js');

function createDist() {
    gulp.src('bundles/*')
        .pipe(gulp.dest('dist/bundles'));

    gulp.src('bundles')
        .pipe(clean());

    gutil.log('bundles', 'moved to dist/bundles');

    gulp.src('src/injector.js')
        .pipe(minify({
            ext: {
                src: '.lite.js',
                min: '.lite.min.js'
            }
        }))
        .pipe(gulp.dest('dist'));

    gutil.log('src/injector.js', 'moved to dist/');
}

gulp.task('dist', function (callback) {
    webpack(webpackComponents, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:components', err);
        }
        let bundleStats = stats.toJson();

        fs.writeFile(`./dist/manifest.json`, JSON.stringify(bundleStats.assets), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('manifest file saved');
            }
        });

        gutil.log('[webpack:components]', stats.toString({
            colors: true
        }));

        callback(createDist());
    });

    gulp.src('bundles')
        .pipe(gulp.dest('dist'));
});

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

/* Test */
gulp.task('test', ['lint']);

/* Build */
gulp.task('build', ['test', 'dist']);

/* Default Task */
gulp.task('default', ['test']);
