<template>
  <div id="app">
    <div class="app-container">
      <header>
        <div class="header-container">
          <div class="heading">
            <polaris-display-text element="h1" size="large">Orders</polaris-display-text>
          </div>
          <div class="quick-links" @click="showModal">
            <polaris-display-text class="export-btn"><span><polaris-icon class="export-icon" accessibility-label="Example icon" source="&lt;svg class=&quot;Polaris-Icon__Svg&quot; viewBox=&quot;0 0 20 20&quot;&gt;&lt;path d=&quot;M13.707 10.707a.997.997 0 0 1-1.414 0L11 9.414V17a1 1 0 1 1-2 0V9.414l-1.293 1.293a.999.999 0 1 1-1.414-1.414l3-3a.999.999 0 0 1 1.414 0l3 3a.999.999 0 0 1 0 1.414zM17 2a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-3a1 1 0 1 1 0-2h2V4H4v9h2a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14z&quot; fill-rule=&quot;evenodd&quot;&gt;&lt;/path&gt;&lt;/svg&gt;"></polaris-icon></span>Generate Order</polaris-display-text>
          </div>
        </div>
      </header>
      <main>
        <Orders/>
      </main>
      <section>
        <GenerateComponent v-show="show" @close="closeModal">
          <template v-slot:header>
            <polaris-heading>Generate Report</polaris-heading>
          </template>
          <template v-slot:body>
            <polaris-callout-card title="Generate report by date range" illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg" :primary-action="{content:'Generate Report', onAction: generateReportByDate}">
              <vc-date-picker mode="range" v-model="dateRange" :input-props="{placeholder: 'Please select a date range'}" :popover="{ placement: 'bottom', visibility: 'click' }"></vc-date-picker>
            </polaris-callout-card>
            <polaris-callout-card title="Generate report for all order from your store" illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg" :primary-action="{content:'Generate Report', onAction: generateReport}"></polaris-callout-card>
            <div class="download">
              <polaris-banner title="Report Generated" status="success" v-show="download.downloadable">
                <p><polaris-link :url="download.link" external>Click here</polaris-link> to download your generated report</p>
              </polaris-banner>
            </div>
          </template>
        </GenerateComponent>
      </section>
      <footer>
        <polaris-footer-help v-show="download.downloadable">
          Download your generated report from
          <polaris-link :url="download.link" external>here</polaris-link>.
        </polaris-footer-help>
      </footer>
    </div>
  </div>
</template>

<script>
import Orders from './components/Orders'
import Modal from './components/Modal'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      show: false,
      dateRange: {
        start: null,
        end: null
      },
      download: {
        downloadable: false,
        link: ''
      }
    }
  },
  components: {
    Orders,
    GenerateComponent: Modal
  },
  computed: {
    ...mapGetters([
      'orders'
    ])
  },
  methods: {
    ...mapActions([
      'setOrders'
    ]),
    showModal() {
      this.show = true
    },
    closeModal() {
      this.show = false
      this.dateRange.start = null
      this.dateRange.end = null
    },
    generateReportByDate() {
      this.download.downloadable = false
      this.download.link = ''

      const data = {
        startDate: this.dateRange.start,
        endDate: this.dateRange.end
      }

      if(!this.dateRange.start && !this.dateRange.end) {
        throw new Error('Please select a date range')
      }
      else {
        this.$http.post('/orders/generate-report', data)
        .then(response => {
          this.download.downloadable = true
          this.download.link = response.body.download_link
        })
        .catch(error => {
          console.log(error)
        })
      }
      
    },
    generateReport() {
      this.download.downloadable = false
      this.download.link = ''

      this.$http.post('/orders/generate-report', {})
      .then(response => {
        this.download.downloadable = true
        this.download.link = response.body.download_link
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.$http.get('/orders/get-orders').then(data => {
      this.setOrders(data.body)
    })
  }
}
</script>

<style>
  #app {
    padding-bottom: 50px;
  }
  header {
    padding-top: 3.2rem;
  }
  .header-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .quick-links {
    margin-top: .8rem;
  }
  .export-btn {
    display: inline-flex;
    padding: .4rem;
    padding-right: .5rem;
    margin-left: -.4rem;
    border-radius: 2px;
  }
  .export-btn > span {
    margin-right: .4rem;
  }
  .export-icon {
    fill: #637381;
  }
  .export-btn:hover {
    background-color: #dfe3e8;
  }
  .export-btn:hover .export-icon {
    fill: #212b36;
  }
  main {
    margin-top: 2rem;
  }
  .download {
    margin-top: 2rem;
  }
  @media (min-width: 48.0625em) {
    .app-container {
      padding: 0 2rem;
    }
  }
  @media (min-width: 61.5em) {
    .app-container {
      padding: 0 3.2rem;
    }
  }
</style>
