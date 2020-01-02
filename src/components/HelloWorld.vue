<template>
  <Orders></Orders>
</template>

<script>
  import Orders from './Orders'

  export default {
    components: {
      Orders
    },
    mounted() {
      // console.log('HelloWorld', this.$store.state.orders)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
