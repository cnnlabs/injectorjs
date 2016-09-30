module.exports = {
    entry: "./entries/hellos.js",
    output: {
        path: __dirname,
        filename: "./bundles/hellos.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "html" }
        ]
    }
};
