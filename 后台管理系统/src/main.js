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
Vue.component("table-tree",tableTree);


// 配置vue-quill-editor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, /* { default global options } */)



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

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
