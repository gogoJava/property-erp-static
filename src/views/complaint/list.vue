<template>
  <div class="complain-container">
    <div class="filter-container">
      <el-input :placeholder="$t('complain.complainClassType')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('complain.complainClassType')" prop="id" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.complainClassType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainDescribe')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainDescribe }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('complain.complainId')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainId }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('complain.complainLiaisonsEmail')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainLiaisonsEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainLiaisonsName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainLiaisonsName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainLiaisonsSex')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainLiaisonsSex === '1' ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainPosition')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainSpecificPosition')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainSpecificPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainStatus')" min-width="180px" align="center">
        <template slot-scope="scope">
          <!-- 状态:0发起1收到2处理中3处理完成 -->
          <span>{{ scope.row.complainStatus | complainStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainType')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainVoice')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainVoice }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.createTime')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? $moment(scope.row.createTime).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.images')" min-width="180px" align="center">
        <template slot-scope="scope">
          <img v-for="(item, index) of scope.row.images" :key="index" :src="(imgPrefix + item.imageUrl)" class="complain-img">
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.updateTime')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime ? $moment(scope.row.updateTime).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainFinishTime')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainFinishTime ? $moment(scope.row.complainFinishTime).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('complain.complainHandler')" min-width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.complainHandler || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="280" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <span class="btn-text" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</span>
          <!-- <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button> -->
          <span v-if="scope.row.complainStatus !== '1'" class="btn-text" @click="handleStatus(scope.row, 1)">收到</span>
          <span v-if="scope.row.complainStatus !== '2'" class="btn-text" @click="handleStatus(scope.row, 2)">处理中</span>
          <span v-if="scope.row.complainStatus !== '3'" class="btn-text" @click="handleStatus(scope.row, 3)">处理完成</span>
          <!-- <el-button type="text" size="mini" @click="handleUpdatePwd(scope.row)">{{ $t('table.updatePwd') }}</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('complain.name')" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="$t('complain.username')" prop="username">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item :label="$t('complain.sex')" prop="sex">
          <el-select v-model="temp.sex" placeholder="请选择">
            <el-option :key="0" :value="0" label="女" />
            <el-option :key="1" :value="1" label="男" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('complain.type')" prop="type">
          <el-select v-model="temp.type" placeholder="请选择">
            <el-option :key="0" :value="0" label="普通管理员" />
            <el-option :key="1" :value="1" label="超级管理员" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('complain.communityId')" prop="communityId">
          <el-select v-model="temp.communityId" placeholder="请绑定社区">
            <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('complain.email')" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item v-if="dialogStatus==='create'" :label="$t('complain.password')" prop="email">
          <el-input v-model="temp.password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog :title="'修改密码'" :visible.sync="dialogUpdateVisible">
      <el-form ref="dataForm" :rules="rules" label-position="right" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('complain.name')" prop="name">
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
    getComplainList,
    addComplain,
    delComplain,
    updateComplain,
    dealComplain
  } from '@/api/complain'
  import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import {
    parseTime
  } from '@/utils'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Complain',
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
      },
      complainStatusFilter(status) {
        const statusMap = {
          0: '发起',
          1: '收到',
          2: '处理中',
          3: '处理完成'
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
          importance: undefined,
          title: undefined,
          type: undefined
          // sort: '+id'
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
          complainClassType: '', // 类型分类（供电系统，发电机…
          complainDescribe: '', // 描述
          complainFinishTime: '', // 完成时间
          complainHandler: '', // complainHandler
          complainId: '', // complainId
          complainLiaisonsEmail: '',
          complainLiaisonsName: '', // complainLiaisonsName
          complainLiaisonsSex: null, // 联络人性别(0女1男)
          complainPosition: '', // complainPosition
          complainStatus: null, // 状态:0发起1收到2处理中3处理完成
          complainType: '', // 类型(土木工程，清洁，保安…)
          complainVoice: '', // example: E:/XXX/投诉.mp3
          createTime: null, // createTime
          images: [], // images 【】
          updateTime: null, // updateTime
          userId: '',
          complainSpecificPosition: '' // complainSpecificPosition
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
        password: '',
        imgPrefix: 'http://songsong.fun:8080/file' // 图片前缀
      }
    },
    created() {
      this.getList()
      this.queryCommunityList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const response = await getComplainList(this.listQuery).catch(e => e)
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
        const response = await getCommunityList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.communityList = response.data.list
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
          complainClassType: '', // 类型分类（供电系统，发电机…
          complainDescribe: '', // 描述
          complainFinishTime: '', // 完成时间
          complainHandler: '', // complainHandler
          complainId: '', // complainId
          complainLiaisonsEmail: '',
          complainLiaisonsName: '', // complainLiaisonsName
          complainLiaisonsSex: null, // 联络人性别(0女1男)
          complainPosition: '', // complainPosition
          complainStatus: null, // 状态:0发起1收到2处理中3处理完成
          complainType: '', // 类型(土木工程，清洁，保安…)
          complainVoice: '', // example: E:/XXX/投诉.mp3
          createTime: null, // createTime
          images: [], // images 【】
          updateTime: null, // updateTime
          userId: '',
          complainSpecificPosition: '' // complainSpecificPosition
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
        const response = await addComplain(this.temp).catch(e => e)
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
      // 处理投诉
      async handleStatus(row, status) {
        const response = await dealComplain({ complainId: row.complainId, complainStatus: status }).catch(e => e)
        if (response.code !== 200) {
          return this.$notify({ title: '处理失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '处理成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
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
        const response = await updateComplain(this.temp).catch(e => e)
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
          const { code, msg } = await delComplain({ managerId: row.managerId }).catch(e => e)
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
  .complain-container {
    padding: 30px;
  }
  .complain-img {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
  .btn-text {
    cursor: pointer;
    color: #409EFF;
    padding: 5px 8px;
  }
</style>

