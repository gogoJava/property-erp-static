<template>
  <div class="unit-container">
    <div class="filter-container">
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('unit.buildingId') }}:</span>
      <el-select v-model="buildingId" placeholder="请选择" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in buildingList"
          :key="item.buildingId"
          :label="item.buildingName"
          :value="item.buildingId" />
      </el-select>
      <el-input :placeholder="$t('unit.unitName')" v-model="listQuery.keyword" style="width: 200px;margin-left: 15px;" class="filter-item" />
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
          <el-button type="text" size="mini" @click="handleDelete(scope.row)">关联收费项目</el-button>
          <!-- </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :visible.sync="dialogShow" width="800px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="250px" style="width: 700px;">
        <el-form-item label="收费项目" prop="itemId">
          <el-select v-model="itemId" filterable placeholder="请绑定收费项目">
            <el-option v-for="(item, index) in chargeItemList" :key="index" :value="item.itemId" :label="item.itemName" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="testTwo">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 删除关联收费项目 -->
    <el-dialog :visible.sync="deleteDialogShow" width="900px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" style="width: 700px;">
        <el-form-item label="收费项目" prop="itemId">
          <el-select v-model="itemId" filterable size="small" placeholder="请绑定收费项目">
            <el-option v-for="(item, index) in chargeItemList" :key="index" :value="item.itemId" :label="item.itemName" />
          </el-select>
          <el-button type="primary" size="small" style="margin-left: 15px;" @click="testTwo">关联</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="chargeListLoading" :key="1" :data="chargeList" border fit highlight-current-row style="width: 100%;">
        <el-table-column :label="$t('unit.itemNo')" prop="id" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.itemNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('unit.itemName')" min-width="120px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.itemName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('unit.community')" min-width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.community.communityName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('unit.additionalCost')" min-width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.additionalCost }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('unit.alculationMethod')" min-width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.alculationMethod | alculationMethodFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="deleteLink(scope.row)">删除关联收费项目</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getUnitList,
    createUnit,
    updateUnit
    // delUnit
  } from '@/api/unit'
  import {
    getChargeUnitItemList,
    getChargeItemList,
    addUnitItem,
    delUnitChargeItem
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
      },
      alculationMethodFilter(type) {
        // 计算方式0定额1公式
        const typeMap = {
          0: '定额',
          1: '公式'
        }
        return typeMap[type]
      }
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        chargeList: null,
        total: 0,
        listLoading: true,
        chargeListLoading: false,
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
        deleteDialogShow: false
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
        // this.getList()
        this.getChargeList({ unitId: this.unitId })
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
      async handleDelete(row) {
        await this.getChargeList(row)
        this.unitId = row.unitId
        this.deleteDialogShow = true
      },
      async getChargeList(info) {
        this.chargeListLoading = true
        const { code, msg, data } = await getChargeUnitItemList({ pageNo: 1, pageSize: 99999, unitId: info.unitId }).catch(e => e)
        this.chargeListLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.chargeList = [... data.list]
      },
       // 获取建筑列表
      async queryBuildyList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.buildingList = response.data.list
        this.buildingId = this.buildingList[0].buildingId
      },
      // 获取社区列表
      async queryChargeItemList() {
        const response = await getChargeItemList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.chargeItemList = response.data.list
      },
      // 删除关联收费项目
      async deleteLink(info) {
        const data = { unitItemId: info.unitItemId }
        const response = await delUnitChargeItem(data).catch(e => e)
        if (response.code !== 200) {
          return this.$notify({ title: '删除关联失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.$notify({
          title: '成功',
          message: '删除关联成功',
          type: 'success',
          duration: 2000
        })
        this.getChargeList({ unitId: this.unitId })
      }
    }
  }

</script>
<style lang="postcss" scoped>
  .unit-container {
    padding: 30px;
  }

</style>
