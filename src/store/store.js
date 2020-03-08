import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    orders: [],
    // orders: [{
    //   id: 'gid://shopify/Order/1982536581199',
    //   name: '#1003',
    //   created_at: '2019-12-26T05:09:19Z',
    //   customer: {
    //     first_name: 'Farzana',
    //     last_name: 'Hossain',
    //   },
    //   payment_status: 'PAID',
    //   fulfillment_status: 'FULFILLED',
    //   total_price: '14.94',
    //   fulfillment_id: 'gid://shopify/Fulfillment/1891507699791',
    //   fulfilled_by: 'Pathao Outside Dhaka'
    // },
    // {
    //   id: 'gid://shopify/Order/1982540218447',
    //   name: '#1004',
    //   created_at: '2019-12-26T05:13:27Z',
      
    //   payment_status: 'PENDING',
    //   fulfillment_status: 'UNFULFILLED',
    //   total_price: '11.49',
    //   customer: {
    //     first_name: 'Imran',
    //     last_name: 'Hossain',
    //   },
    //   fulfillment_id: 'gid://shopify/Fulfillment/1882611449935',
    //   fulfilled_by: null
    // }],
    fulfillmentsOption: [
      {label: 'Unfulfilled', value: 'Unfulfilled'},
      {label: 'Ecourier Inside Dhaka', value: 'Ecourier Inside Dhaka'},
      {label: 'Ecourier Outside Dhaka', value: 'Ecourier Outside Dhaka'},
      {label: 'Pathao Inside Dhaka', value: 'Pathao Inside Dhaka'},
      {label: 'Pathao Outside Dhaka', value: 'Pathao Outside Dhaka'},
      {label: 'Sundarban Inside Dhaka', value: 'Sundarban Inside Dhaka'},
      {label: 'Sundarban Outside Dhaka', value: 'Sundarban Outside Dhaka'}
    ]
  },
  getters: {
    orders: state => {
      return state.orders
    },
    fulfillments: state => {
      return state.fulfillmentsOption
    }
  },
  mutations: {
    setOrders: (state, payload) => {
      state.orders = payload
    },
    updateOrder: (state, payload) => {
      for(let item of state.orders) {
        if(item.id === payload.order.id) {
          item.fulfillment_status = payload.order.fulfillment_status
          item.fulfilled_by = payload.order.fulfilled_by
          item.fulfillment_order_id = payload.order.fulfillment_order_id
          return
        }
      }
    }
  },
  actions: {
    setOrders: ({ commit }, payload) => {
      commit('setOrders', payload)
    },
    updateOrder: ({ commit }, payload) => {
      commit('updateOrder', payload)
    }
  }
})