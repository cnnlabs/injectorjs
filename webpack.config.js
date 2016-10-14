module.exports = {
    entry: {
        'injector.standalone': './src/entries/injector.standalone.js'
    },
    output: {
        path: __dirname,
        filename: 'bundles/[name].js'
    }
};
