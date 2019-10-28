<template>
  <div>
    <el-table ref="list001" :key="tableKey" :data="list" :summary-method="getSummaries" show-summary height="400" border fit highlight-current-row style="width: 100%;">
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
            <span @click="editData(scope.row[item + 'data'], scope.row, (item + 'v2Money'))">{{ scope.row[item + 'v2Money'] }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- table 2 -->
    <el-table :data="list2" :summary-method="getSummaries2" show-summary height="400" border fit highlight-current-row style="width: 100%; margin-top: 15px;">
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
    </el-table>
    <!-- 修改 -->
    <el-dialog :visible.sync="dialogVisible" title="提示">
      <el-form :model="formData">
        <el-form-item label="金额">
          <el-input v-model="formData.v2Money"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="updateData">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  // import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import printJS from 'print-js'
  import {
    saveRecord
  } from '@/api/charge'

  export default {
    name: 'Charge',
    components: {
    },
    props: {
      list: {
        type: Array,
        default: () => { [] }
      },
      list2: {
        type: Array,
        default: () => { [] }
      },
      xDateList: {
        type: Array,
        default: () => { [] }
      },
      communityId: {
        type: String,
        default: ''
      },
      recordType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dialogVisible: false,
        formData: {
          id: null,
          v2Money: null,
          v1Date: null,
          xDate: null,
          yUnit: null
        },
        tableKey: 0,
        tableKey2: 0,
        // list: null,
        // list2: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          communityId: ''
        },
        // xDateList: [],
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
        row: null,
        editInfo: null,
        v2Money: null
      }
    },
    computed: {
    },
    watch: {
    },
    created() {
    },
    methods: {
      printJS,
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
      editData(data, row, v2Money) {
        // this.row = data
        // console.log('editData', row[v2Money])
        this.formData = {
          id: data.id,
          v1Date: data.v1Date,
          v2Money: row[v2Money],
          xDate: data.xDate,
          yUnit: data.yUnit
        }
        this.editInfo = row
        this.v2Money = v2Money
        this.dialogVisible = true
      },
      async updateData() {
        const param = {
          communityId: this.communityId,
          recordType: this.recordType,
          unitChargeVos: [{ ...this.formData }]
        }
        this.listLoading = true
        const response = await saveRecord(param).catch(e => e)
        this.listLoading = false
        this.dialogVisible = false
        if (response.code !== 200) {
          return this.$notify({ title: '修改失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.editInfo[this.v2Money] = this.formData.v2Money
        this.$notify({ title: '成功', message: '修改成功', type: 'success', duration: 3000 })
        // this.$refs.list001.doLayout()
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
