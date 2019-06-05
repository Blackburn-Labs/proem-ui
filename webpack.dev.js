const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

console.log('WebPack Executing in DEV mode'); // eslint-disable-line no-console

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
    devtool: 'source-map',
    externals: {
        Config: JSON.stringify({
            appUrl: '{{to be added}}',
            apiUrl: '{{to be added}}',
            apiKey: '{{to be added}}',
            apiId: '{{to be added}}',
            isDebugging: true,
            mode: 'DEV',
        }),
    },
});
