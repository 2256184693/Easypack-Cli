/**
 * common loader create functions
 * 
 * Created By SH
 */

const vueLoader = (opts = {
  test: /\.vue$/,
  loader: 'vue-loader',
}) => opts;

const jsLoader = (opts = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true
  }
}) => opts;

const imageLoader = (env = 'prd', opts) => opts ? opts : {
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  query: {
    limit: 10000,
    name: env !== 'prd' ? 'static/[name].[ext]' : 'static/[name].[hash:7].[ext]'
  }
};

const fontLoader = (env = 'prd', opts) => opts ? opts : {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  query: {
    limit: 10000,
    name: env !== 'prd' ? 'static/[name].[ext]' : 'static/[name].[hash:7].[ext]'
  }
};

module.exports = {
  /**
   * loader list
   */
  vueLoader,
  jsLoader,
  imageLoader,
  fontLoader
  /**
   * tools
   */
}