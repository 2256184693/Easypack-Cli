/**
 * common loader create functions
 *
 * Created By SH
 */

// TODO: 考虑 css相关的loader迁移到此的可能性

const _ = require('lodash');

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
  options: {
    limit: 10000,
    name: env !== 'prd' ? 'static/[name].[ext]' : 'static/[name].[hash:7].[ext]'
  }
};

const fontLoader = (env = 'prd', opts) => opts ? opts : {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: env !== 'prd' ? 'static/[name].[ext]' : 'static/[name].[hash:7].[ext]'
  }
};

const useThread = rule => {
  if(rule.use && rule.use.length) {
    return {
      ...rule,
      use: ['thread-loader', ...rule.use]
    }
  }else if(rule.loader) {
    let _rule = _.merge({}, rule);
    delete _rule.test;
    return {
      test: rule.test,
      use: ['thread-loader', _rule]
    };
  }
};

module.exports = {
  /**
   * loader list
   */
  vueLoader,
  jsLoader,
  imageLoader,
  fontLoader,
  /**
   * tools
   */
  useThread,
}
