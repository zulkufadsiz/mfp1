const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'development', 

  entry: './index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // helpful if using history API por federated modules
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // optional if using modern JS
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // if using CSS
      },
    ],
  },
  resolve: { fallback: { 'process/browser': require.resolve('process/browser'), } },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3001,
    open: true,
    hot: true,
    historyApiFallback: true, // good for SPAs
  },

  devtool: 'source-map', // great for debugging
  plugins: [
    new webpack.ProvidePlugin({
           process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',
        }),
],
};
