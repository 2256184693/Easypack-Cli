const webpack = require('webpack');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const createCssLoader = require('../../utils/cssLoader.js');

var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = function(workspace, easyConfig) {
  var config = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ]
  };
  if(easyConfig.cssLoader && easyConfig.cssLoader.happypack) {
    let loadersMap = createCssLoader.createHappypackLoaders(easyConfig.cssLoader, 'dev', true);
    Object.keys(loadersMap).forEach(key => {
      let _loader = loadersMap[key];
      config.plugins.push(new HappyPack({
        id: key,
        threadPool: happyThreadPool,
        loaders: _loader,
        debug: true,
      }));
    });
  }
  return config;
}
