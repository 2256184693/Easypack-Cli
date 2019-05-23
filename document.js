export default {
  openBrowser: [true, false, 'http:127.0.0.1:9000/index.html'],
  commonPack: [true, false, '__common__'],
  analyze: [true, false, {
    analyzerMode: 'static',
    reportFilename: 'report.html'
  }],
  optimizeCss: [true, false, { 'optimize-css-assets-webpack-plugins': {} }],
  cssLoader: {
    extensions: ['.css', '.scss', '.sass', '.less', 'stylus'],
    happypack: [true, false],
    vue: [true, false],
    sass: {},
    scss: {},
    less: {},
    postcss: {},
    stylus: {},
  }
}
