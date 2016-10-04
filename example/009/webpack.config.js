module.exports = {
    entry: {
            react: "./entries/react.js"
          },
    output: {
        path: __dirname,
        filename: "./bundles/[name].js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "babel",query: { presets:['react']} }
        ]
    }
};
