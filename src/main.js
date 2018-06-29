// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'

// dev
axios.defaults.baseURL = store.getters.httpUrl;
// prod
 //axios.defaults.baseURL = 'http://192.168.100.43:19002/manage'

Vue.prototype.axios = axios
Vue.config.productionTip = false

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response) {
      // if (response.data.resCode.toString() === '000401' || response.data.resCode.toString() === '000403') {
      //     store.dispatch('delete_accessToken');
      //     // window.location.href=response.data.result;
      // }
      return response;
      //return Promise.reject(response.data.msg)  // 返回接口返回的错误信息
    }

  },
  error => {
    if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          /*store.dispatch('delete_accessToken');
          window.location.href=`${error.response.data.result}/login`;*/
        }
    }
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
