'use strict';

module.exports = function (webpack) {
    return {
        entry: {
            gallery: './src/demo/components/gallery/index.js',   
            lazy_images: './src/demo/components/lazy-images/index.js',
            share_bar: './src/demo/components/share-bar/index.js'            
        },
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
