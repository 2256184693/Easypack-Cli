const path = require('path');

const glob = require('glob');

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

// 提取每个入口的名称
let modules = glob.sync('./src/pages/*/index.js').map(f => {
  return /.*\/(src\/pages\/(.*?)\/index)\.js/.exec(f)[2];
});

let entryHtml = [];

let entryMap = {};

modules.forEach(name => {
  entryMap[name] = `./src/pages/${name}/index.js`;
  entryHtml.push({
    filename: `${name}.html`,
    template: `./index.html`,
    inject: 'body',
    chunks: [name]
  });
});

module.exports = {
  // build完成后打开analyzer分析
  analyze: false,
  // 默认打开浏览器
  openBrowser: true,
  // 是否vue
  vue: true,
  // 开启parallel
  parallel: true,
  // dll依赖方式 all(default) | custom
  libraryMode: 'all',
  // dll配置
  library: {
    'vendor': [
      'vue', 'vue-router', 'vuex',
    ]
  },
  // html配置
  entryHtml: entryHtml,
  // webpack入口
  entry: entryMap,

  output: {
    path: resolve('./dist')
  },

  // cssLoader相关配置
  cssLoader: {
    extensions: ['.css', '.scss', '.sass', '.less'],
    css: {},
    scss: {}
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': resolve('src'),
      'common': resolve('src/common'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
    }
  }
}
