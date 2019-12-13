/**
 * Easy-Project
 * Development
 * Created By SH
 */

const webpack = require('webpack');

const pluginFactory = require('../utils/pluginFactory.js');

module.exports = (workspace, easyConfig) => {
  let config = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      pluginFactory.friendlyErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ]
  };
  return config;
};
