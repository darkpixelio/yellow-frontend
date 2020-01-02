<template>
  <div>
    <polaris-card :primary-footer-action="{content: 'Generate Report', onAction:generateReport}">
    <polaris-card-section>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col"><polaris-heading>Order</polaris-heading></th>
                <th scope="col"><polaris-heading>Date</polaris-heading></th>
                <th scope="col"><polaris-heading>Customer</polaris-heading></th>
                <th scope="col"><polaris-heading>Payment</polaris-heading></th>
                <th scope="col"><polaris-heading>Fulfillment</polaris-heading></th>
                <th scope="col"><polaris-heading>Total</polaris-heading></th>
                <th scope="col"><polaris-heading>Fulfilled By</polaris-heading></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order of orders" :key="order.id">
                <th scope="row"><polaris-heading>{{ order.name }}</polaris-heading></th>
                <td><polaris-display-text>{{ order.created_at }}</polaris-display-text></td>
                <td><polaris-display-text>{{ `${order.customer.first_name} ${order.customer.last_name}` }}</polaris-display-text></td>
                <td><polaris-badge status="warning">{{ order.processing_method }}</polaris-badge></td>
                <td><polaris-badge status="warning">{{ order.fulfillment_status == null ? 'Unfulfilled' : 'Fulfilled' }}</polaris-badge></td>
                <td><polaris-display-text>${{ order.total_price }}</polaris-display-text></td>
                <th><polaris-select :options="['Pathao', 'eCourier', 'Shuderban']" :data-order_id="order.id" placeholder="Select"></polaris-select></th>
              </tr>
            </tbody>
          </table>
        </div>
    </polaris-card-section>
  </polaris-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        
      }
    },
    computed: {
      ...mapGetters([
        'orders'
      ])
    },
    methods: {
      generateReport() {
        this.$http.get('https://c8dd145f.ngrok.io/generate-report').then(result => {
          console.log(result)
        })
        .catch(e => {
          console.log(e)
        })
      }
    }
  }
</script>