import Vue from 'vue';
import app from '@/app/app';
import router from './router';
import store from './store';
import VueModuleRoutes from '@mmathias/vue-module-routes';
import error from '@/app/error/error';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueModuleRoutes, { router, error });

new Vue({
  router,
  store,
  render: (h) => h(app),
}).$mount('#app');
