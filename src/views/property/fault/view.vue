<template>
  <div class="fault-container">
    fault
  </div>
</template>

<script>
  // import {
  //   getProprietorList
  // } from '@/api/proprietor'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Fault',
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
 .fault-container {
    padding: 30px;
  }
</style>
