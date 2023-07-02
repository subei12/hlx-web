import Vue from 'vue';

import axios from 'axios';

import md5 from 'js-md5';

import qs from "qs"

// 请求拦截器
axios.interceptors.request.use(config => {
  const loginStatus = localStorage.getItem("loginStatus");
  if(loginStatus != 1){
    return config;
  }
  // 拼上key
  var { user, _key } = JSON.parse(window.localStorage.getItem('user') || '{}');
  config.url = config.url + '?_key=' + _key;
  return config;
  
}, error => {
  return Promise.reject(error);
})

axios.interceptors.response.use(function(res){
    // console.log(res);
    return res.data;
});


/**
 * 封装请求
 */
axios.methods = {
  postForm(url, params, signParam) {
      return postWithSign(url, params, signParam);
  },
  postBody(url, data, signParam) {
      return postWithSign(url, data, signParam, 'json');
  }
}


// 通用参数
const baseParams = {
  device_code: '[d]f63ffbcf-5b3c-480a-a83a-d1e59bc907fa'
};

/**
 * 自定义带签名的 POST 方法
 * @param {*} url 
 * @param {*} data 
 * @param {*} signParam 需要签名的参数
 * @param {*} contentType 请求头，区分json还是form表单类型的参数
 * @returns 
 */
function postWithSign(url, data = {}, signParam = {}, contentType = 'form') {
  // 在这里进行签名计算的逻辑，将签名参数添加到 data 中
  signParam = { ...baseParams, ...signParam };
  //console.log("signParam == > " + JSON.stringify(signParam));
  const sign = toSign(signParam);
  data = { ...baseParams, ...data };
  //this.$set(data, 'sign', sign);
  data.sign = sign;

  // 设置请求头
  const headers = {
    "Content-Type": contentType == "form" ? 'application/x-www-form-urlencoded' : "application/json"
  };
  data = contentType == "json" ? data : qs.stringify(data);

  // 调用默认的 axios.post() 方法，并将 data 作为请求体传递
  return axios.post(url, data, { headers })
    .then(response => response)
    .catch(error => {
      console.error('POST request error:', error);
      throw error;
    });
};

function toSign(map) {
  /*const map = {
    post_id: '44379114',
    comment_id: '0',
    text: '测试一下。',
    images: null,
    _key: '0F8C906E569123406856F91DFC7B0AB1675B3308AA8130698A9A9FAA7CFE5A49B07FF23374E0CA318797130DF6D3723B7C3F926A157393BE',
    device_code: '[d]0798b1d9-b039-4152-a820-7ddf1a63f55f',
  };*/

  const keys = Object.keys(map);
  keys.sort();

  let concatenatedString = '';
  for (const key of keys) {
    const value = map[key] || '';
    concatenatedString += key + value;
  }
  concatenatedString += 'fa1c28a5b62e79c3e63d9030b6142e4b';
  console.log("signParam == > " + JSON.stringify(concatenatedString));
  const sign = md5(concatenatedString);

  console.log('sign ==>', sign);
  return sign;
};




// Vue.prototype.http = axios;
// 注册自定义方法到 Vue 的原型属性
Vue.prototype.http = {
  postForm: axios.methods.postForm,
  postBody: axios.methods.postBody,
  get: axios.get,
  post: axios.post,
};

export default axios;