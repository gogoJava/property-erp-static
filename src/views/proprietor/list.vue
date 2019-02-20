<template>
  <div class="proprietor-container">
    <div class="filter-container">
      <el-input :placeholder="$t('proprietor.name')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('proprietor.username')" prop="id" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.name')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.portrait')" min-width="120px" align="center">
        <template slot-scope="scope">
          <img :src="(imgPrefix + scope.row.portrait)" class="proprietor-portrait">
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.englishName')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.englishName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.communityId')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.community.communityName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.countryCode')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.countryCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.sex')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex | sexFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.tel')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.marriageSystem')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.marriageSystem }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.idCard')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.idCard }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('proprietor.birthday')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('proprietor.mateName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mateName }}</span>
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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="margin:0 50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.username')" prop="username">
              <el-input v-model="temp.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.name')" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.idCard')" prop="idCard">
              <el-input v-model="temp.idCard" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.englishName')" prop="englishName">
              <el-input v-model="temp.englishName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.sex')" prop="sex">
              <el-select v-model="temp.sex" placeholder="请选择">
                <el-option :key="0" :value="0" label="女" />
                <el-option :key="1" :value="1" label="男" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.communityId')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.countryCode')" prop="countryCode">
              <el-input v-model="temp.countryCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.tel')" prop="tel">
              <el-input v-model="temp.tel" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.marriageSystem')" prop="marriageSystem">
              <el-input v-model="temp.marriageSystem" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.mateName')" prop="mateName">
              <el-input v-model="temp.mateName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.birthday')" prop="birthday">
              <el-input v-model="temp.birthday" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.password')" prop="password">
              <el-input v-model="temp.password" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('proprietor.portrait')" prop="portrait">
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
  </div>
</template>

<script>
  import {
    getProprietorList,
    createProprietor,
    updateProprietor,
    delProprietor
  } from '@/api/proprietor'
  import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import SingleImage from './singleImage'

  export default {
    name: 'Proprietor',
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
          birthday: '出生日期', // 出生日期
          communityId: '社区', // 社区ID
          countryCode: '区号', // 区号
          createTime: '创建时间', // 创建时间
          email: '电邮', // 邮编
          englishName: '英文名字', // 英文名字
          deleted: false, // 是否注销
          idCard: '身份证号码', // 身份证号码
          marriageSystem: '婚姻制度', // 婚姻制度
          mateName: '配偶名字', // 配偶名字
          name: '名字', // 名字
          portrait: '用户头像', // 用户头像
          sex: '性别', // 性别(0女1男)
          tel: '手机号', // 手机号
          updateTime: '更新日期', // 更新时间
          userId: '用户ID', // 用户id
          username: '用户登录账号', // 用户登录账号
          password: '密码'
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
        communityList: [],
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
        const { code, msg, data } = await getProprietorList(this.listQuery).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.list = [... data.list]
        this.total = data.total
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
          type: '',
          password: ''
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
        const response = await createProprietor(this.temp).catch(e => e)
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
        this.temp.password = ''
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        this.listLoading = true
        const response = await updateProprietor(this.temp).catch(e => e)
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
        this.$confirm('确定删除业主【' + row.username + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delProprietor({ userId: row.userId }).catch(e => e)
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
      },
      // 上传图片成功
      handleAvatarSuccess(res, file) {
        console.log('handleAvatarSuccess')
        this.temp.portrait = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }

</script>
<style lang="postcss" scoped>
  .proprietor-container {
    padding: 30px;
  }

  .proprietor-portrait {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }

</style>
