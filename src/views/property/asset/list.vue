<template>
  <div class="asset-container">
    <div class="filter-container">
      <el-input :placeholder="$t('asset.assetName')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('asset.assetDescribe')" prop="assetDescribe" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.assetDescribe }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetEnglishDescribe')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetEnglishDescribe }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetEnglishName')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetEnglishName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetEnglishPosition')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetEnglishPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetPosition')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetTraditionalDescribe')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetTraditionalDescribe }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetTraditionalName')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetTraditionalName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetTraditionalPosition')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetTraditionalPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetType')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.communityId')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="130" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="text" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="140px" style="margin:0 30px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetDescribe')" prop="assetDescribe">
              <el-input v-model="temp.assetDescribe" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetEnglishDescribe')" prop="assetEnglishDescribe">
              <el-input v-model="temp.assetEnglishDescribe" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetEnglishName')" prop="assetEnglishName">
              <el-input v-model="temp.assetEnglishName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetEnglishPosition')" prop="assetEnglishPosition">
              <el-input v-model="temp.assetEnglishPosition" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('asset.communityId')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetName')" prop="assetName">
              <el-input v-model="temp.assetName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetPosition')" prop="assetPosition">
              <el-input v-model="temp.assetPosition" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetTraditionalDescribe')" prop="assetTraditionalDescribe">
              <el-input v-model="temp.assetTraditionalDescribe" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetTraditionalName')" prop="assetTraditionalName">
              <el-input v-model="temp.assetTraditionalName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetTraditionalPosition')" prop="assetTraditionalPosition">
              <el-input v-model="temp.assetTraditionalPosition" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetType')" prop="assetType">
              <el-input v-model="temp.assetType" />
            </el-form-item>
          </el-col>
        </el-row>
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
    getAssetList,
    createAsset,
    updateAsset,
    delAsset
  } from '@/api/asset'
  import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Asset',
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
          pageNo: 1,
          pageSize: 10,
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
          assetDescribe: '', // 描述
          assetEnglishDescribe: '', // 描述（英文）
          assetEnglishName: '', // 资产名字（英文）
          assetEnglishPosition: '', // 位置信息（英文）
          assetId: '', // id
          assetName: '', // 资产名字
          assetPosition: '', // 位置信息
          assetTraditionalDescribe: '', // 描述（繁体）
          assetTraditionalName: '', // 资产名字（繁体）
          assetTraditionalPosition: '', // 位置信息（繁体）
          assetType: '', // 资产类型：电器、公共设备
          communityId: '' // 社区ID
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
        communityList: []
      }
    },
    created() {
      this.getList()
      this.queryCommunityList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const { code, msg, data } = await getAssetList(this.listQuery).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.list = [... data.list]
        this.total = data.total
      },
      handleFilter() {
        this.listQuery.pageNo = 1
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
      async createData() {
        const response = await createAsset(this.temp).catch(e => e)
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
        const response = await updateAsset(this.temp).catch(e => e)
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
        this.$confirm('确定删除资产【' + row.assetName + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delAsset({ assetId: row.assetId }).catch(e => e)
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
      // 获取社区列表
      async queryCommunityList() {
        const response = await getCommunityList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.communityList = response.data.list
      }
    }
  }

</script>
<style lang="postcss" scoped>
  .asset-container {
    padding: 30px;
  }

  .asset-portrait {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }

</style>
