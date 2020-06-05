var path = require('path');

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  // build完成后打开analyzer分析
  analyze: false,
  // 默认打开浏览器
  openBrowser: false,
  // 是否vue
  vue: false,
  // 开启parallel
  parallel: true,
  // dll依赖方式 all(default) | custom
  libraryMode: 'all',
  // dll配置
  library: {
    'vendor': [
      'react', 'react-dom', 'react-router'
    ]
  },
  // html配置
  entryHtml: [{
    filename: 'index.html',
    template: './index.html',
    inject: 'body',
    chunks: ['vendor', 'index']
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
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@components': resolve('src/components'),
      '@container': resolve('src/container')
    }
  }
}
