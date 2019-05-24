const webpack = require('webpack');

const createCssLoader = require('../../utils/cssLoader.js');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

const  os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = function(workspace, easyConfig) {
  var config = {
    mode: 'production',
    devtool: false,
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

  let cssLoader = easyConfig.cssLoader || {};

  if(cssLoader.pack) {
    if(cssLoader.pack === true) {
      cssLoader.pack = {
        filename: 'styles/[name].[contenthash:8].css'
      };
    }
    config.plugins.push(new ExtractTextWebpackPlugin(cssLoader.pack));
  }

  if(cssLoader.optimize){
    if(cssLoader.optimize === true) {
      cssLoader.optimize = {
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        }
      };
    }
    config.plugins.push(new OptimizeCssPlugin(cssLoader.optimize));
  }

  // HashId
  config.plugins.push(new webpack.HashedModuleIdsPlugin(easyConfig.HashedModuleIds));

  // HappyPack

  if(cssLoader.happypack) {
    let loadersMap = createCssLoader.createHappypackLoaders(cssLoader, 'prd', true);
    Object.keys(loadersMap).forEach(key => {
      let _loader = loadersMap[key];
      config.plugins.push(new HappyPack({
        id: key,
        threadPool: happyThreadPool,
        loaders: _loader,
      }));
    });
  }

  // ExtractTextPlugin
  if(Object.keys(easyConfig.entry).length > 1 && easyConfig.commonPack) {
    config.plugins[1] = new ExtractTextWebpackPlugin({
      filename: 'styles/[name].[contenthash].css',
      allChunks: true,
    });
  }

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
