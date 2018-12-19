<template>
  <div class="building-container">
    <div class="filter-container">
      <el-input :placeholder="$t('building.buildingName')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('building.buildingNo')" prop="id" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.buildingName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.buildingDirection')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingDirection }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.buildingStruct')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingStruct }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.communityId')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.floorLowNum')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floorLowNum }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.floorUpNum')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floorUpNum }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.fullAddress')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fullAddress }}</span>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px" style="margin:0 50px;">
        <el-form-item :label="$t('building.buildingNo')" prop="buildingNo">
          <el-input v-model="temp.buildingNo" />
        </el-form-item>
        <el-form-item :label="$t('building.buildingName')" prop="buildingName">
          <el-input v-model="temp.buildingName" />
        </el-form-item>
        <el-form-item :label="$t('building.buildingDirection')" prop="buildingDirection">
          <el-input v-model="temp.buildingDirection" />
        </el-form-item>
        <el-form-item :label="$t('building.buildingStruct')" prop="buildingStruct">
          <el-input v-model="temp.buildingStruct" />
        </el-form-item>
        <el-form-item :label="$t('building.communityId')" prop="communityId">
          <el-select v-model="temp.communityId" placeholder="请绑定社区">
            <el-option :key="0" :value="0" label="社区1" />
            <el-option :key="1" :value="1" label="社区2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('building.floorLowNum')" prop="floorLowNum">
          <el-input v-model="temp.floorLowNum" />
        </el-form-item>
        <el-form-item :label="$t('building.floorUpNum')" prop="floorUpNum">
          <el-input v-model="temp.floorUpNum" />
        </el-form-item>
        <el-form-item :label="$t('building.fullAddress')" prop="fullAddress">
          <el-input v-model="temp.fullAddress" />
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
    getBuildingList
  } from '@/api/building'
  import waves from '@/directive/waves' // Waves directive
  import {
    parseTime
  } from '@/utils'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Building',
    components: {
      Pagination
    },
    directives: {
      waves
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      sexFilter(value) {
        const sexMap = {
          0: '女',
          1: '男'
        }
        return sexMap[value]
      },
      typeFilter(type) {
        const typeMap = {
          0: '普通管理员',
          1: '超级管理员'
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
          buildingDirection: '', // 楼宇方向
          buildingId: '', // buildingId
          buildingName: '', // 楼宇名字
          buildingNo: '', // 楼宇编号
          buildingStruct: '', // 楼宇结构
          communityId: '', // 社区ID
          floorLowNum: null, // 楼下几层
          floorUpNum: null, // 楼上几层
          fullAddress: '' // 楼宇全址
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
        getBuildingList(this.listQuery).then(response => {
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
        this.$confirm('确定删除大厦【' + row.buildingName + '】?', '提示', {
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
  .building-container {
    padding: 30px;
  }

</style>
