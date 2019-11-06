import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';


Vue.use(Vuex);

const state = {
  page: 'page-3'
};


var store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;

