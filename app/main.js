import Vue from 'vue'
import App from './App'
import request from '@/utils/request.js'
import store from '@/store/index.js';

Vue.config.productionTip = false

// 注入http
Vue.prototype.$http = request;
// 注入store
Vue.prototype.$store = store


App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
