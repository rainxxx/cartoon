import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

//Axios设置默认配置
Vue.prototype.$http = axios.create({
	//请求URL时会将这个参数作为前缀拼接到URL参数前面
	baseURL: 'http://localhost',
	headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
})

//Axios请求拦截器
Vue.prototype.$http.interceptors.request.use(function(config){
	//默认往服务器发送的是JSON格式的数据,后台并不能接收到JSON格式的参数,这里使用qs转换一下就好了
	if (config.method == "post" || config.method == "put" || config.method == "delete") {
	  config.data = qs.stringify(config.data); 
	}
	return config;
});

Vue.use(ElementUI, { size: 'small'})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
