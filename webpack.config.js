const path = require('path'),
    webpack = require('webpack');

let envWebpack,
    webpackConfig = {
        cache: true,
        entry: {
            injector: './src/entries/injector.standalone.js',
            injector2: [
                './src/next/index.js'
            ]
        },
        output: {
            path: path.join(__dirname, '/bundles/'),
            filename: (process.env.NODE_ENV === 'development') ? '[name].js' : '[name].[chunkhash:10].js'
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
            new webpack.optimize.AggressiveMergingPlugin(),

            new webpack.DefinePlugin({
                'process.env': {
                    BROWSER: JSON.stringify(true),
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
                }
            })
        ]
    };


envWebpack = (process.env.NODE_ENV === 'development') ? require('./exports.webpack.dev.js')(webpack) :
    require('./exports.webpack.prod.js')(webpack);

if (envWebpack) {
    if (Array.isArray(envWebpack.plugins)) {
        webpackConfig.plugins = (webpackConfig.plugins).concat(envWebpack.plugins);
    }
}

module.exports = webpackConfig;
