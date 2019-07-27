/**
 * Easy-Project
 * Production
 * Created By SH
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const TerserJSPlugin = require('terser-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (workspace, easyConfig) => {
  let config = {
    mode: 'production',
    plugins: [],
    optimization: {
      minimizer: [
        new TerserJSPlugin(),
        new OptimizeCssAssetsPlugin({})
      ]
    }
    // TODO:
    // optimization: {
    //   splitChunks: {
    //     chunks: 'async',
    //     cacheGroups: {
    //       vendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: -10
    //       },
    //       default: {
    //         minChunks: 2,
    //         priority: -20
    //       }
    //     }
    //   }
    // }
  };

  if(easyConfig.analyze) {
    if(easyConfig.analyze === true) {
      easyConfig.analyze = {
        analyzerMode: 'static',
      };
    }
    config.plugins.push(new BundleAnalyzerPlugin(easyConfig.analyze));
  }
  return config;
};
