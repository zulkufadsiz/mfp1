const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

module.exports = {
  mode: 'development', 
  output: {
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
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    }, // good for SPAs
  },

  plugins: [
    new webpack.ProvidePlugin({
           process: 'process/browser',
    }),
    new HtmlWebpackPlugin({
        template: 'public/index.html',
        }),
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      remotes: {
        news: 'news@http://localhost:3001/remoteEntry.js',
        sideNews: 'sideNews@http://localhost:3002/remoteEntry.js',
      },
      shared:[]
    }),  
],
};
