import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueQuillEditor from 'vue-quill-editor'


// 引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// Vue.use(querystring)

// 引入base.css
import "./assets/css/base.css";

// 配置vue-table-with-tree-grid
// 
import tableTree from 'vue-table-with-tree-grid';
// 注册组件
Vue.component("table-tree", tableTree);


// 配置vue-quill-editor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

// 时间戳
import moment from 'moment'

// 配置axios
import Axios from "axios";
Vue.prototype.$http = Axios;
Axios.defaults.baseURL = "http://127.0.0.1/api/v1/";

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  // 字段名: Authorization
  // 字段值: token值
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
}, function (error) {
  return Promise.reject(error);
});

Vue.filter('setTime', function (value, formatString) {  //挂载全局 时间格式化 过滤器  value  是输入内容
  if (value == 0) {
    return '时间信息错误!'
  } else {
    formatString = formatString || 'YYYY-MM-DD HH:mm';
    return moment.unix(value/1000).format(formatString); // 这是时间戳转时间
  }

})

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
