const webpack = require('webpack');

module.exports = {
    entry: {
        injector: './src/entries/injector.standalone.js'
    },
    output: {
        path: __dirname,
        filename: 'bundles/[name].[chunkhash:8].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};
