var path = require('path');

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

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
  entryHtml: [{
    filename: 'index.html',
    template: './index.html',
    inject: 'body',
    chunks: ['index', 'vendor']
  }],
  // webpack入口
  entry: {
    index: resolve("./src/main.js")
  },

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
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
    }
  }
}
