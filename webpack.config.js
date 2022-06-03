const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const nodeExternals = require('webpack-node-externals');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    client: path.resolve(srcPath, './__loader__/client.ts'),
    sharding: path.resolve(srcPath, './__loader__/sharding.ts'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: srcPath,
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ESLintPlugin({ extensions: ['ts'] }),
  ],
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': path.resolve('src'),
      '@utils': path.resolve('src/utils'),
    },
  },
  output: {
    path: distPath,
    filename: '[name].js',
    clean: true,
  },
};
