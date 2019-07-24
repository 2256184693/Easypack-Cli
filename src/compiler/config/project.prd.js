/**
 * Easy-Project
 * Production
 * Created By SH
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (workspace, easyConfig) => {
  let config = {
    mode: 'production',
    stats: 'verbose',
    plugins: [],
    // TODO:
    optimization: {
      splitChunks: {
        chunks: 'async',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20
          }
        }
      }
    }
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
