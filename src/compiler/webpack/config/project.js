/**
 * 项目配置类 继承自默认Config类
 *
 * Created By SH
 */

const path = require('path');

var ConfigFactory = require('./base.js');

class Project extends ConfigFactory {
  constructor(easyConfig, workspace, env) {
    super(easyConfig, workspace, env);
    this.setEntry();
  }

  getConfig() {
    return this.config;
  }

  setEntry() {
    if(this.env === 'dev') {
      let entry = this.config.entry;
      Object.keys(entry).forEach(entryKey => {
        entry[entryKey] = [path.join(__easy__.root, './src/client/client.dev.js')].concat(entry[entryKey]);
      });
    }
    return this;
  }
}

module.exports = Project;
