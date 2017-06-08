const path = require('path'),
    AssetsPlugin = require('assets-webpack-plugin'),
    webpack = require('webpack');

function mergeObject(obj, source) {
    let prop;

    for (prop in source) {
        if (typeof obj[prop] === 'undefined') {
            obj[prop] = source[prop];
        } else if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop]) && !Array.isArray(source[prop])) {
            obj[prop] = mergeObject(obj[prop], source[prop]);
        }
    }

    return obj;
}

let envWebpack,
    webpackConfig = {
        cache: true,
        entry: {
            injector: './src/entries/injector.standalone.js',
            injector2: [
                './src/next/index.js'
            ],
            webcomponents_lite: '@webcomponents/webcomponentsjs',
            webcomponents_hi_ce: '@webcomponents/webcomponentsjs/webcomponents-hi-ce.js',
            webcomponents_hi_sd_ce: '@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js',
            webcomponents_hi: '@webcomponents/webcomponentsjs/webcomponents-hi.js',
            webcomponents_sd_ce: '@webcomponents/webcomponentsjs/webcomponents-sd-ce.js'
        },
        output: {
            path: path.join(__dirname, '/bundles/'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    query: {
                        configFile: '.eslint-es6.json'
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            new webpack.IgnorePlugin(/vertx/),

            new AssetsPlugin({
                path: path.join(__dirname, '/dist/'),
                processOutput: function (assets) {
                    return 'window.FAI = window.FAI || {};window.FAI.bundleMap = ' + JSON.stringify(assets);
                },
                filename: 'manifest.js'
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    BROWSER: JSON.stringify(true),
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
                }
            })
        ],
        devServer: {
            contentBase: [
                path.join(__dirname, 'dist'),
                path.join(__dirname, 'demo')
            ],
            compress: (process.env.NODE_ENV === 'development'),
            port: process.env.PORT || 5000,
            host: '0.0.0.0',
            inline: false,
            disableHostCheck: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        }
    };

envWebpack = (process.env.NODE_ENV === 'development') ? require('./exports.webpack.dev.js')(webpack) :
    require('./exports.webpack.prod.js')(webpack);

if (envWebpack) {
    if (typeof envWebpack.entry !== 'undefined') {
        webpackConfig.entry = mergeObject(webpackConfig.entry, envWebpack.entry);
    }

    if (Array.isArray(envWebpack.plugins)) {
        webpackConfig.plugins = (webpackConfig.plugins).concat(envWebpack.plugins);
    }
}

module.exports = webpackConfig;
