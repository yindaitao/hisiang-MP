import Vue from 'vue'
import App from './App'

// import pageHead from './components/page-head.vue'
// import pageFoot from './components/page-foot.vue'

import store from './store'

// /* ColorUI */
// import basics from './components/basics/home.vue'
// Vue.component('basics',basics)

// import components from './components/component/home.vue'
// Vue.component('components',components)

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
// Vue.component('page-head', pageHead)
// Vue.component('page-foot', pageFoot)

const app = new Vue({
    store,
    ...App
})
app.$mount()