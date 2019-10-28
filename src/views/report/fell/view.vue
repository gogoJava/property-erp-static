<template>
  <div class="charge-container">
    <div class="filter-container">
      <el-select v-model="listQuery.communityId" :placeholder="$t('clubhouse.community')" filterable clearable style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in communityList"
          :key="item.communityId"
          :label="item.communityName"
          :value="item.communityId" />
      </el-select>
      <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="position: relative;top: -4px;margin-left: 15px;"/>
      <!-- v-if="$store.getters.isSuper" -->
      <el-button size="mini" type="primary" style="position: relative;top: -4px;left: 15px;" @click="handleImport()">{{ $t('table.import') }}</el-button>
    </div>
    <el-tabs v-model="recordType" type="border-card">
      <el-tab-pane name="0" label="物业费"><table-data-form v-loading="listLoading" :list="list" :list2="list2" :x-date-list="xDateList" :community-id="listQuery.communityId" :record-type="(recordType - 0)"/></el-tab-pane>
      <el-tab-pane name="1" label="基金收费"><table-data-form v-loading="listLoading" :list="list" :list2="list2" :x-date-list="xDateList" :community-id="listQuery.communityId" :record-type="(recordType - 0)" /></el-tab-pane>
      <el-tab-pane name="2" label="定场收费"><table-data-form v-loading="listLoading" :list="list" :list2="list2" :x-date-list="xDateList" :community-id="listQuery.communityId" :record-type="(recordType - 0)" /></el-tab-pane>
      <el-tab-pane name="3" label="其它收费"><table-data-form v-loading="listLoading" :list="list" :list2="list2" :x-date-list="xDateList" :community-id="listQuery.communityId" :record-type="(recordType - 0)" /></el-tab-pane>
    </el-tabs>
    <!-- table 1 -->
    <!-- <el-table v-loading="listLoading" :key="tableKey" :data="list" :summary-method="getSummaries" show-summary height="400" border fit highlight-current-row style="width: 100%;">
      <el-table-column label="单位号" prop="id" align="center" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="共缴费" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sum || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交月数" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.count || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column v-for="(item, index) in xDateList" :key="index" :label="item" min-width="100px" align="center">
        <el-table-column label="缴费日期">
          <template slot-scope="scope">
            <span>{{ scope.row[item + 'v1Date'] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="scope">
            <span>{{ scope.row[item + 'v2Money'] }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table v-loading="listLoading" :data="list2" :summary-method="getSummaries2" show-summary height="400" border fit highlight-current-row style="width: 100%; margin-top: 15px;">
      <el-table-column label="每月共收" prop="id" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.sum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款月份" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataYName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-for="(item, index) in xDateList" :key="index" :label="'应收月份 (' + item + ')'" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[item] || 0 }}</span>
        </template>
      </el-table-column>
    </el-table> -->
    <!-- 导入 -->
    <el-dialog :title="$t('table.importUser')" :visible.sync="importUserShow">
      <el-select v-model="communityId" placeholder="请选择要导入的社区" style="position: relative;top: -2px;">
        <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
      </el-select>
      <import-user :community-id="communityId" style="position: relative;top: -4px;left: 15px;display: inline-block;" @success="importUserSuccess"/>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getChargeUnitChargeList
  } from '@/api/charge'
  import {
    getBuildingList
  } from '@/api/building'
  import {
    getCommunityList
  } from '@/api/community'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import printJS from 'print-js'
  import TableDataForm from './TableData'
  import ImportUser from './ImportUser'

  export default {
    name: 'Charge',
    components: {
      Pagination,
      TableDataForm,
      ImportUser
    },
    data() {
      return {
        tableKey: 0,
        tableKey2: 0,
        list: null,
        list2: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          communityId: ''
        },
        xDateList: [],
        communityList: [],
        buildingList: [],
        recordTime: '',
        recordDate: '',
        temp: {
          recordActualAmount: '', // 实际收取金额
          recordAmount: '', // 收费金额
          recordDate: '', // 收费记录年月份(2019-01)
          recordId: '', // recordId
          recordLateDate: '', // 滞纳金天数
          recordLateFee: '', // 滞纳金额
          recordRemark: '', // 备注
          recordStatus: null, // 状态0欠费1已付2预支付
          recordTime: '', // 收费时间
          unitItemId: '', // 单位收费项目
          userId: '', // 住户
          chargeItem: {},
          user: {}
        },
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        rules: {
          recordLateFee: [{
            validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            },
            trigger: ['blur', 'change']
          }],
          recordLateDate: [{
            validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            },
            trigger: ['blur', 'change']
          }]
        },
        dialogShow2: false,
        recordIdList: [],
        // paymentNoticeInfo: null,
        paymentNoticeInfoList: [],
        communityName: '',
        searchDate: [],
        importUserShow: false,
        communityId: '',
        recordType: '0' // 记录类型0物业费1基金收费2订场收费3其他收费
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.paymentNoticeInfoList.forEach(paymentNoticeInfo => {
          total = total + paymentNoticeInfo.recordAmount
        })
        return total.toFixed(2)
      }
    },
    watch: {
      'listQuery.communityId'() {
        this.queryChargeUnitChargeList()
      },
      recordType() {
        this.queryChargeUnitChargeList()
      },
      searchDate() {
        this.queryChargeUnitChargeList()
      }
    },
    beforeMount() {
      this.searchDate[0] = this.$moment().subtract(12, 'months')
      this.searchDate[1] = this.$moment()
    },
    created() {
      // this.queryChargeUnitChargeList()
      this.queryCommunityList()
      // this.queryBuildingList()
    },
    methods: {
      printJS,
      async queryChargeUnitChargeList() {
        const dateStart = this.searchDate && this.searchDate[0] ? this.$moment(this.searchDate[0]).format('YYYY-MM-DD') : ''
        const dateEnd = this.searchDate && this.searchDate[1] ? this.$moment(this.searchDate[1]).format('YYYY-MM-DD') : ''
        const param = {
          conmunityId: this.listQuery.communityId || '',
          recordType: (this.recordType - 0), // 记录类型0物业费1基金收费2订场收费3其他收费
          dateStart,
          dateEnd
        }
        this.listLoading = true
        const { code, msg, data } = await getChargeUnitChargeList(param).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({
            title: '查询失败',
            message: msg,
            type: 'error',
            duration: 2000
          })
        }
        // console.log('data', data)
        let yList2 = []
        this.list = data.xUnitList.map(v => {
          const colList = data.chargeVoList.filter(value => value.yUnit === v)
          // console.log('colList', colList)
          const obj = {}
          let sum = 0
          colList.forEach(el => {
            obj[el.xDate + 'v1Date'] = el.v1Date
            obj[el.xDate + 'v2Money'] = el.v2Money
            obj[el.xDate + 'data'] = el
            sum = sum + Number(el.v2Money)
          })
          // 222222
          data.chargeVoList.forEach((item, index) => {
            yList2.push(item.v1Date)
            // yList2.push(item)
          })
          const objdata = {}
          yList2 = yList2.reduce(function(item, next) {
            objdata[next] ? '' : objdata[next] = true && item.push(next)
            return item
          }, []).sort()
          // console.log('obj', Object.keys(obj).length)
          return {
            ...obj,
            unitName: v,
            count: Object.keys(obj).length / 2,
            sum: sum.toFixed(2),
            price: parseFloat(sum / (Object.keys(obj).length / 2)).toFixed(2)
            // data: data.chargeVoList[i]
          }
        })
        this.xDateList = data.xDateList
        this.list2 = yList2.map((v, i) => {
          // colList.forEach(el => {
          //   obj[el.xDate + 'v1Date'] = el.v1Date
          // })
          const obj = {}
          this.xDateList.forEach(el => {
            obj[el] = 0
            // obj[el.xDate + 'v2Money'] = el.v2Money
            // sum = sum + Number(el.v2Money)
          })
          let sum = 0
          data.chargeVoList.forEach((item, index) => {
            if (v === item.v1Date) {
              obj[item.xDate] = obj[item.xDate] + Number(item.v2Money)
              sum = sum + Number(item.v2Money)
            }
          })
          // console.log('obj', obj)
          return {
            ...obj,
            dataYName: v,
            sum: sum.toFixed(2),
            data: data.chargeVoList[i]
          }
        })
      },
      // 获取社区列表
      async queryCommunityList() {
        if (!this.$store.getters.isSuper) return
        const response = await getCommunityList({
          pageNo: 1,
          pageSize: 99999
        }).catch(e => e)
        this.communityList = response.data.list
        this.listQuery.communityId = response.data.list.length ? this.communityList[0].communityId : null
      },
      // 获取建筑列表
      async queryBuildingList() {
        const response = await getBuildingList({
          pageNo: 1,
          pageSize: 99999
        }).catch(e => e)
        this.buildingList = response.data.list
      },
      resetTemp() {
        this.recordDate = ''
        this.recordTime = ''
        this.temp = {
          recordActualAmount: '', // 实际收取金额
          recordAmount: '', // 收费金额
          recordDate: '', // 收费记录年月份(2019-01)
          recordId: '', // recordId
          recordLateDate: '', // 滞纳金天数
          recordLateFee: '', // 滞纳金额
          recordRemark: '', // 备注
          recordStatus: null, // 状态0欠费1已付2预支付
          recordTime: '', // 收费时间
          unitItemId: '', // 单位收费项目
          userId: '', // 住户
          chargeItem: {},
          user: {}
        }
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合共收款'
            return
          }
          // 缴费总数
          if (index === 1) {
            if (data.length) sums[index] = data.map(item => Number(item.sum)).reduce((prev, cur) => { return (prev || 0) + (cur || 0) })
            return
          }
          // 单价总数
          if (index === 2) {
            if (data.length) sums[index] = (data.map(item => Number(item.price)).reduce((prev, cur) => { return (prev || 0) + (cur || 0) })).toFixed(2)
            return
          }
          // 已收款
          if (index === 3) {
            sums[index] = '已收款'
            return
          }
          if (index === 4) {
            sums[index] = ''
            return
          }
          // 大于等于5且是单数
          if (index >= 5 && (index % 2 !== 0)) {
            if (!(this.xDateList[(index - 3) / 2])) {
              sums[index] = ''
              return
            }
            const objName = this.xDateList[(index - 3) / 2] + 'v2Money'
            if (data.length) sums[index] = data.map(item => Number(item[objName])).reduce((prev, cur) => { return (prev || 0) + (cur || 0) })
            return
          }
          // 大于等于5且是双数
          if (index >= 5 && (index % 2 === 0)) {
            sums[index] = ''
            return
          }
        })
        if (columns.length > 4) {
          let counts = 0
          sums.slice(-(sums.length - 5)).forEach(v => { counts = counts + (v || 0) })
          sums[4] = counts
        }

        return sums
      },
      getSummaries2(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            if (data.length) sums[index] = data.map(item => Number(item.sum)).reduce((prev, cur) => { return (prev || 0) + (cur || 0) })
            return
          }
          // 缴费总数
          if (index === 1) {
            sums[index] = ''
            return
          }
          // 大于等于2
          if (index >= 2) {
            // sums[index] = 'ee'
            const objName = this.xDateList[index - 2]
            if (data.length) sums[index] = data.map(item => Number(item[objName])).reduce((prev, cur) => { return (prev || 0) + (cur || 0) })
            return
          }
        })

        return sums
      },
      // daoru
      handleImport() {
        this.importUserShow = true
      },
      importUserSuccess() {
        this.importUserShow = false
        this.queryChargeUnitChargeList()
      }
    }
  }

</script>
<style lang="postcss" scoped>
  .charge-container {
    padding: 30px;
  }

  .print_notice_print-me {
    text-align: center;
    font-size: 12px;
    width: 650px;
    height: 489px;
    /* width: 840px;
    height: 592px; */
  }

  .print_notice_title {
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
    padding-top: 15px;
  }

  .print_notice_title_en {
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
  }

  .print_notice_no {
    text-align: right;
    font-weight: bold;
    padding: 10px 0;
  }

  .print_notice_content_title {
    font-weight: 600;
  }

  .content_table {
    border: 1px solid #cdcdcd;
    margin-top: 15px;
    text-align: left;
    padding-top: 15px;
    position: relative;
  }

  .content_table_top {
    position: relative;
  }

  .content_table_info {
    padding: 15px;
  }

  .content_table_amount {
    padding: 5px 0;
    width: 150px;
    border-left: 1px solid #cdcdcd;
    border-top: 1px solid #cdcdcd;
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: center;
  }

  .content_table_item {
    position: relative;
    border-top: 1px solid #cdcdcd;
  }

  .content_table_item_amount {
    /* padding: 5px 15; */
    text-align: center;
    height: 100%;
    width: 150px;
    border-left: 1px solid #cdcdcd;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .content_table_item_num {
    float: left;
    padding: 15px;
    border-right: 1px solid #cdcdcd;
    line-height: 48px;
  }

  .content_table_item_info {
    padding: 15px;
  }

  .content_table_item_msg {
    position: relative;
    left: 15px;
    line-height: 24px;
  }

  .table_bottom {
    font-weight: bold;
  }

  .content_bottom_tip1 {
    text-align: center;
    padding: 15px 0;
    font-weight: 600;
  }

  .content_bottom_tip2 {
    text-align: center;
    padding: 10px;
    color: #ffffff;
    background: #000;
  }

</style>
