import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    orders: window.__orders.orders
    // orders: [{
    //   id: '',
    //   name: '',
    //   created_at: '',
      
    //   processing_method: '',
    //   fulfillment_status: '',
    //   total_price: '',
    //   customer: {
    //     first_name: '',
    //   last_name: '',
    //   }
    // }]
  },
  getters: {
    orders: state => {
      return state.orders
    }
  }
})