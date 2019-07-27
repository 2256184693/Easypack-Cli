/**
 * Easy-Dll
 * Development
 * Created By SH
 */

const webpack = require('webpack');

const V = require('../../utils/const.js');

module.exports = (workspace, easyConfig, dll) => {
  let config = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
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
