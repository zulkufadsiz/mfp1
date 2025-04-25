const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

module.exports = {
  mode: 'development', 
  output: {
    publicPath: 'http://localhost:3001/', // helpful if using history API por federated modules
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
    port: 3001,
    historyApiFallback:{
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
        name: 'news',
        filename: 'remoteEntry.js',
        exposes: {
          './News': './src/bootstrap', // path to the component
        },
        shared: []
    }),     
],
};
