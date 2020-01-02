import Vue from 'vue'
import VueResource from 'vue-resource'
import PolarisVue from '@eastsideco/polaris-vue'
import '@eastsideco/polaris-vue/lib/polaris-vue.css'

import { store } from './store/store'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(PolarisVue)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
