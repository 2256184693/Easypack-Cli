/**
 * dll-manifest-plugin
 * 将生成的dll以及name以key/value的形式存储在json中，并在项目编译过程中使用。
 * Created By SH
 */

const _ = require('lodash');

const fs = require('fs');

const path = require('path');

const dllLog = log.namespace('DLL');

class DllManifestPlugin {
  constructor(opts) {
    this.opts = _.assign({
      path: '',
      filename: 'dll-manifest.json'
    }, opts || {});
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('DllManifestPlugin', (compilation, callback) => {
      let chunks = compilation.namedChunks;
      let data = {};
      for(let [key, chunk] of chunks) {
        data[key] = chunk.files;
      }
      let outputPath = this.opts.path || compiler.outputPath;
      let filePath = path.join(outputPath, './', this.opts.filename);
      fs.writeFileSync(filePath, JSON.stringify(data));
      dllLog.info(`manifest file created successfully: ${filePath}`);
      callback();
    })
  }
}

module.exports = DllManifestPlugin;
