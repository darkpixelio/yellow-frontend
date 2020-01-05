import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    orders: []
    // orders: [{
    //   id: 'sasdf',
    //   name: 'asdfads',
    //   created_at: 'adsfasd',
      
    //   processing_method: 'adfads',
    //   fulfillment_status: 'adfad',
    //   total_price: 'adfads',
    //   customer: {
    //     first_name: 'adfad',
    //   last_name: 'adfads',
    //   },
    //   fulfilled_by: ''
    // },
    // {
    //   id: 'asdfadsf',
    //   name: 'asdfads',
    //   created_at: 'adsfasd',
      
    //   processing_method: 'adfads',
    //   fulfillment_status: 'adfad',
    //   total_price: 'adfads',
    //   customer: {
    //     first_name: 'adfad',
    //   last_name: 'adfads',
    //   },
    //   fulfilled_by: 'Pathao'
    // }]
  },
  getters: {
    orders: state => {
      return state.orders
    }
  },
  mutations: {
    setOrders: (state, payload) => {
      state.orders = payload
    }
  },
  actions: {
    setOrders: ({ commit }, payload) => {
      commit('setOrders', payload)
    }
  }
})