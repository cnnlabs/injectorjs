'use strict';

const gulp = require('gulp'),
    fs = require('fs'),
    clean = require('gulp-clean'),
    gutil = require('gulp-util'),
    jscs = require('gulp-jscs'),
    minify = require('gulp-minify'),
    webpack = require('webpack'),
    webpackComponents = require('./webpack.config.js');

gulp.task('webpack:components', function (callback) {
    webpack(webpackComponents, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:components', err);
        }
        let bundleStats = stats.toJson();

        fs.writeFile(`./tmp/bundles/manifest.json`, JSON.stringify(bundleStats.assets), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('manifest file saved');
            }
        });

        gutil.log('[webpack:components]', stats.toString({
            colors: true
        }));

        callback();
    });
});

gulp.task('assets', function () {
    gulp.src('tmp/bundles/**/*.*')
        .pipe(clean())
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
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
gulp.task('build', ['test', 'assets', 'webpack:components']);

/* Default Task */
gulp.task('default', ['test']);
