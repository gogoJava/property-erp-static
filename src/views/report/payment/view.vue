<template>
  <div class="payment-container">
    payment
  </div>
</template>

<script>
  // import {
  //   getProprietorList
  // } from '@/api/proprietor'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Payment',
    components: {
      Pagination
    },
    filters: {
    },
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }

</script>
<style lang="postcss" scoped>
 .payment-container {
    padding: 30px;
  }
</style>
