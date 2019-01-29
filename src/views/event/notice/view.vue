<template>
  <div class="notice-container">
    <div class="filter-container">
      <el-input :placeholder="$t('notice.noticeTitle')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('notice.noticeTitle')" prop="id" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notice.noticeEnglishTitle')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeEnglishTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notice.noticeTraditionalTitle')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeTraditionalTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notice.noticeDetails')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeDetails }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notice.noticeEnglishDetails')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeEnglishDetails }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notice.noticeTraditionalDetails')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeTraditionalDetails }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notice.createTime')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notice.communityId')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notice.buildingId')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notice.noticeType')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.noticeType }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('notice.updateTime')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="130px" style="margin:0 50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('notice.noticeTitle')" prop="username">
              <el-input v-model="temp.noticeTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('notice.noticeEnglishTitle')" prop="name">
              <el-input v-model="temp.noticeEnglishTitle" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('notice.noticeTraditionalTitle')" prop="idCard">
              <el-input v-model="temp.noticeTraditionalTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('notice.noticeType')" prop="englishName">
              <el-input v-model="temp.noticeType" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('notice.buildingId')" prop="sex">
              <el-select v-model="temp.buildingId" placeholder="请选择">
                <el-option v-for="(item, index) in buildingList" :key="index" :value="item.buildingId" :label="item.buildingName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('notice.communityId')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('notice.noticeType')" prop="countryCode">
              <el-input v-model="temp.noticeType" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('notice.noticeDetails')" prop="noticeDetails">
              <el-input v-model="temp.noticeDetails" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('notice.noticeEnglishDetails')" prop="noticeEnglishDetails">
              <el-input v-model="temp.noticeEnglishDetails" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('notice.noticeTraditionalDetails')" prop="noticeTraditionalDetails">
              <el-input v-model="temp.noticeTraditionalDetails" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
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
    getNoticeList,
    createNotice,
    updateNotice,
    delNotice
  } from '@/api/noticeApi'
  import {
    getBuildingList
  } from '@/api/building'
  import { getCommunityList } from '@/api/community'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Notice',
    components: {
      Pagination
    },
    filters: {
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
        },
        communityList: [],
        buildingList: [],
        temp: {
          buildingId: '', // 建筑id
          communityId: '', // 社区ID
          createTime: '', // 创建时间
          noticeDetails: '', // 详情
          noticeEnglishDetails: '', // 详情英文
          noticeEnglishTitle: '', // 场所标题
          noticeId: '', // ID
          noticeImage: [], // 图片
          noticeTitle: '', // 场所标题
          noticeTraditionalDetails: '', // 详情（繁体）
          noticeTraditionalTitle: '', // 标题
          noticeType: '', // 通知类型
          updateTime: '' // 更新时间
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
    created() {
      this.getList()
      this.queryCommunityList()
      this.queryBuildingList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const { code, msg, data } = await getNoticeList(this.listQuery).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.list = [... data.list]
        this.total = data.total
      },
      // 获取社区列表
      async queryCommunityList() {
        const response = await getCommunityList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.communityList = response.data.list
      },
      // 获取建筑列表
      async queryBuildingList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.buildingList = response.data.list
      },
      resetTemp() {
        this.temp = {
          buildingId: '', // 建筑id
          communityId: '', // 社区ID
          createTime: '', // 创建时间
          noticeDetails: '', // 详情
          noticeEnglishDetails: '', // 详情英文
          noticeEnglishTitle: '', // 场所标题
          noticeId: '', // ID
          noticeImage: [], // 图片
          noticeTitle: '', // 场所标题
          noticeTraditionalDetails: '', // 详情（繁体）
          noticeTraditionalTitle: '', // 标题
          noticeType: '', // 通知类型
          updateTime: '' // 更新时间
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
        const response = await createNotice(this.temp).catch(e => e)
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
        const response = await updateNotice(this.temp).catch(e => e)
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
        this.$confirm('确定删除公告【' + row.noticeTitle + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delNotice({ noticeId: row.noticeId }).catch(e => e)
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
      }
    }
  }

</script>
<style lang="postcss" scoped>
 .notice-container {
    padding: 30px;
  }
</style>
