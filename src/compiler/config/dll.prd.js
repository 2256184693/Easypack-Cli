/**
 * Easy-Dll
 * Production
 * Created By SH
 */

const webpack = require('webpack');

const V = require('../../utils/const.js');

const TerserJSPlugin = require('terser-webpack-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (workspace, easyConfig, dll) => {
  let config = {
    mode: 'production',
    optimization: {
      minimizer: [
        new TerserJSPlugin(),
        new OptimizeCssAssetsPlugin({})
      ]
    },
    plugins: [
      new webpack.DllPlugin({
        context: workspace,
        name: V.DEFAULT_DLL_CHUNK_NAME,
        path: dll.manifestPath,
      })
    ]
  };
  return config;
}
