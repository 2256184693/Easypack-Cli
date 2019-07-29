/**
 * Easy-Project
 * Production
 * Created By SH
 */

const pluginFactory = require('../utils/pluginFactory.js');

module.exports = (workspace, easyConfig) => {
  let config = {
    mode: 'production',
    plugins: [],
    optimization: {
      minimizer: [
        pluginFactory.terserPlugin(),
        pluginFactory.optimizeCssPlugin(),
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
    config.plugins.push(pluginFactory.analyzePlugin(easyConfig.analyze));
  }
  return config;
};
