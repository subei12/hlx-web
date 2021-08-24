import Vue from 'vue';


// icon
import './assets/image/iconfont.css';
import './assets/test/iconfont.css';


import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// import './plugins/gourd';
import './plugins/axios';
// import './plugins/vant';

import store from './store/index';

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
