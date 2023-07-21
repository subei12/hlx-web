// api.js

import Vue from 'vue';

import http from '../plugins/axios';

// 获得 13 位时间戳
function generate13DigitTimestamp() {
  const timestamp = new Date().getTime(); // 获取当前时间的Unix时间戳（毫秒）
  const thirteenDigitTimestamp = timestamp.toString().padEnd(13, '0'); // 在末尾补齐三位
  return thirteenDigitTimestamp;
}
// 生成随机字符串
function generateNonceStr(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}

// 定义全局函数对象
const globalFunctions = {
  
  // 查询消息
  getMessages(params){
    return http.get('/message/new/list/ANDROID/4.1.8', {
      params: params
    });
  },

  // 回复消息
  sendMessage(params){
    // 获得参与 sign 计算的参数
    var signParams = params;
    // 先不做带图回复，做了带图回复这里就不用处理了
    //signParams.images = null;
    return http.methods.postForm('/comment/create/ANDROID/4.2', params, signParams);
  },

  // 上传图片
  uploadImg(params, file){
    // 获得参与 sign 计算的参数
    //var signParams = params;
    var signParams = Object.assign({}, params);
    signParams.platform = 2;
    signParams.gkey = '000000';
    signParams.app_version = '4.2.0.7';
    signParams.versioncode = '20141481';
    signParams.market_id = 'floor_web';
    signParams.use_type = '2'; // 1- 8 一共8种
    signParams.timestamp = generate13DigitTimestamp();
    signParams.nonce_str = generateNonceStr(32);
    
    //var data = params;
    var fileData = Object.assign({}, params);
    fileData.file = file;
    // 封装成了垃圾
    return http.methods.postImg('/upload/v3/image', signParams, signParams, fileData);
  }


};



// 将全局函数对象添加到 Vue 原型上
Vue.prototype.$api = globalFunctions;
