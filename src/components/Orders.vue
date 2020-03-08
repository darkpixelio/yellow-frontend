<template>
  <div>
    <polaris-card>
      <polaris-card-section>
          <div class="list-head">
            <div class="resource-list-header">
              <div class="resource-list-container">
                <div class="header-item-wrapper">
                  <div class="header-grid">
                    <div class="order">Order</div>
                    <div class="date">Date</div>
                    <div class="customer">Customer</div>
                    <div class="payment">Payment</div>
                    <div class="fulfillment">Fulfillment</div>
                    <div class="fulfilled-by">Fulfilled by</div>
                    <div class="total">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="list-container">
            <ul class="item-list" v-if="orders.length !== 0">
              <li class="list-item" v-for="order of orders" :key="order.id">
                <Order :order="order"></Order>
              </li>
            </ul>
          </div>
      </polaris-card-section>
      <!-- <polaris-unstyled-link v-if="download.downloadable" :url="download.link" :external="true">
      Download Report
      </polaris-unstyled-link> -->
    </polaris-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import Modal from './Modal'
  import Order from './Order'

  export default {
    data() {
      return {
        
        disabled: false,
        
      }
    },
    components: {
      Modal,
      Order
    },
    computed: {
      ...mapGetters([
        'orders'
      ])
    },
    methods: {
      dateFormater(date) {
        return !date ? null : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      },
      onFulfillChange(e, order_id) {
        console.log('From Vue', typeof(order_id))
        this.$http.post('https://yellow-report.herokuapp.com/save', {
          order_id: parseInt(order_id),
          fulfillment_by: e
        })
        .then(response => {})
        .catch(e => console.log(e))
      }
    }
  }
</script>

<style scoped>
  .Polaris-Card__Section {
    padding: 0;
  }
  .Polaris-Banner {
    max-width: 90%;
    margin: 0 auto;
    margin-top: 1rem;
  }
  .list-head {
    padding: 2rem 2rem 0;
    z-index: 1;
  }
  .resource-list-header {
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;
    min-height: 5.6rem;
    padding: 1rem 1.2rem;
    background-color: #fff;
  }
  .resource-list-header .resource-list-container {
    position: absolute;
    z-index: 1;
    right: 1.2rem;
    left: 1.2rem;
    display: flex;
    min-height: 3.6rem;
    opacity: 1;
    transition: opacity .2s cubic-bezier(.64,0,.35,1);
  }
  .header-grid {
    display: none;
    font-weight: 600;
  }
  .header-grid .order {
    grid-area: order;
    display: none;
  }
  .header-grid .date {
    grid-area: date;
    display: none;
  }
  .header-grid .customer {
    grid-area: customer;
    display: none;
  }
  .header-grid .payment {
    grid-area: payment;
    display: none;
  }
  .header-grid .fulfillment {
    grid-area: fulfillment;
    display: none;
  }
  .header-grid .fulfilled-by {
    grid-area: fulfilled-by;
    display: none;
  }
  .header-grid .total {
    grid-area: total;
    display: none;
    justify-content: flex-end;
  }
  .item-list {
    width: calc(100% + 4rem);
    transform: translateX(-4rem);
    transition: transform .2s cubic-bezier(.64,0,.35,1);
    margin: 0;
    margin-right: -4rem;
    list-style: none;
    z-index: 1;
  }

  .list-item {
    position: relative;
    max-width: 100%;
    overflow: hidden;
    z-index: 1;
    display: list-item;
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05);
    padding: 0 2rem;
  }
  
  @media screen and (min-width: 28.625em) {
    .resource-list-header {
      flex-direction: row;
      padding: 1rem 1.6rem;
    }
    .resource-list-header div {
      right: 1.6rem;
      left: 1.6rem;
      align-self: flex-start;
    }
    .header-item-wrapper {
      display: flex;
      flex: 1 1 auto;
      align-items: center;
    }
    .header-grid {
      width: 100%;
      display: grid !important;
      align-items: center;
      grid-gap: 0 .8rem;
      grid-template-columns: repeat(2,minmax(25%,75%));
      grid-template-areas: "order date";
    }
    .header-grid .order {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }
  @media screen and (min-width: 35.5em) {
    .header-grid {
      grid-template-columns: minmax(20%,1fr) 25% 25% 20%;
      grid-template-areas: "order fulfillment fulfilled-by total";
    }
    .header-grid .order {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .header-grid .fulfillment {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .header-grid .fulfilled-by {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .header-grid .total {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }
  @media screen and (min-width: 53.75em) {
    .header-grid {
      grid-template-columns: minmax(20%,1fr) 15% 15% 25% 15%;
      grid-template-areas: "order payment fulfillment fulfilled-by total";
    }
    .header-grid .payment {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  @media screen and (min-width: 70.3125em) {
    .header-grid {
      grid-template-columns: 10% repeat(4,minmax(12%,1fr)) 20% 12%;
      grid-template-areas: "order date customer payment fulfillment fulfilled-by total";
    }
    .header-grid .date {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .header-grid .customer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }
</style>