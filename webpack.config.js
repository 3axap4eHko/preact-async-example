const Path = require('path');
const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV;

const PUBLIC_PATH = 'http://localhost/';

const define = new DefinePlugin({
  'DEBUG': JSON.stringify(true),
  'process.env': {
    'NODE_ENV': JSON.stringify(env),
  },
  'PUBLIC_PATH': JSON.stringify(PUBLIC_PATH),
});

const alias = {
  'preact': Path.resolve(__dirname, 'src/preact/preact.js'),
  'preact-render-to-string': Path.resolve(__dirname, 'src/preact-render-to-string/index.js'),
};

module.exports = [
  {
    entry: {
      'server': Path.resolve(__dirname, 'src/app/server.jsx'),
    },
    output: {
      path: Path.join(__dirname, 'build'),
      filename: '[name].js',
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      ],
    },
    resolve: {
      alias,
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      define,
    ],
  },
  {
    entry: {
      'index': Path.resolve(__dirname, 'src/app/client.jsx'),
    },
    output: {
      path: Path.join(__dirname, 'build/www'),
      filename: 'js/[name].js',
      publicPath: PUBLIC_PATH,
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      ],
    },
    resolve: {
      alias,
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      define,
    ],
  },
];
module.exports.PUBLIC_PATH = PUBLIC_PATH;