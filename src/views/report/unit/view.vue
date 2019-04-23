<template>
  <div class="unit-container">
    <div class="filter-container">
      <el-input :placeholder="$t('unit.unitName')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" />
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('unit.buildingId') }}:</span>
      <el-select v-model="buildingId" placeholder="请选择" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in buildingList"
          :key="item.buildingId"
          :label="item.buildingName"
          :value="item.buildingId" />
      </el-select>
      <!-- <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button> -->
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('unit.unitNo')" prop="id" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.unitNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.buildingId')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.building.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitCoveredArea')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitCoveredArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitFullAddress')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitFullAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitPosition')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitPurpose')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitPurpose }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitStatus')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitStatus | unitStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitType')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitType | unitTypefilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitRelativeProportion')" width="140px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitRelativeProportion }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitChildRelativeProportion')" width="190px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitChildRelativeProportion }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="130" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="paymentNotice(scope.row)">{{ $t('table.paymentNotice') }}</el-button>
          <el-button type="text" size="mini" @click="test(scope.row)">关联收费项目</el-button>
          <!-- <el-button size="text" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }} -->
          <!-- </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :visible.sync="dialogShow" width="800px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="250px" style="width: 700px;">
        <el-form-item label="收费项目" prop="itemId">
          <el-select v-model="itemId" placeholder="请绑定收费项目">
            <el-option v-for="(item, index) in chargeItemList" :key="index" :value="item.itemId" :label="item.itemName" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="testTwo">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 付款通知书 -->
    <el-dialog :visible.sync="dialogShow2" width="800px" center>
      <div id="print-me" class="print_notice">
        <div class="print_notice_title">澳门物业管理有限公司</div>
        <div class="print_notice_title_en">Macau Property Management Co., Ltd.</div>
        <div class="print_notice_no">sasbt656532823</div>
        <el-row class="print_notice_content">
          <el-col :span="8"><div class="">伊甸园园区</div></el-col>
          <el-col :span="8"><div class="print_notice_content_title">付款通知书</div></el-col>
          <!-- <el-col :span="8"></el-col> -->
        </el-row>
        <el-row class="print_notice_content">
          <el-col :span="8"><div class="">Yi Dian Yuan</div></el-col>
          <el-col :span="8"><div class="print_notice_content_title">Payment Notice</div></el-col>
          <el-col :span="8"><div style="text-align: right">日期 Date 2019年04月20日</div></el-col>
        </el-row>
        <div class="content_table">
          <div class="content_table_top">
            <div class="content_table_info">请缴付 Payment for 单位 unit__/车位 Parking__</div>
            <div class="content_table_amount">金 AMOUNT 额</div>
          </div>
          <div class="content_table_item">
            <div class="content_table_item_num">1</div>
            <div class="content_table_item_info">
              <div class="content_table_item_msg">管理费 Management fee for</div>
              <div class="content_table_item_msg">2019年3月 至 2019年4月:每月$899.00</div>
            </div>
            <div class="content_table_item_amount"><span style="position: relative;top: 30px;">$530.00</span></div>
          </div>
          <div class="content_table_item">
            <div class="content_table_item_num">2</div>
            <div class="content_table_item_info">
              <div class="content_table_item_msg">管理费 Management fee for</div>
              <div class="content_table_item_msg">2019年3月 至 2019年4月:每月$899.00</div>
            </div>
            <div class="content_table_item_amount"><span style="position: relative;top: 30px;">$530.00</span></div>
          </div>
          <div class="content_table_item">
            <div class="content_table_item_info table_bottom">合共 TOTAL in MOP$</div>
            <div class="content_table_item_amount"><span style="position: relative;top: 15px;">$998.00</span></div>
          </div>
        </div>
        <div class="content_bottom_tip1">付款方式:  07:00 - 18:00 到地下管理处缴费（现金/支票）</div>
        <div><span class="content_bottom_tip2">** 中国银行户口自动转账服务，如有需要直接到管理处办理 **</span></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow2 = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-print="'#print-me'" type="primary" @click="dialogShow2 = false">{{ $t('table.print') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getUnitList,
    createUnit,
    updateUnit,
    delUnit
  } from '@/api/unit'
  import {
    getChargeItemList,
    addUnitItem
  } from '@/api/charge'
  import {
    getBuildingList
  } from '@/api/building'
  // import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Unittest',
    components: {
      Pagination
    },
    directives: {
      waves
    },
    filters: {
      unitStatusFilter(value) {
        // 单元状态0空置1租赁2装修中3入住
        const sexMap = {
          0: '空置',
          1: '租赁',
          2: '装修中',
          3: '入住'
        }
        return sexMap[value]
      },
      unitTypefilter(type) {
        // 单位类型1商铺2住宅3停车场
        const typeMap = {
          1: '商铺',
          2: '住宅',
          3: '停车场'
        }
        return typeMap[type]
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
          keyword: ''
        },
        importanceOptions: [1, 2, 3],
        sortOptions: [{
          label: 'ID Ascending',
          key: '+id'
        }, {
          label: 'ID Descending',
          key: '-id'
        }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          unitChildRelativeProportion: null, // 分层建筑物之子部分相对比(千分之一)
          buildingId: '', // buildingId
          unitCoveredArea: null, // 覆盖面积大小(单位平方米)
          unitName: '', // 单元名字
          unitFullAddress: '', // 全址
          unitId: '', // unitId
          unitNo: null, // 单位编号
          unitPosition: '', // 位置(地下,一楼,二楼,三楼,户外.)
          unitPurpose: '', // 用途
          unitRelativeProportion: null, // 分层建筑物相对比(千分之一)
          unitStatus: null, // 单位状态0空置1租赁2装修中3入住
          unitType: null // 单位类型1商铺2住宅3停车场
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{
            required: true,
            message: 'type is required',
            trigger: 'change'
          }],
          name: [{
            type: 'string',
            required: true,
            message: 'name is required',
            trigger: 'change'
          }],
          sex: [{
            required: true,
            message: 'sex is required',
            trigger: 'change'
          }]
        },
        downloadLoading: false,
        password: null,
        buildingList: [],
        buildingId: null,
        chargeItemList: [],
        dialogShow: false,
        itemId: null,
        unitId: null,
        dialogShow2: false
      }
    },
    watch: {
      buildingId() {
        this.getList()
      },
      'listQuery.keyword'() {
        this.getList()
      }
    },
    async created() {
      await this.queryBuildyList()
      // this.getList()
      this.queryChargeItemList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const { code, msg, data } = await getUnitList({ ...this.listQuery, buildingId: this.buildingId }).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败1', message: msg, type: 'error', duration: 2000 })
        }
        this.list = data.list
        this.total = data.total
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      test(info) {
        this.unitId = info.unitId
        this.itemId = null
        this.dialogShow = true
      },
      paymentNotice(info) {
        this.dialogShow2 = true
        console.log('paymentNotice')
      },
      async testTwo() {
        const data = [{ itemId: this.itemId, unitId: this.unitId }]
        const response = await addUnitItem(data).catch(e => e)
        if (response.code !== 200) {
          return this.$notify({ title: '关联失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '关联成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      },
      async createData() {
        const response = await createUnit(this.temp).catch(e => e)
        if (response.code !== 200) {
          return this.$notify({ title: '创建失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        this.listLoading = true
        const response = await updateUnit(this.temp).catch(e => e)
        this.listLoading = false
        if (response.code !== 200) {
          return this.$notify({ title: '修改失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.$notify({ title: '成功', message: '修改成功', type: 'success', duration: 2000 })
        this.dialogFormVisible = false
        this.dialogUpdateVisible = false
        this.getList()
      },
      handleDelete(row) {
        this.$confirm('确定删除单位【' + row.unitName + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delUnit({ unitId: row.unitId }).catch(e => e)
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
       // 获取建筑列表
      async queryBuildyList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.buildingList = response.data.list
        this.buildingId = this.buildingList[0].buildingId
      },
      // 获取社区列表
      async queryChargeItemList() {
        const response = await getChargeItemList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.chargeItemList = response.data.list
      }
    }
  }

</script>
<style lang="postcss" scoped>
  .unit-container {
    padding: 30px;
  }
  .print_notice {
    text-align: center;
    font-size: 16px;
  }
  .print_notice_title {
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
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
    padding: 30px 0;
    font-weight: 600;
  }
  .content_bottom_tip2 {
    text-align: center;
    padding: 10px;
    color: #ffffff;
    background: #000;
  }

</style>
