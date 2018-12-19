<template>
  <div class="unit-container">
    <div class="filter-container">
      <el-input :placeholder="$t('unit.unitName')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
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
          <span>{{ scope.row.buildingId }}</span>
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
      <el-table-column :label="$t('table.actions')" align="center" width="240" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <!-- <el-button size="mini" @click="handleUpdatePwd(scope.row)">{{ $t('table.updatePwd') }}</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="800px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="250px" style="width: 700px;">
        <el-form-item :label="$t('unit.unitNo')" prop="unitNo">
          <el-input v-model="temp.unitNo" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitName')" prop="unitName">
          <el-input v-model="temp.unitName" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitCoveredArea')" prop="unitCoveredArea">
          <el-input v-model="temp.unitCoveredArea" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitFullAddress')" prop="unitFullAddress">
          <el-input v-model="temp.unitFullAddress" />
        </el-form-item>
        <el-form-item :label="$t('unit.buildingId')" prop="buildingId">
          <el-select v-model="temp.buildingId" placeholder="请绑定大厦">
            <el-option :key="0" :value="0" label="大厦1" />
            <el-option :key="1" :value="1" label="大厦2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('unit.unitPosition')" prop="unitPosition">
          <el-input v-model="temp.unitPosition" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitPurpose')" prop="unitPurpose">
          <el-input v-model="temp.unitPurpose" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitStatus')" prop="unitStatus">
          <el-select v-model="temp.unitStatus" placeholder="请选择单位状态">
            <el-option :key="0" :value="0" label="空置" />
            <el-option :key="1" :value="1" label="租赁" />
            <el-option :key="2" :value="2" label="装修中" />
            <el-option :key="3" :value="3" label="入住" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('unit.unitType')" prop="unitType">
          <el-select v-model="temp.unitType" placeholder="请选择单位类型">
            <el-option :key="1" :value="1" label="商铺" />
            <el-option :key="2" :value="2" label="住宅" />
            <el-option :key="3" :value="3" label="停车场" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('unit.unitRelativeProportion')" prop="unitRelativeProportion">
          <el-input v-model="temp.unitRelativeProportion" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitChildRelativeProportion')" prop="unitChildRelativeProportion">
          <el-input v-model="temp.unitChildRelativeProportion" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getUnitList
  } from '@/api/unit'
  import waves from '@/directive/waves' // Waves directive
  import {
    parseTime
  } from '@/utils'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Unit',
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
          page: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
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
        password: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getUnitList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      sortChange(data) {
        const {
          prop,
          order
        } = data
        if (prop === 'id') {
          this.sortByID(order)
        }
      },
      sortByID(order) {
        if (order === 'ascending') {
          this.listQuery.sort = '+id'
        } else {
          this.listQuery.sort = '-id'
        }
        this.handleFilter()
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
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      },
      handleDelete(row) {
        this.$confirm('确定删除单位【' + row.unitName + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }).catch(() => {})
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }

</script>
<style lang="postcss" scoped>
  .unit-container {
    padding: 30px;
  }

</style>
