import Vue from 'vue'

import App from './App.vue';

import router from './router';

import DemoVc from './demo/main.vue';

import Demo from './router/bin/demo';

router.addRoute({
  path: '/demo',
  component: DemoVc,
  children: Demo
});

Vue.config.productionTip = false;

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './plugins/gourd';

import axios from './plugins/axios';
axios.defaults.baseURL = 'http://192.168.1.2:3000';

import './plugins/vant';

import store from './store/index';
store.dispatch('getUserStatus');


// 全局过滤器
import './common/js/filters';

import './common/css/index.less';

Vue.use(Element);


// 公共
Vue.prototype.$bus = new Vue({});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
