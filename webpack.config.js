var path = require('path');

module.exports = {
    entry: './client/js/app.js',
    output: {
        path: path.resolve('www/build/js'),
        filename: 'app.bundle.js',
        pathinfo: false
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};