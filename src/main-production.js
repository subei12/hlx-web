import Vue from 'vue';


import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

import './plugins/axios';

import store from './store/index';
store.dispatch('getUserStatus');

// 全局过滤器
import './common/js/filters';

import './common/css/index.less';

// 公共
Vue.prototype.$bus = new Vue({});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
