import Vue from 'vue';

import axios from 'axios';

import md5 from 'js-md5';

import qs from "qs";

import router from '../router';

// 请求拦截器
axios.interceptors.request.use(config => {
  const loginStatus = localStorage.getItem("loginStatus");
  if(loginStatus != 1){
    return config;
  }
  // 拼上key
  var { user, _key } = JSON.parse(window.localStorage.getItem('user') || '{}');
  if(config.url.indexOf('_key') >= 0){
    return config;
  }
  config.url = config.url + '?_key=' + _key;
  return config;
  
}, error => {
  return Promise.reject(error);
})

axios.interceptors.response.use(function(res, config){
    // 未登录处理
    var result = res.data;
    var config = res.config;
    if(result && result.status == 0 && result.code == 103 && result.msg == '未登录'){
      console.log(config.url + "接口返回未的登录");
      // 跳转到登录页面
      router.push('/login');
    }
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
  },
  postImg(url, params, signParam, file) {
    return postWithSignImg(url, params, signParam, file);
},
}


// 通用参数
const baseParams = {
  device_code: '[d]f63ffbcf-5b3c-480a-a83a-d1e59bc907fa'
};


/**
 * 自定义带签名的 POST 方法, 上传图片专用
 * @param {*} url 
 * @param {*} data 
 * @param {*} signParam 需要签名的参数
 * @param {*} file 要上传的文件对象
 * @param {*} contentType 请求头，区分json还是form表单类型的参数
 * @returns 
 */
function postWithSignImg(url, data = {}, signParam = {}, file = {},contentType = 'form-data') {
  if(!signParam._key){
    // 没有传 key 这里加上
    signParam = addKey(signParam);
  }
  // 在这里进行签名计算的逻辑，将签名参数添加到 data 中
  signParam = { ...baseParams, ...signParam };
  //console.log("signParam == > " + JSON.stringify(signParam));
  const sign = toSignImg(signParam);
  data = { ...baseParams, ...data };
  //this.$set(data, 'sign', sign);
  data.sign = sign;

  // 使用URLSearchParams将对象转换为QueryString
  const queryString = new URLSearchParams(data).toString();
  console.log(queryString);
  // 设置请求头
  const headers = {
    "Content-Type": contentType == "form-data" ? 'multipart/form-data' : "application/json",
    "User-Agent": "okhttp/3.8.1"
  };
  const formData = new FormData();
  // 遍历data对象的键值对，并添加到FormData对象中
  for (const key in file) {
    formData.append(key, file[key]);
  }

  // 调用默认的 axios.post() 方法，并将 data 作为请求体传递
  return axios.post(url + '?' + queryString, formData, { headers })
    .then(response => response)
    .catch(error => {
      console.error('POST request error:', error);
      throw error;
    });
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
  if(!signParam._key){
    // 没有传 key 这里加上
    signParam = addKey(signParam);
  }
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

function addKey(signParam){
  const loginStatus = localStorage.getItem("loginStatus");
    if(loginStatus != 1){
      console.log("这是一次没有key的请求");
      return signParam;
    }
    // 获取key
    var { user, _key } = JSON.parse(window.localStorage.getItem('user') || '{}');
    signParam._key = _key;
    return signParam;
}

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

// 上传文件使用
function toSignImg(data) {
  console.log(data);
  const keys = Object.keys(data);
  const keyArray = keys.sort();
  const sb = [];
  for (const k of keyArray) {
    if (k !== "sign" && data[k] !== null && data[k].toString().trim().length > 0) {
      sb.push(`${k}=${data[k].toString().trim()}&`);
    }
  }
  sb.push("secret=my_sign@huluxia.com");
  console.log("param == >", sb.join(""));
  const sign = md5(sb.join(""));

  console.log('sign ==>', sign.toUpperCase());
  return sign.toUpperCase();
  // return lE(sb.join("")).toUpperCase();
}




// Vue.prototype.http = axios;
// 注册自定义方法到 Vue 的原型属性
Vue.prototype.http = {
  postForm: axios.methods.postForm,
  postBody: axios.methods.postBody,
  postImg: axios.methods.postImg,
  get: axios.get,
  post: axios.post,
};

export default axios;