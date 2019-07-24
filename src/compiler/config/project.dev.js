/**
 * Easy-Project
 * Development
 * Created By SH
 */

const webpack = require('webpack');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = (workspace, easyConfig) => {
  let config = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ]
  };
  return config;
};
