const path = require('path'),
    webpack = require('webpack');

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
            filename: (process.env.NODE_ENV === 'development') ? '[name].js' : '[name].[chunkhash:8].js'
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

            new webpack.DefinePlugin({
                'process.env': {
                    BROWSER: JSON.stringify(true),
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
                }
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'demo'),
            compress: (process.env.NODE_ENV === 'development'),
            port: process.env.PORT || 5000,
            host: '0.0.0.0',
            inline: false,
            disableHostCheck: true
        }
    };


envWebpack = (process.env.NODE_ENV === 'development') ? require('./exports.webpack.dev.js')(webpack) :
    require('./exports.webpack.prod.js')(webpack);

if (envWebpack) {
    if (Array.isArray(envWebpack.plugins)) {
        webpackConfig.plugins = (webpackConfig.plugins).concat(envWebpack.plugins);
    }
}

module.exports = webpackConfig;
