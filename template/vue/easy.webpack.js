var path = require('path');

// TODO:
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  analyze: false,

  openBrowser: false,

  vue: true,

  parallel: true,

  libraryMode: 'all', // dll依赖方式 ['custom'|'all']
  library: {
    'vendor': [
      'vue', 'vue-router', 'vuex',
    ]
  },

  entryHtml: [{
    filename: 'index.html',
    template: './index.html',
    inject: 'body',
    chunks: ['index', 'vendor']
  }],

  entry: {
    index: resolve("./src/main.js")
  },
  output: {
    path: resolve('./dist')
  },

  cssLoader: {
    extensions: ['.css', '.scss', '.sass', '.less'],
    css: {},
    scss: {}
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
    }
  },

  module: {
    rules: []
  },
  plugins: []
}
