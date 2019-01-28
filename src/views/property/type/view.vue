<template>
  <div class="type-container">
    type
  </div>
</template>

<script>
  // import {
  //   getProprietorList
  // } from '@/api/proprietor'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Type',
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
 .type-container {
    padding: 30px;
  }
</style>
