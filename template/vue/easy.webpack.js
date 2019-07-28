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

  // parallel: true,

  libraryMode: 'custom', // dll依赖方式 ['custom'|'all']
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
    rules: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader'
      // },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [resolve('src')]
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: 'static/img/[name].[hash:7].[ext]'
      //   }
      // },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: 'static/fonts/[name].[hash:7].[ext]'
      //   }
      // }
    ]
  },
  plugins: [
    // new VueLoaderPlugin()
  ]
}
