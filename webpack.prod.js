const path = require('path');
const commom = require('./webpack.common');
const {merge} = require('webpack-merge');

module.exports = merge(commom, {
    // mode: 'production',
    mode: 'development',
    output: {
        // filename: 'main.[contentHash].js',
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        config: JSON.stringify({
            apiUrl: 'https://fypserver0.herokuapp.com'
        })
    }
});
