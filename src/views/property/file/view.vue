<template>
  <div class="file-container">
    file
  </div>
</template>

<script>
  // import {
  //   getProprietorList
  // } from '@/api/proprietor'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'File',
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
 .file-container {
    padding: 30px;
  }
</style>
