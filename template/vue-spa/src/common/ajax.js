/**
* @file config.js
* @brief 项目的一些全局配置
*/
import axios from 'axios';
import type from 'src/common/type.js';

/**
 * 添加拦截器
 **/

axios.defaults.baseURL = '/service';
//axios.defaults.timeout = 2000;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var qs = function (obj) {
  var rs = [];
  Object.keys(obj).forEach((key) => {
    if (type(obj[key]) !== 'undefined') {
      rs.push(key + '=' + encodeURIComponent(obj[key]));
    }
  })
  return rs.join("&");
}



axios.interceptors.request.use(function (config) {
  var data;
  if (config.method.toLowerCase() === "post"
    && !config.headers['Content-Type']
  ) {
    data = config.data;
    if (type(data) === 'object') {
      data = qs(data);
    }
    config.data = data;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
