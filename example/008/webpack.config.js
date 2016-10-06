module.exports = {
    entry: {
            user: "./entries/user.js",
            location: "./entries/location.js",
            account: "./entries/account.js"
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
