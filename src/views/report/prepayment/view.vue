<template>
  <div class="charge-container">
    <div class="filter-container">
      <el-input :placeholder="$t('charge.unitItemId') + ' ' + $t('charge.userId')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" />
      <el-input :placeholder="$t('charge.unitNo')" v-model="listQuery.unitNo" style="width: 200px;position: relative;left: 30px;" class="filter-item" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleExport()">{{ $t('table.export') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
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
      <el-table-column :label="$t('charge.unitNo')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitNo }}</span>
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
      <el-table-column :label="$t('table.actions')" align="center" width="130" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
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
  </div>
</template>

<script>
  import {
    getChargeItemRecordList,
    updateChargeItemRecord,
    delChargeItemRecord
  } from '@/api/charge'
  import {
    getBuildingList
  } from '@/api/building'
  import { getCommunityList } from '@/api/community'
  import { chargeExport } from '@/api/file'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

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
          unitNo: '',
          recordStatus: 2 // 状态0欠费1已付2预支付
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
        rules: {}
      }
    },
    watch: {
      'listQuery.keyword'() {
        this.getList()
      },
      'listQuery.unitNo'() {
        this.getList()
      }
    },
    created() {
      this.getList()
      // this.queryCommunityList()
      // this.queryBuildingList()
    },
    methods: {
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
        const response = await getCommunityList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.communityList = response.data.list
      },
      // 获取建筑列表
      async queryBuildingList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
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
      }
    }
  }

</script>
<style lang="postcss" scoped>
 .charge-container {
    padding: 30px;
  }
</style>
