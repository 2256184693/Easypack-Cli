/**
 * Easy-Dll
 * Production
 * Created By SH
 */

const webpack = require('webpack');

const V = require('../../utils/const.js');

const pluginFactory = require('../utils/pluginFactory.js');

module.exports = (workspace, easyConfig, dll) => {
  let config = {
    mode: 'production',
    optimization: {
      minimizer: [
        pluginFactory.terserPlugin(),
        pluginFactory.optimizeCssPlugin(),
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
