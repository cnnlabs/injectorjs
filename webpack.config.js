const webpack = require('webpack');

module.exports = {
    entry: {
        injector: './src/entries/injector.standalone.js',
        injectores6: [
            // polyfills
            'es6-promise',
            'whatwg-fetch',
            './src/entries/injector.es6.js'
        ]
    },
    output: {
        path: __dirname,
        filename: 'bundles/[name].[chunkhash:8].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
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
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: true,
            output: {
                comments: false
            }
        })
    ]
};
