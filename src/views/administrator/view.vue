<template>
  <div class="administrator-container">
    <div class="filter-container">
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('clubhouse.community') }}:</span>
      <el-select v-model="listQuery.communityId" :placeholder="$t('clubhouse.community')" filterable style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in communityList2"
          :key="item.communityId"
          :label="item.communityName"
          :value="item.communityId" />
      </el-select>
      <el-input :placeholder="$t('administrator.name')" v-model="listQuery.keyword" style="width: 200px;margin-left: 15px;" class="filter-item" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('administrator.name')" prop="id" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('administrator.communityId')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('administrator.username')" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('administrator.portrait')" min-width="120px" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.portrait" :src="(imgPrefix + scope.row.portrait)" class="proprietor-portrait">
        </template>
      </el-table-column>
      <el-table-column :label="$t('administrator.sex')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex | sexFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('administrator.type')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('administrator.email')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="220" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button type="text" size="mini" @click="handleUpdatePwd(scope.row)">{{ $t('table.updatePwd') }}</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%" top="120px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('administrator.name')" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('administrator.sex')" prop="sex">
              <el-select v-model="temp.sex" placeholder="请选择">
                <el-option :key="0" :value="0" label="女" />
                <el-option :key="1" :value="1" label="男" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('administrator.username')" prop="username">
              <el-input v-model="temp.username" />
            </el-form-item>
          </el-col>
          <el-col v-if="dialogStatus==='create'" :span="12">
            <el-form-item :label="$t('administrator.password')" prop="password">
              <el-input v-model="temp.password" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('administrator.type')" prop="type">
              <el-select v-model="temp.type" placeholder="请选择">
                <!-- <el-option v-for="(item, index) in roleList" :key="index" :value="item.roleId" :label="item.roleName" /> -->
                <el-option :key="0" :value="0" label="普通管理员" />
                <el-option :key="1" :value="1" label="超级管理员" />
                <el-option :key="2" :value="2" label="经理" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('administrator.communityId')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区" multiple style="width: 240px;">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('administrator.roleIds')" prop="type">
              <el-select v-model="temp.roleIds" multiple collapse-tags placeholder="请选择角色">
                <el-option v-for="(item, index) in roleList" :key="index" :value="item.roleId" :label="item.roleName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('administrator.email')" prop="email">
              <el-input v-model="temp.email" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('administrator.portrait')" prop="portrait">
              <single-image :value.sync="temp.portrait" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog :title="'修改密码'" :visible.sync="dialogUpdateVisible">
      <el-form ref="dataForm" :rules="rules" label-position="right" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('administrator.name')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="temp.password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getAdministratorList,
    addManager,
    delManager,
    updateManager,
    getRoleList,
    getManagerDetail
  } from '@/api/administrator'
  import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import {
    parseTime
  } from '@/utils'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import SingleImage from './singleImage'

  export default {
    name: 'Administrator',
    components: {
      Pagination,
      SingleImage
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
          1: '超级管理员',
          2: '经理'
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
          keyword: '',
          communityId: ''
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
          communityId: [],
          managerId: '',
          name: '',
          username: '',
          sex: 1,
          type: 0,
          password: '',
          email: '',
          roleIds: [],
          portrait: ''
        },
        dialogFormVisible: false,
        dialogUpdateVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        communityList: [], // 社区列表
        communityList2: [{ communityId: '', communityName: '全部' }],
        rules: {
          type: [{
            required: true,
            message: '请选择类型',
            trigger: ['change', 'blur']
          }],
          name: [{
            type: 'string',
            required: true,
            message: '请填写名字',
            trigger: ['change', 'blur']
          }],
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: ['change', 'blur']
          }]
        },
        downloadLoading: false,
        password: '',
        imgPrefix: 'http://songsong.fun/file', // 图片前缀
        roleList: [] // 角色列表
      }
    },
    watch: {
      'listQuery.keyword'() {
        this.getList()
      },
      'listQuery.communityId'() {
        this.getList()
      }
    },
    created() {
      this.getList()
      this.queryCommunityList()
      this.queryRoleList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const param = {
          ...this.listQuery
        }
        if (!param.communityId) delete param.communityId
        const response = await getAdministratorList(param).catch(e => e)
        if (response.code !== 200) {
          return this.$notify({
          title: '查询失败',
          message: response.msg,
          type: 'error',
          duration: 2000
        })
        }
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      },
      // 获取社区列表
      async queryCommunityList() {
        const response = await getCommunityList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.communityList = response.data.list
        this.communityList2 = [...this.communityList2, ...response.data.list]
      },
      // 获取社区列表
      async queryRoleList() {
        const response = await getRoleList().catch(e => e)
        this.roleList = response.data
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
      resetTemp() {
        this.temp = {
          communityId: '',
          managerId: '',
          name: '',
          username: '',
          sex: 1,
          type: 0,
          password: '',
          email: '',
          portrait: '',
          roleIds: []
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
        this.temp.roleIds = this.temp.roleIds.join(',')
        this.temp.communityId = this.temp.communityId.join(',')
        if (!this.temp.communityId) return this.$notify({ title: '提示', message: '请选择社区！', type: 'info', duration: 2000 })
        const response = await addManager(this.temp).catch(e => e)
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
      async handleUpdate(row) {
        const res = await getManagerDetail({ managerId: row.managerId })
        this.temp = Object.assign({}, res.data) // copy obj
        this.temp.roleIds = this.temp.roleIds && this.temp.roleIds.split(',')
        this.temp.communityId = this.temp.communityId.split(',')
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      // 修改密码
      handleUpdatePwd(row) {
        // this.password = ''
        this.temp = Object.assign({}, row) // copy obj
        this.temp.password = ''
        this.dialogUpdateVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        this.listLoading = true
        this.temp.roleIds = this.temp.roleIds.join(',')
        this.temp.communityId = this.temp.communityId.join(',')
        if (!this.temp.communityId) return this.$notify({ title: '提示', message: '请选择社区！', type: 'info', duration: 2000 })
        const response = await updateManager(this.temp).catch(e => e)
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
        this.$confirm('确定删除管理员【' + row.name + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delManager({ managerId: row.managerId }).catch(e => e)
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
  .administrator-container {
    padding: 30px;
  }
  .proprietor-portrait {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
</style>

