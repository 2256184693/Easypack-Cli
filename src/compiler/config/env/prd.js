const webpack = require('webpack');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(workspace, easyConfig) {
  var config = {
    mode: 'production',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }
      }),
      new ExtractTextWebpackPlugin({
        filename: 'styles/[name].[contenthash].css'
      }),
    ]
  };

  if(easyConfig.optimizeCss) {
    if(easyConfig.optimizeCss === true) {
      easyConfig.optimizeCss = {
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        }
      }
    }
    config.plugins.push(new OptimizeCssPlugin(easyConfig.optimizeCss));
  }

  config.plugins.push(new webpack.HashedModuleIdsPlugin(easyConfig.HashedModuleIds));

  // CSS HappyPack

  // ExtractTextPlugin

  // Static

  if(easyConfig.analyze) {
    if(easyConfig.analyze === true) {
      easyConfig.analyze = {
        analyzerMode: 'static',
      };
    }
    config.plugins.push(new BundleAnalyzerPlugin(easyConfig.analyze));
  }

  return config;
}
