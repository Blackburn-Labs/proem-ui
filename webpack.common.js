const path = require('path');

module.exports = {
    entry: './renderer.js',
    output: {
        path: __dirname,
        filename: './renderer-bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.json$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'json-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][local]-[hash:base64]',
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|gif)$/,
                use: [{ loader: 'url-loader', options: { limit: 100000 } }],
            },
            {
                test: /\.(jpg|jpeg)$/,
                use: [{ loader: 'file-loader', options: { name: '[name]-target.[ext]?[hash]', outputPath: 'img/', publicPath: 'img/' } }],
            },
        ],
    },
    resolve: {
        modules: [
            path.resolve('./'),
            path.join(__dirname, 'node_modules'),
        ],
    },
};
