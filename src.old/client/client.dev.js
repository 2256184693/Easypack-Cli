require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=false&reload=true&timeout=200000');

hotClient.subscribe(function(event) {
  if(event.action === 'reload') {
    window.location.reload(true);
  }
});
