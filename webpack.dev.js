const path = require('path');
const commom = require('./webpack.common');
const {merge} = require('webpack-merge');

module.exports = merge(commom, {
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        historyApiFallback: true
    },
    externals: {
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000'
        })
    }
});