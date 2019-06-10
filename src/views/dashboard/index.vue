<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole"/> -->
    <div style="text-align: center;font-size: 36px;padding-top: 90px;color: #409EFF;">欢迎来到物业管理系统!</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

