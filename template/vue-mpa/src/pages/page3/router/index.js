import Vue from 'vue';

import Router from 'vue-router';

import Page1 from '../containers/Page1.vue';
import Page2 from '../containers/Page2.vue';
import Page3 from '../containers/Page3.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: Page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: Page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: Page3
    },
    {
      path: '/',
      redirect: '/page1'
    }
  ]
});
