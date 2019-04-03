<template>
  <div class="adv-container">
    <div class="filter-container">
      <el-input :placeholder="$t('adv.title')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('adv.community')" prop="id" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.community.communityName || '全部' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('adv.describe')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.describe }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('adv.title')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('adv.type')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type === 0 ? '普通图片' : '视屏' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('adv.url')" min-width="180px" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.url }}</span> -->
          <img :src="(imgPrefix + scope.row.url)" class="adv-portrait">
        </template>
      </el-table-column>
      <el-table-column :label="$t('adv.used')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.used ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="186" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="text" @click="handlePublish(scope.row)">{{ scope.row.used ? $t('table.cancel') : $t('table.publish') }}</el-button>
          <el-button size="text" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="60%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="margin:0 50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('adv.title')" prop="title">
              <el-input v-model="temp.title" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('adv.describe')" prop="describe">
              <el-input v-model="temp.describe" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('adv.type')" prop="type">
              <!-- <el-input v-model="temp.type" /> -->
              <el-select v-model="temp.type" placeholder="请选择">
                <el-option :value="0" label="普通图片" />
                <el-option :value="1" label="视频" disabled />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('adv.used')" prop="used">
              <!-- <el-input v-model="temp.used" /> -->
              <el-select v-model="temp.used" placeholder="请选择">
                <el-option :value="true" label="是" />
                <el-option :value="false" label="否" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="$store.getters.isSuper" :span="12">
            <el-form-item :label="$t('adv.community')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('adv.building')" prop="buildingId">
              <el-select v-model="temp.buildingId" placeholder="请绑定建筑">
                <el-option v-for="(item, index) in buildingList" :key="index" :value="item.buildingId" :label="item.buildingName" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('adv.url')" prop="url">
              <single-image :value.sync="temp.url" />
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
    getAdvList,
    addAdv,
    updateAdv,
    delAdv,
    publishAdv
  } from '@/api/adv'
  import { getCommunityList } from '@/api/community'
  import { getBuildingList } from '@/api/building'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import SingleImage from './singleImage'

  export default {
    name: 'Adv',
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
          advId: '', // ID
          buildingId: '', // 楼宇id
          community: null, // 社区
          communityId: '', // communityId
          describe: '', // 描述
          residenceTime: '',
          title: '', // title
          type: 0, // 广告类型 0普通图片1视频
          url: '', // url
          used: null // 是否使用0否1是
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
        // communityList: [],
        // buildingList: [],
        communityList: [{ communityId: '', communityName: '全部' }],
        buildingList: [{ buildingId: '', buildingName: '全部' }],
        imgPrefix: 'http://songsong.fun:8080/file' // 图片前缀
      }
    },
    watch: {
      'listQuery.keyword'() {
        this.getList()
      }
    },
    created() {
      this.getList()
      this.queryCommunityList()
      this.queryBuildList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const { code, msg, data } = await getAdvList(this.listQuery).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.list = [... data.list]
        this.total = data.total
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
          advId: '', // ID
          buildingId: '', // 楼宇id
          community: null, // 社区
          communityId: '', // communityId
          describe: '', // 描述
          residenceTime: '',
          title: '', // title
          type: 0, // 广告类型 0普通图片1视频
          url: '', // url
          used: null // 是否使用0否1是
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
        this.temp.communityId = this.$store.getters.communityId
        const response = await addAdv(this.temp).catch(e => e)
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
        this.temp.communityId = this.$store.getters.communityId
        const response = await updateAdv(this.temp).catch(e => e)
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
        this.$confirm('确定删除广告【' + row.title + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delAdv({ advId: row.advId }).catch(e => e)
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
      // 发布/取消
      async handlePublish(row) {
        const text = row.used ? '取消' : '发布'
        const { code, msg } = await publishAdv({ advId: row.advId }).catch(e => e)
        if (code !== 200) {
          return this.$notify({ title: text + '广告失败', message: msg, type: 'error', duration: 2000 })
        }
        this.$notify({
          title: '成功',
          message: text + '广告成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      },
      // 获取社区列表
      async queryCommunityList() {
        if (!this.$store.getters.isSuper) return
        const response = await getCommunityList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.communityList = [...this.communityList, ...response.data.list]
      },
       // 获取建筑列表
      async queryBuildList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.buildingList = [...this.buildingList, ...response.data.list]
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
  .adv-container {
    padding: 30px;
  }

  .adv-portrait {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }

</style>
