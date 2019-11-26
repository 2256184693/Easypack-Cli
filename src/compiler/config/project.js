/**
 * EasyProject 项目配置类
 *
 * Created By SH
 */

const _ = require('lodash');

const path = require('path');

const Base = require('./base.js');

const createCssLoader = require('../utils/cssLoader.js');

const webpack = require('webpack');

const webpackMerge = require('webpack-merge');

const V = require('../../utils/const.js');

const devConfig = require('./project.dev.js');

const prdConfig = require('./project.prd.js');

const pluginFactory = require('../utils/pluginFactory.js');

const loaderFactory = require('../utils/loaderFactory.js');

class EasyProject extends Base {
  constructor(easyConfig, workspace, env) {
    super(easyConfig, workspace, env);
    this.setEntry();
    this.mergeEnvConfig();
    this.init();
  }
  init() {
    this.setOutPut();
    this.setResolve();
    this.setResolveLoaders();
    this.setLoaders();
    this.setCssLoaders();
    this.setPlugins();
    this.setDllPlugin();
    this.setEntryHtml();
  }
  mergeDevConfig() {
    let customConfig, defaultConfig;
    if(_.isFunction(this.easyConfig._devConfig)) {
      customConfig = this.easyConfig._devConfig(this.workspace, this.easyConfig);
    }
    defaultConfig = devConfig(this.workspace, this.easyConfig);
    this.config = webpackMerge(defaultConfig, this.config, customConfig);
  }
  mergePrdConfig() {
    let customConfig, defaultConfig;
    if(_.isFunction(this.easyConfig._prdConfig)) {
      customConfig = this.easyConfig._prdConfig(this.workspace, this.easyConfig);
    }
    defaultConfig = prdConfig(this.workspace, this.easyConfig);
    this.config = webpackMerge(defaultConfig, this.config, customConfig);
  }
  setEntry() {
    // dev环境增加热更新入口entry
    if(this.env === 'dev') {
      let entry = this.config.entry;
      Object.keys(entry).forEach(entryKey => {
        entry[entryKey] = [path.join(__easy__.root, './src/client/client.dev.js')].concat(entry[entryKey]);
      });
    }
    return this;
  }
  setOutPut() {
    var output = this.config.output || {};
    if(!output.path) {
      this.config.output = Object.assign(output, {
        path: this._outPutPath()
      });
    }
    if(!output.filename) {
      this.config.output = Object.assign(output, {
        filename: this._outPutFileName()
      });
    }
    if(!output.publicPath) {
      this.config.output = Object.assign(output, {
        publicPath: this._outputPublicPath()
      });
    }
  }
  setLoaders() {
    let rules = this.config.module.rules || [];
    let hasVue, hasImage, hasJs, hasFont;
    let extraRules = [];
    rules.forEach(loader => {
      if(loader.test) {
        if(hasLoader(loader.test, ['.vue'])) {
          hasVue = true;
        }else if(hasLoader(loader.test, ['.js', 'jsx', '.ts', 'tsx'])) {
          hasJs = true;
        }else if(hasLoader(loader.test, ['.png', '.jpg', 'jpeg', 'webp', 'gif', '.svg'])) {
          hasImage = true;
        }else if(hasLoader(loader.test, ['.ttf', '.otf', '.eot', '.woff2'])) {
          hasFont = true;
        }
      }
    });
    if(!hasVue && this.easyConfig.vue) {
      extraRules.push(loaderFactory.vueLoader());
    }
    if(!hasJs) {
      extraRules.push(loaderFactory.jsLoader());
    }
    if(!hasImage) {
      rules.push(loaderFactory.imageLoader(this.env));
    }
    if(!hasFont) {
      rules.push(loaderFactory.fontLoader(this.env));
    }
    if(this.easyConfig.parallel) { // 并行
      extraRules = extraRules.map(loaderFactory.useThread);
    }
    this.config.module.rules = rules.concat(extraRules);
  }
  setCssLoaders() {
    let rules = this.config.module.rules || [];
    let opt = this.easyConfig.cssLoader || {};
    const loaders = createCssLoader(_.merge({}, opt, {
      vue: this.easyConfig.vue
    }), this.env);

    this.config.module.rules = rules.concat(loaders);
    return this;
  }
  setPlugins() {
    let plugins = this.config.plugins;
    if(this.easyConfig.vue) {
      plugins.push(pluginFactory.vueLoaderPlugin());
    }
    plugins.push(pluginFactory.miniCssPlugin({
      filename: this._isDev() ? 'css/[name].css' : 'css/[name].[chunkhash:8].css',
      chunks: 'all',
    }));
    this.config.plugins = plugins;
  }
  setDllPlugin() {
    if(this.easyConfig.library) {
      let dllNames = Object.keys(this.easyConfig.library);
      dllNames.forEach(name => {
        this.config.plugins.push(new webpack.DllReferencePlugin({
          context: this.workspace,
          manifest: this._getDllManifest(path.join(this.config.output.path, V.DEFAULT_DLL_MANIFEST_PATH.replace(/\[name\]/, name)))
        }));
      });
    }
  }
  setEntryHtml() {
    let entryHtmls = this.easyConfig.entryHtml;
    if(entryHtmls && entryHtmls.length) {
      let _conf = this._isDev() ? {
        inject: true,
      } : {
        inject: true,
        minify: {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        }
      };
      entryHtmls.forEach(conf => {
        this.config.plugins.push(pluginFactory.htmlPlugin(Object.assign({}, _conf, conf)));
      });
      if(this.easyConfig.library) {
        this.insertDll();
      }
    }
  }
  insertDll() {
    let publicPath = this.config.output.publicPath;
    let dllFiles = this._getDllFiles();
    let libraryMode = this.easyConfig.libraryMode || 'all';
    if(libraryMode === 'all') {
      let tags = Object.keys(dllFiles).map(name => dllFiles[name]);
      tags = _.flatten(tags).map(handleDllTags(publicPath));
      this.config.plugins.push(pluginFactory.tagsPlugin({
        tags,
        publicPath,
        append: false
      }));
    }else if(libraryMode === 'custom') {
      let tagsMap = {};
      this.easyConfig.entryHtml.forEach(config => {
        let chunks = config.chunks || [];
        let tags = Object.keys(dllFiles).filter(dllKey => chunks.indexOf(dllKey) > -1);
        if(tags.length) {
          let key = tags.join('+');
          if(!tagsMap[key]) {
            tagsMap[key] = {
              tags: tags.map(tag => dllFiles[tag]),
              files: [],
            }
          }
          tagsMap[key].files.push(config.filename);
        }
      });
      if(!_.isEmpty(tagsMap)) {
        Object.keys(tagsMap).forEach(tagKey => {
          let {tags, files} = tagsMap[tagKey];
          tags = _.flatten(tags).map(handleDllTags(publicPath));
          this.config.plugins.push(pluginFactory.tagsPlugin({
            tags,
            files,
            append: false,
            publicPath
          }));
        });
      }
    }
  }

  _getDllFiles() {
    let fs = __easy__.fs || require('fs');
    let dllFiles = fs.readFileSync(path.join(this.config.output.path, V.DEFAULT_DLL_FILES_PATH));
    dllFiles = JSON.parse(dllFiles);
    return dllFiles;
  }

  _getDllManifest(filePath) {
    let fs = __easy__.fs || require('fs');
    let manifest = fs.readFileSync(filePath).toString();
    manifest =  JSON.parse(manifest);
    return manifest;
  }
}

/**
 *
 */

const handleDllTags = publicPath => tag => {
  let _path = publicPath + tag;
  if(/^(https?:)?\/\//.test(_path)) {
    return {
      path: _path
    };
  }
  return _path;
}

const hasLoader = (reg, fileList) => {
  return fileList.find(file => file.match(reg));
}
module.exports = EasyProject;
