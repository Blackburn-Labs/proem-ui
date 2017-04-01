/* eslint-disable strict */


/**
 * Use these settings object to pass environment specific values to the app (like your API's URL)
 */
const isDebug = !(process.env.NODE_ENV === 'production');

const prodSettings = {
  isDebugging: isDebug,
};

const devSettings = {
  isDebugging: isDebug,
};

const localSettings = {
  isDebugging: isDebug,
};

let config = localSettings;
if (process.env.NODE_ENV === 'production') {
  config = prodSettings;
} else if (process.env.NODE_ENV === 'dev') {
  config = devSettings;
}

module.exports = {
  entry: './renderer.js',
  output: {
    filename: './renderer-bundle.js',
  },
  externals: {
    Config: JSON.stringify(config),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
          plugins: ['transform-decorators-legacy'],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            modules: true,
            localIdentName: '[path][local]-[hash:base64]',
            minimize: !isDebug,
          })}`,
        ],
      },
      { test: /\.png$/, loader: 'url-loader?limit=100000&name=[path][name]-target.[ext]?[hash]' },
      { test: /\.jpg$/, loader: 'file-loader?name=[path][name]-target.[ext]?[hash]' },
    ],
  },
};
