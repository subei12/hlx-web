// api.js

import Vue from 'vue';

import http from '../plugins/axios';

// 定义全局函数对象
const globalFunctions = {

  // 查询消息
  getMessages(params){
    return http.get('/message/new/list/ANDROID/4.1.8', {
      params: params
    });
  }


};



// 将全局函数对象添加到 Vue 原型上
Vue.prototype.$api = globalFunctions;
