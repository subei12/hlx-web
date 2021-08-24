import Vue from 'vue';

import axios from 'axios';

axios.interceptors.response.use(function(res){
    // console.log(res);
    return res.data;
});

Vue.prototype.http = axios;

export default axios;