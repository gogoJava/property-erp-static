<template>
  <div class="chart-container">
    <div style="padding: 15px;"><el-date-picker v-model="yearMonth" type="month" placeholder="选择年月" @change="loadData"/></div>
    <chart :chart-data="chartData" height="100%" width="100%"/>
  </div>
</template>

<script>
import Chart from './components/staticCharts'
  import {
    getPlaceStatistic
  } from '@/api/place'

export default {
  name: 'MixChart',
  components: { Chart },
  data() {
      return {
        tableKey: 0,
        yearMonth: '',
        chartData: []
      }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const param = {
        communityId: this.$store.getters.communityId,
        yearMonth: this.yearMonth ? this.$moment(this.yearMonth).format('YYYY-MM') : ''
      }
      if (this.$store.getters.isSuper) delete param.communityId
      if (this.yearMonth) delete param.yearMonth
      const res = await getPlaceStatistic(param).catch(e => e)
      this.chartData = [...res.data].reverse()
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
  background: #344b58;
}
</style>

