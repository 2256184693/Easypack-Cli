
var path = require("path");
var HappyPack = require('happypack');
var os = require("os");
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'scripts/[name].[hash].js',
    publicPath: ''
  },
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     loaders: emiUtils.cssLoader(cssLoader)
      //   }
      // },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|swf)(\?.*)?$/,
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
      },
      {
        enforce: 'pre',
        test: /\.js|\.vue$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: false,
        }
      },
    ]
  },
  plugins: [
    // 多线程加速打包速度
    new HappyPack({
      id: "babel",
      threadPool: happyThreadPool,
      cache: true,
      loaders: [
        {
          loader: "babel-loader",
          query: {
            cacheDirectory: path.resolve(__dirname, "./.cache")
          }
        }
      ]
    })
  ]
}
