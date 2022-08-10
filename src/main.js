import Vue from 'vue'
import App from './App.vue'
import '@/assets/less/index.less'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router/index.js'
import store from '@/store/index.js'

import http from 'axios'

Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
