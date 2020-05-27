const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

console.log('WebPack Executing in LOCAL mode'); // eslint-disable-line no-console

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
    // devtool: 'source-map', // used for highly accurate source maps, but very slow rebuilds
    // devtool: 'cheap-module-eval-source-map', // Pretty accurate source maps, with fast rebuilds.
    devtool: 'eval', // not very accurate source maps, but very fast rebuilds.
    devServer: {
        port: 8888,
        open: true,
        stats: 'errors-only',
    },
    externals: {
        Config: JSON.stringify({
            appUrl: '{{to be added}}',
            apiUrl: '{{to be added}}',
            apiKey: '{{to be added}}',
            apiId: '{{to be added}}',
            isDebugging: true,
            mode: 'LOCAL',
        }),
    },
});
