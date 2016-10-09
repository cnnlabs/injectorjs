module.exports = {
    entry: {
            level1: "./entries/level1.js",
            level2: "./entries/level2.js",
            level3: "./entries/level3.js",
            level4: "./entries/level4.js",
            level5: "./entries/level5.js",
            handlers: "./entries/handlers.js",
            status: "./entries/status.js"
          },
    output: {
        path: __dirname,
        filename: "./bundles/[name].js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "html" }
        ]
    }
};
