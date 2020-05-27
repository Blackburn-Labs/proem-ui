const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

console.log('WebPack Executing in PROD mode'); // eslint-disable-line no-console

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    ],
    externals: {
        Config: JSON.stringify({
            appUrl: '{{to be added}}',
            apiUrl: '{{to be added}}',
            apiKey: '{{to be added}}',
            apiId: '{{to be added}}',
            isDebugging: false,
            mode: 'PROD',
        }),
    },
});
