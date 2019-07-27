var path = require('path');
var HappyPack = require('happypack');
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const VueLoaderPlugin = require('vue-loader/lib/plugin');


function resolve(dir) {
  return path.join(__dirname, './', dir)
}

// Plugins
// -------------------------------
var plugins = [
  new HappyPack({
    id: 'babel',
    threadPool: happyThreadPool,
    cache: true,
    loaders: [
      {
        loader: 'babel-loader',
        // query: {
        //   cacheDirectory: path.resolve(__dirname, './.cache')
        // }
      }
    ]
  }),
  new VueLoaderPlugin()
];


module.exports = {
  analyze: false,
  libraryManual: 'group',
  library: {
    'vendor1': [
      'vue', 'vue-router',
    ],
    'vendor2': [
      'vuex'
    ]
  },

  entry: {
    index: './src/main.js'
  },

  htmlMode: 'inject',

  entryHtml: [{
    filename: 'index.html',
    template: './index.html',
    inject: 'body',
    chunks: ['index', 'vendor']
  }],
  //historyApi : true, //开启HTML5 historyAPI  server 使用 所有的访问都到index.html 下
  cssLoader: {
    extra: true,
    happypack: true, // default true
    vue: true
  },

  proxyTable: {
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    mainFiles: ['index', 'index.vue'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: emiUtils.cssLoader(
            {
              extract: true,
              happypack: true
            }
          )
        }
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
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
  plugins: plugins
}
