
var path = require("path");

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  openBrowser: false,
  analyze: false,
  entry: {
    index: './src/index.js'
  },
  entryHtml: [
    {
      filename: 'index.html',
      template: resolve('./src/index.html'),
      inject: 'body',
      chunks: ['index']
    }
  ],
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.css', 'scss', '.less', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
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
      // {
      //   enforce: 'pre',
      //   test: /\.js|\.vue$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     cache: false,
      //   }
      // },
    ]
  },
  plugins: []
}
