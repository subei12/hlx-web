import Vue from 'vue';


import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

import axios from './plugins/axios';
//axios.defaults.baseURL = 'http://localhost:8000/api/';
// 打包 app 配置
axios.defaults.baseURL = 'https://f3.jsls9.top/backend/';

import store from './store/index';
store.dispatch('getUserStatus');

// 全局过滤器
import './common/js/filters';

import './common/css/index.less';

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

// 公共
Vue.prototype.$bus = new Vue({});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
