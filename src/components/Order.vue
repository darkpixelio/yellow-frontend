<template>
  <div class="item-wrapper">
    <a href="/"></a>
    <div class="item-content">
      <div>
        <div class="item-grid">
          <div class="order grid-item">
            <span>
              <a href="/"><span>{{ order.name }}</span></a>
            </span>
          </div>
          <div class="order-date grid-item">
            <div>{{ order.created_at }}</div>
          </div>
          <div class="customer grid-item">
            <div>{{ `${!order.customer ? "" : order.customer.first_name } ${!order.customer ? "" : order.customer.last_name}` }}</div>
            <div class="customer-link"></div>
          </div>
          <div class="payment grid-item">
            <polaris-badge :status="order.payment_status === 'PENDING' ? 'warning' : 'default'">{{ order.payment_status | capitalize }}</polaris-badge>
          </div>
          <div class="fulfillment grid-item">
            <polaris-badge :status="order.fulfillment_status === 'UNFULFILLED' ? 'attention' : 'default'">{{ order.fulfillment_status | capitalize }}</polaris-badge>
          </div>
          <div class="total grid-item">
            <span>&dollar; {{ order.total_price }}</span>
          </div>
          <div class="fulfilled-by grid-item">
            <polaris-select v-model="selectedCourier" :options="fulfillments" placeholder="Select a courier"></polaris-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: ['order'],
    data() {
      return {
        selectedCourier: '',
      }
    },
    computed: {
      ...mapGetters(['fulfillments'])
    },
    methods: {
      ...mapActions([ 'updateOrder' ]),
      watchSelectedCourier(value) {
        let data = {
          ...this.order,
          fulfilled_by_courier: value
        }
        let getFulfilled = this.$http.post('/fulfillment/set-courier', data)
        .then(response => {
          const payload = { order: { id: this.order.id, ...response.body }}
          console.log(response.body)
          console.log(payload)
          this.updateOrder(payload)
        })
        .catch(e => {
          console.log(e)
        })
      }
    },
    mounted() {
      this.selectedCourier = !this.order.fulfilled_by ? 'Unfulfilled' : this.order.fulfilled_by
      this.$watch('selectedCourier', this.watchSelectedCourier)
    }
  }
</script>

<style scoped>
  .item-wrapper {
    position: relative;
    outline: rgb(33, 43, 54);
    cursor: pointer;
  }

  .item-wrapper a {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
  }

  .item-content {
    position: relative;
    padding: 1.2rem 1.6rem;
    min-height: 4.4rem;
    display: flex;
    align-items: flex-start;
    z-index: 2;
  }

  .item-content div {
    min-width: 0;
    max-width: 100%;
    flex: 1 1 auto;
    align-self: center;
  }

  .item-grid {
    width: 100%;
    display: grid;
    grid-gap: 0 .8rem;
    grid-template-columns: repeat(2,minmax(25%,75%));
    grid-template-areas: "order date" "customer total" "payment payment" "fulfillment fulfillment" "fulfilled-by fulfilled-by";
  }

  .item-grid .grid-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .item-grid .order {
    grid-area: order;
  }
  .item-grid .order span {
    margin-right: .4rem;
  }

  .item-grid .order span a {
    display: inline;
    text-align: inherit;
    position: relative;
    text-decoration: none;
    padding: 0;
    font-size: inherit;
    cursor: pointer;
  }

  .order span a span {
    font-weight: 600;
  }

  .item-grid .order-date {
    justify-content: flex-end;
    text-align: right;
    grid-area: date;
  }

  .order-date span {
    white-space: nowrap;
  }
  .customer {
    grid-area: customer;
  }
  .customer div {
    display: flex;
    align-items: center;
    max-width: 100%;
  }
  .customer div div {
    flex-grow: 0;
    max-width: calc(100% - 2rem);
    overflow-wrap: break-word;
  }
  .payment {
    grid-area: payment;
  }
  .fulfillment {
    grid-area: fulfillment;
  }
  .total {
    grid-area: total;
    justify-content: flex-end;
  }
  .total span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .fulfilled-by {
    grid-area: fulfilled-by;
  }

  @media screen and (min-width: 35.5em) {
    .item-grid {
      grid-template-columns: minmax(20%,1fr) 25% 25% 20%;
      grid-template-areas:
        "order fulfillment fulfilled-by total"
        "date fulfillment fulfilled-by total"
        "customer fulfillment fulfilled-by total"
        "payment fulfillment fulfilled-by total";
    }
    .order-date {
      justify-content: flex-start !important;
      text-align: left !important;
    }
  }

  @media screen and (min-width: 53.75em) {
    .item-grid {
      grid-template-columns: minmax(20%,1fr) 15% 15% 25% 15%;
      grid-template-areas:
        "order payment fulfillment fulfilled-by total"
        "date payment fulfillment fulfilled-by total"
        "customer payment fulfillment fulfilled-by total";
    }
  }

  @media screen and (min-width: 70.3125em) {
    .item-grid {
      grid-template-columns: 10% repeat(4,minmax(12%,1fr)) 20% 12%;
      grid-template-areas: "order date customer payment fulfillment fulfilled-by total";
    }
  }
</style>