// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/element-ui.css";
import "@/assets/css/common.css";
import zqLocale from "element-ui/lib/locale/lang/zh-CN"; // lang zh
import ElementUI from "element-ui";
import echarts from "echarts";
import axios from "axios";
import VueAxios from "vue-axios";
import "babel-polyfill";
import SIdentify from "./components/Sidentify";
import config from "../config";
import qs from "qs";
//全局挂载
Vue.use(SIdentify);
Vue.prototype.$qs = qs;
Vue.prototype.$config = config;
Vue.prototype.$echarts = echarts;
// Vue.prototype.axios = axios;

//配置请求的根路径，路径地址待定具体看后台
// axios.defaults.baseURL = 'http://192.168.10.120:8080/api/login'
axios.interceptors.request.use(config => {
  console.log("config", config);
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
//Vue.use(VueAxios, axios);
Vue.use(
  ElementUI,
  {
    zqLocale
  },
  VueAxios,
  axios
); //中文
/* eslint-disable no-new */
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
