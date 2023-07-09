// baseFun.js

import Vue from 'vue';

// 定义全局函数对象
const globalFunctions = {
  // 返回上一页
  goBack(router) {
    router.back();
  },

  // 10进制颜色代码转换
  decimalToHexColor(decimalColor) {
    var hex = decimalColor.toString(16);
    var hexColor = '#' + hex.slice(hex.length - 6);
    console.log(hexColor);
    return hexColor;
  }

};



// 将全局函数对象添加到 Vue 原型上
Vue.prototype.$globalFunctions = globalFunctions;
