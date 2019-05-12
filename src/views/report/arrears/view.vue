<template>
  <div class="charge-container">
    <div class="filter-container">
      <el-input :placeholder="$t('charge.unitItemId')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleExport()">{{ $t('table.export') }}</el-button>
      <el-button size="mini" type="primary" style="position: relative;right: 15px;top: -4px;float: right;" @click="confirmPay()">{{ $t('table.confirmPay') }}</el-button>
      <!-- <el-button size="mini" type="primary" style="position: relative;right: 15px;top: -4px;float: right;" @click="confirmPay()">{{ $t('table.confirmPay') }}</el-button> -->
      <el-button type="primary" size="mini" style="position: relative;right: 15px;top: -4px;float: right;" @click="paymentNotice()">{{ $t('table.paymentNotice') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column :label="$t('charge.unitItemId')" prop="id" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.chargeItem ? scope.row.chargeItem.itemName : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('charge.userId')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user ? scope.row.user.name : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('charge.recordTime')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordTime ? $moment(scope.row.recordTime).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('charge.recordStatus')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordStatus | recordStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('charge.recordAmount')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('charge.recordActualAmount')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordActualAmount || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('charge.recordDate')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordDate }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('charge.recordLateFee')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordLateFee || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('charge.recordLateDate')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordLateDate || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('charge.recordLateFee')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordLateFee || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="260" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="text" size="mini" @click="paymentNotice(scope.row)">{{ $t('table.paymentNotice') }}</el-button>
          <el-button type="text" size="mini" @click="confirmPay(scope.row)">{{ $t('table.confirmPay') }}</el-button>
          <!-- <el-button size="text" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog v-loading="listLoading" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="130px" style="margin:0 50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('charge.unitItemId')" prop="username">
              <el-input v-model="temp.chargeItem.itemName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('charge.userId')" prop="name">
              <el-input v-model="temp.user.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('charge.recordDate')" prop="idCard">
              <el-date-picker v-model="recordDate" type="date" format="yyyy/MM" placeholder="选择日期" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('charge.recordLateDate')" prop="englishName">
              <el-input v-model="temp.recordLateDate" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('charge.recordStatus')" prop="sex">
              <el-select v-model="temp.recordStatus" placeholder="请选择">
                <!-- 状态0欠费1已付2预支付 -->
                <el-option :value="0" label="欠费" />
                <el-option :value="1" label="已付款" />
                <el-option :value="2" label="预支付" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('charge.recordLateFee')" prop="recordLateFee">
              <el-input v-model="temp.recordLateFee" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('charge.recordRemark')" prop="recordRemark">
              <el-input v-model="temp.recordRemark" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('charge.recordTime')" prop="recordTime">
              <el-date-picker v-model="recordTime" type="datetime" format="yyyy-MM-DD HH:mm" placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 付款通知书 -->
    <el-dialog :visible.sync="dialogShow2" width="900px" top="30px" center class="print">
      <div id="print-me" class="print_notice">
        <div class="print_notice_title">澳门物业管理有限公司</div>
        <div class="print_notice_title_en">Macau Property Management Co., Ltd.</div>
        <div class="print_notice_no"><span v-for="(paymentNoticeInfo, index) in paymentNoticeInfoList" :key="index"><span v-if="index">、</span>{{ paymentNoticeInfo.chargeItem.itemNo }}</span></div>
        <el-row class="print_notice_content">
          <el-col :span="8"><span v-if="paymentNoticeInfoList[0]">{{ paymentNoticeInfoList[0].community.communityName }}</span></el-col>
          <el-col :span="8"><div class="print_notice_content_title">付款通知书</div></el-col>
          <!-- <el-col :span="8"></el-col> -->
        </el-row>
        <el-row class="print_notice_content">
          <!-- <el-col :span="8"><div class="">1</div></el-col> -->
          <el-col :span="8" :offset="8"><div class="print_notice_content_title">Payment Notice</div></el-col>
          <el-col :span="8"><div style="text-align: right">日期 Date {{ $moment().format('YYYY年MM月DD日') }}</div></el-col>
        </el-row>
        <div class="content_table">
          <div class="content_table_top">
            <div class="content_table_info">请缴付 Payment for 单位 unit_____ / 车位 Parking_____</div>
            <div class="content_table_amount">金 AMOUNT 额</div>
          </div>
          <div v-for="(paymentNoticeInfo, index) in paymentNoticeInfoList" :key="index" class="content_table_item">
            <div class="content_table_item_num">{{ index + 1 }}</div>
            <div class="content_table_item_info">
              <div class="content_table_item_msg">管理费 Management fee for</div>
              <div class="content_table_item_msg">{{ paymentNoticeInfo.recordDate }} : ${{ paymentNoticeInfo.recordAmount.toFixed(2) }}  <span v-if="paymentNoticeInfo.recordRemark">({{ paymentNoticeInfo.recordRemark }})</span></div>
            </div>
            <div class="content_table_item_amount"><span style="position: relative;top: 30px;">${{ paymentNoticeInfo.recordAmount.toFixed(2) }}</span></div>
          </div>
          <div class="content_table_item">
            <div class="content_table_item_info table_bottom">合共 TOTAL in MOP$</div>
            <div class="content_table_item_amount"><span style="position: relative;top: 15px;">${{ totalPrice }}</span></div>
          </div>
        </div>
        <div class="content_bottom_tip1">付款方式:  07:00 - 18:00 到地下管理处缴费（现金/支票）</div>
        <div><span class="content_bottom_tip2">** 中国银行户口自动转账服务，如有需要直接到管理处办理 **</span></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow2 = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-print="'#print-me'" type="primary">{{ $t('table.print') }}</el-button>
        <!-- <el-button type="primary" @click="printJS('print-me', 'html')">{{ $t('table.print') }}</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getChargeItemRecordList,
    updateChargeItemRecord,
    delChargeItemRecord,
    setChargeItemRecordConfirm
  } from '@/api/charge'
  import {
    getBuildingList
  } from '@/api/building'
  import { getCommunityList } from '@/api/community'
  import { chargeExport } from '@/api/file'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import printJS from 'print-js'

  export default {
    name: 'Charge',
    components: {
      Pagination
    },
    filters: {
      recordStatusFilter(status) {
        // 状态0欠费1已付2预支付
        const statusMap = {
          0: '欠费',
          1: '已付',
          2: '预支付'
        }
        return statusMap[status]
      }
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
          keyword: '',
          recordStatus: 0 // 状态0欠费1已付2预支付
        },
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
        rules: {},
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
      'listQuery.keyword'() {
        this.getList()
      }
    },
    created() {
      this.getList()
      // this.queryCommunityList()
      // this.queryBuildingList()
    },
    methods: {
      printJS,
      async getList() {
        this.listLoading = true
        const { code, msg, data } = await getChargeItemRecordList(this.listQuery).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.list = [... data.list]
        this.total = data.total
      },
      // 获取社区列表
      async queryCommunityList() {
        if (!this.$store.getters.isSuper) return
        const response = await getCommunityList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.communityList = response.data.list
      },
      // 获取建筑列表
      async queryBuildingList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
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
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.recordDate = this.temp.recordDate ? this.$moment(this.temp.recordDate) : ''
        this.recordTime = this.temp.recordTime ? this.$moment(this.temp.recordTime) : ''
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        this.temp.recordDate = this.recordDate ? this.$moment(this.recordDate).format('YYYY/MM') : ''
        this.temp.recordTime = this.recordTime ? this.$moment(this.recordTime).format('YYYY-MM-DD HH:mm') : ''
        this.listLoading = true
        const response = await updateChargeItemRecord(this.temp).catch(e => e)
        this.listLoading = false
        if (response.code !== 200) {
          return this.$notify({ title: '修改失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.$notify({ title: '成功', message: '修改成功', type: 'success', duration: 2000 })
        this.dialogFormVisible = false
        this.dialogUpdateVisible = false
        this.getList()
      },
      async handleDelete(row) {
        this.$confirm('确定删除公告【' + row.chargeTitle + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delChargeItemRecord({ chargeId: row.chargeId }).catch(e => e)
          if (code !== 200) {
            return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
          }
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }).catch(() => {})
      },
      // 导出
      async handleExport() {
        const content = await chargeExport(this.listQuery).catch(e => e)
        const link = document.createElement('a')
        const blob = new Blob([content], { type: 'application/vnd.ms-excel' })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        let num = ''
        for (let i = 0; i < 10; i++) {
          num += Math.ceil(Math.random() * 10)
        }
        link.setAttribute('download', 'excel_' + num + '.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
      paymentNotice(info) {
        // console.log('info', info)
        // this.paymentNoticeInfo = { ...info }
        if (info) {
          this.paymentNoticeInfoList = [info]
        }
        if (!this.paymentNoticeInfoList.length) return this.$notify({ title: '提示', message: '请选择要打印的选项！', type: 'info', duration: 2000 })
        this.dialogShow2 = true
      },
      confirmPay(info) {
        // info有值，则是单个，否则是批量
        if (info) {
          this.recordIdList = [info.recordId]
        }
        if (!this.recordIdList.length) return this.$notify({ title: '提示', message: '请选择要收费的收费项目', type: 'info', duration: 2000 })
        this.$confirm('确定收费?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await setChargeItemRecordConfirm(this.recordIdList).catch(e => e)
          if (code !== 200) {
            return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
          }
          this.$notify({
            title: '成功',
            message: '确认收费成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }).catch(() => {})
      },
      handleSelectionChange(val) {
        this.paymentNoticeInfoList = [...val]
        this.recordIdList = []
        val.forEach(element => {
          this.recordIdList.push(element.recordId)
        })
      }
    }
  }

</script>
<style lang="postcss" scoped>
 .charge-container {
    padding: 30px;
  }
  .print_notice {
    text-align: center;
    font-size: 12px;
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
