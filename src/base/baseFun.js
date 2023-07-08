// baseFun.js

import Vue from 'vue';

// 定义全局函数对象
const globalFunctions = {
  // 返回上一页
  goBack(router) {
    router.back();
  },
};

// 将全局函数对象添加到 Vue 原型上
Vue.prototype.$globalFunctions = globalFunctions;
