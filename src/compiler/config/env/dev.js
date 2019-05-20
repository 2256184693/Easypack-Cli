const webpack = require('webpack');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = function(workspace, easyConfig) {
  var config = {
    mode: 'development',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      // CSS HappyPack
    ]
  };
  return config;
}
