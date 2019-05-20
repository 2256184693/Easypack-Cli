export default {
  openBrowser: [true, false, 'http:127.0.0.1:9000/index.html'],
  commonPack: [true, false, '__common__'],
  analyze: [true, false, {
    analyzerMode: 'static',
    reportFilename: 'report.html'
  }],
  optimizeCss: [true, false, {
    //optimize-css-assets-webpack-plugin
  }],
  cssLoader: {
    extensions: ['.css', '.scss', '.sass', '.less', 'stylus'],
  }
}
