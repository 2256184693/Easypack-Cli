import 'src/style/common.scss';

import Vue from 'vue';

import 'common/ajax.js';

import router from './router';

import store from './vuex/store.js';

import App from './App.vue';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

