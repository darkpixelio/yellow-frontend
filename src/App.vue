<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  computed: {
    ...mapGetters([
      'orders'
    ])
  },
  methods: {
    ...mapActions([
      'setOrders'
    ])
  },
  mounted() {
    this.$http.get('/get-orders').then(data => {
      this.setOrders(data.body)
      console.log(data.body)
      console.log(this.orders)
    })
  }
}
</script>

<style>

</style>
