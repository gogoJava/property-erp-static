<template>
  <div class="purchase-container">
    purchase
  </div>
</template>

<script>
  // import {
  //   getProprietorList
  // } from '@/api/proprietor'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Purchase',
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
 .purchase-container {
    padding: 30px;
  }
</style>
