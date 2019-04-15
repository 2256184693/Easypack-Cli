/**
 * load configurations in target project
 *
 * Created By SH
 */

var loaded = false;

module.exports = {
  init: function(force) {
    if(!loaded || force) {
      loaded = true;
      load();
    }
  }
};

function load() {

};
