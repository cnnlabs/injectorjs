'use strict';

module.exports = function (webpack) {
    return {
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
};
