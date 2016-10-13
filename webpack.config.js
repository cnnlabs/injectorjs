const pkg = require('./package.json');

module.exports = {
    entry: {
        'injector.lite': './src/entries/injector.lite.js',
        'injector.standalone': './src/entries/injector.standalone.js'
    },
    output: {
        path: __dirname,
        filename: `./tmp/bundles/[name].js`
    }
};
