/**
 * 项目配置类 继承自默认Config类
 *
 * Created By SH
 */

var ConfigFactory = require('./base.js');

class Project extends ConfigFactory {
  constructor(easyConfig, workspace, env) {
    super(easyConfig, workspace, env);
  }

  getConfig() {
    return this.config;
  }
}

module.exports = Project;
