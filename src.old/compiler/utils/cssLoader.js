/**
 * cssLoader configuration
 *
 * Created By SH
 */

const _ = require('lodash');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const V = require('../../utils/const.js');

const getExtensions = (config) => {
  let exts = config.extensions || ['css', 'scss', 'sass', 'less'];
  return exts.map(ext => {
    if(~ext.indexOf('.')) {
      return ext.split('.')[1];
    }
    return ext;
  }).filter(ext => {
    return V.DEFAULT_CSS_LOADER_KEYS[ext];
  });
}

const getLoadersMap = (exts, config, env) => {
  let sourceMap = env === 'dev';
  let map = {};
  exts.forEach(ext => {
    let loaderKey = V.DEFAULT_CSS_LOADER_KEYS[ext];
    let defaultConfig = V.DEFAULT_CSS_LOADER_CONFIG;
    let loaders = [
      {
        loader: 'css-loader',
        options: Object.assign({}, defaultConfig.css, { sourceMap }, getCustomLoaderOption(config, loaderKey))
      },
      {
        loader: 'postcss-loader',
        options: Object.assign({}, defaultConfig.postcss, { sourceMap }, getCustomLoaderOption(config, loaderKey))
      }
    ];
    if(loaderKey !== 'css') {
      loaders.push({
        loader: `${loaderKey}-loader`,
        options: Object.assign({}, defaultConfig[loaderKey], { sourceMap }, getCustomLoaderOption(config, loaderKey))
      });
    }
    map[loaderKey] = loaders;
  });
  return map;
}

const getCustomLoaderOption = (config, loaderKey) => {
  var loaderConfig = config[loaderKey];
  if(_.isPlainObject(loaderConfig)) {
    return loaderConfig;
  }else if(_.isFunction(loaderConfig)) {
    return loaderConfig(process.env.NODE_ENV);
  }
  return {};
}

const getLoader = (styleLoader, loadersMap) => ext => {
  let loaderKey = V.DEFAULT_CSS_LOADER_KEYS[ext];
  let loaders = loadersMap[loaderKey];
  return {
    test: new RegExp('\\.' + ext + '$'),
    use: [styleLoader, ...loaders]
  };
}

const createCssLoader = (config, env) => {
  config = config || {};
  if(!env) {
    env = (process.env.NODE_ENV === 'production' ? 'prd' : 'dev');
  }
  if(env === 'prd') {
    return createPrdLoaders(config);
  }else {
    return createDevLoaders(config);
  }
}

const createDevLoaders = (config) => {
  let exts = getExtensions(config);

  let loadersMap = getLoadersMap(exts, config, 'dev');

  let styleLoader = config.vue ? 'vue-style-loader' : 'style-loader';

  let loaders = exts.map(getLoader(styleLoader, loadersMap));

  return loaders;
}

const createPrdLoaders = (config) => {
  let exts = getExtensions(config);

  let loadersMap = getLoadersMap(exts, config, 'prd');

  let styleLoader = MiniCssExtractPlugin.loader;

  let loaders = exts.map(getLoader(styleLoader, loadersMap));
  return loaders;
}



module.exports = createCssLoader;
