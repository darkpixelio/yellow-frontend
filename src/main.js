import Vue from 'vue'
import VueResource from 'vue-resource'
import PolarisVue from '@eastsideco/polaris-vue'
import VCalendar from 'v-calendar'
import '@eastsideco/polaris-vue/lib/polaris-vue.css'

import { store } from './store/store'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(PolarisVue)
Vue.use(VCalendar, {
  componentPrefix: 'vc',
})

Vue.filter('capitalize', value => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
