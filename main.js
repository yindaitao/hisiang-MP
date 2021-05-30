import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

/* 请求地址 */
import website from './common/webapi.js'
Vue.prototype.$webapi = website

/* 基础服务 */
import mbservices from './common/mbservices.js'
Vue.prototype.$mbservices = mbservices

//基础组件-导航
import custom from './pages/components/custom/custom.vue'
Vue.component('custom', custom)

Vue.prototype.$store = store

const app = new Vue({
	store,
	...App
})
app.$mount()
