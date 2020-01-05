<template>
  <div>
    <polaris-card :primary-footer-action="{content: 'Generate Report', onAction:generateReport, disabled: disabled}">
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
                <td><polaris-display-text>{{ `${!order.customer ? "" : order.customer.first_name } ${!order.customer ? "" : order.customer.last_name}` }}</polaris-display-text></td>
                <td><polaris-badge status="warning">{{ order.processing_method }}</polaris-badge></td>
                <td><polaris-badge status="warning">{{ order.fulfillment_status == null ? 'Unfulfilled' : 'Fulfilled' }}</polaris-badge></td>
                <td><polaris-display-text>${{ order.total_price }}</polaris-display-text></td>
                <th><polaris-select :options="['Unfulfilled', 'Pathao', 'eCourier', 'Shuderban']" :data-order_id="order.id" :placeholder="order.fulfilled_by == '' ? 'Unfulfilled' : order.fulfilled_by" @change="onFulfillChange($event, order.id)"></polaris-select></th>
              </tr>
            </tbody>
          </table>
        </div>
    </polaris-card-section>
    <polaris-unstyled-link v-if="download.downloadable" :url="download.link" :external="true">
    Download Report
    </polaris-unstyled-link>
  </polaris-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        download: {
          downloadable: false,
          link: ''
        },
        disabled: false
      }
    },
    computed: {
      ...mapGetters([
        'orders'
      ])
    },
    methods: {
      generateReport() {
        this.download.downloadable = false
        this.$http.get('https://yellow-report.herokuapp.com/generate-report').then(result => {
          this.download.downloadable = true
          this.download.link = result.body.download_link
        })
        .catch(e => {
          console.log(e)
        })
      },
      onFulfillChange(e, order_id) {
        this.disabled = true
        this.download.downloadable = false
        console.log('From Vue', typeof(order_id))
        this.$http.post('https://yellow-report.herokuapp.com/save', {
          order_id: parseInt(order_id),
          fulfillment_by: e
        })
        .then(response => {
          console.log(response)
          this.disabled = false
          this.download.downloadable = true
        })
        .catch(e => console.log(e))
      }
    }
  }
</script>