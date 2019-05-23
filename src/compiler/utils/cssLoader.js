/**
 * cssLoader
 */

const _ = require('lodash');

const CSS_LOADER_KEY_MAP = {
  'css': 'css',
  'sass': 'sass',
  'scss': 'scss',
  'less': 'less',
  'stylus': 'stylus',
};

const DEFAULT_CONFIG = {
  'dev': {
    css: { minimize: false },
    sass: { indentedSyntax: true },
    scss: {},
    less: {},
    stylus: {},
    postcss: {},
  },
  'prd': {
    css: { minimize: true },
    sass: { indentedSyntax: true },
    scss: {},
    less: {},
    stylus: {},
    postcss: {},
  }
};

function getExtensions(opt) {
  let exts = opt.extensions || ['.css', '.scss', '.sass', '.less'];

  exts = exts.map(ext => {
    if(ext.indexOf('.') > -1) {
      ext = ext.split('.')[1];
    }
    return ext;
  }).filter(ext => {
    let key = CSS_LOADER_KEY_MAP[ext];
    return key;
  });

  return exts;
}

function getCustomByKey(opt, key) {
  var data = opt[key];
  if(_.isPlainObject(data)) {
    return data;
  }else if(_.isFunction(data)) {
    return data(process.env.NODE_ENV);
  }else {
    return {};
  }
}

function getLoadersMap(opt, defaultConfig, sourceMap) {
  let exts = getExtensions(opt);

  let map = {};
  exts.forEach(ext => {
    let key = CSS_LOADER_KEY_MAP[ext];
    if(opt.happypack) {
      map[key] = ['happypack/loader?id=' + key];
    }else {
      let loaders = [
        {
          loader: 'css-loader',
          options: Object.assign({}, defaultConfig.css, { sourceMap }, getCustomByKey(opt, 'css'))
        },
        {
          loader: 'postcss-loader',
          options: Object.assign({}, defaultConfig.postcss, { sourceMap }, getCustomByKey(opt, 'postcss'))
        }
      ];
      if(ext !== 'css') {
        loaders.push({
          loader: `${key}-loader`,
          options: Object.assign({}, defaultConfig[key], { sourceMap }, getCustomByKey(opt, key))
        });
      }
      map[key] = loaders;
    }
  });
  return map;
}

module.exports = createCssLoader;

function createCssLoader(opt, env) {
  if(!env) {
    env = process.env.NODE_ENV === 'production' ? 'prd' : 'dev';
  }

  if(env === 'prd') {
    return createPrdLoaders(opt);
  }else {
    return createDevLoaders(opt);
  }
}

function createDevLoaders(opt) {
  let loaders = [];
  let exts = getExtensions(opt);
  let loadersMap = getLoadersMap(opt, DEFAULT_CONFIG.dev, true);

  let fallback = opt.fallback || (opt.vue ? 'vue-style-loader': 'style-loader');

  loaders = exts.map(ext => {
    let loaderKey = CSS_LOADER_KEY_MAP[ext];
    let loader = loadersMap[loaderKey];
    loader.splice(0, 0, fallback);
    return {
      test: new RegExp('\\.' + ext + '$'),
      use: loader
    };
  });
  return loaders;
};

function createPrdLoaders(opt) {};
