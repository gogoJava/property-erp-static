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
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <!-- <el-table-column type="selection" width="40" /> -->
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

  export default {
    name: 'Charge',
    components: {
      Pagination
    },
    data() {
      return {
        tableKey: 0,
        list: null,
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
        communityName: ''
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
      }
    },
    created() {
      // this.queryChargeUnitChargeList()
      this.queryCommunityList()
      // this.queryBuildingList()
    },
    methods: {
      printJS,
      async queryChargeUnitChargeList() {
        const param = {
          conmunityId: this.listQuery.communityId || ''
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
        this.list = data.xUnitList.map(v => {
          const colList = data.chargeVoList.filter(value => value.yUnit === v)
          const obj = {}
          let sum = 0
          colList.forEach(el => {
            obj[el.xDate + 'v1Date'] = el.v1Date
            obj[el.xDate + 'v2Money'] = el.v2Money
            sum = sum + Number(el.v2Money)
          })
          // console.log('obj', Object.keys(obj).length)
          return {
            ...obj,
            unitName: v,
            count: Object.keys(obj).length / 2,
            sum: sum.toFixed(2),
            price: (sum / (Object.keys(obj).length / 2)).toFixed(2)
          }
        })
        this.xDateList = data.xDateList
        // this.list = [...data.list]
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
