var path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  analyze: true,
  openBrowser: false,

  // library: {
  //   'vendor': [
  //     'vue', 'vue-router', 'vuex'
  //   ]
  // },

  entry: {
    index: resolve("./src/main.js")
  },

  // htmlMode: "inject",

  entryHtml: [{
    filename: "index.html",
    template: "./index.html",
    inject: "body",
    chunks: ["index"]
  }],
  // historyApi : true, //开启HTML5 historyAPI  server 使用 所有的访问都到index.html 下
  cssLoader: {
    vue: true,
    extensions: ['.css', '.scss', '.sass', '.less'],
    css: {},
    scss: {}
  },

  // proxyTable: {},

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
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
