<template>
  <div class="clubhouse-container">
    <div class="filter-container">
      <el-input :placeholder="$t('clubhouse.placeTraditionalName')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('clubhouse.placeTraditionalName')" prop="id" align="center" min-width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.placeTraditionalName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeEnglishName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeEnglishName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeTraditionalIntroduction')" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeTraditionalIntroduction }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeEnglishIntroduction')" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeEnglishIntroduction }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeStatus')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeStatus === '1' ? '开放' : '未开放' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.createTime')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? $moment(scope.row.createTime).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.images')" min-width="180px" align="center">
        <template slot-scope="scope">
          <img v-for="(item, index) of scope.row.images" :key="index" :src="(imgPrefix + item.imageUrl)" class="clubhouse-img">
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.updateTime')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime ? $moment(scope.row.updateTime).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeAdvanceOrderDay')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeAdvanceOrderDay }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeEndTime')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeFarthestOrderDay')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeFarthestOrderDay }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeIntroduction')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeIntroduction }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeNeedOrder')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeNeedOrder === '1' ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeStartTime')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeStartTime ? $moment(scope.row.placeStartTime).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('clubhouse.placeUpperLimit')" min-width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.placeUpperLimit ? $moment(scope.row.placeUpperLimit).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="160" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <span class="btn-text" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</span>
          <span class="btn-text" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('clubhouse.placeTraditionalName')" prop="placeTraditionalName">
              <el-input v-model="temp.placeTraditionalName" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.placeEnglishName')" prop="placeEnglishName">
              <el-input v-model="temp.placeEnglishName" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.placeTraditionalIntroduction')" prop="placeTraditionalIntroduction">
              <el-input v-model="temp.placeTraditionalIntroduction" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.placeEnglishIntroduction')" prop="placeEnglishIntroduction">
              <el-input v-model="temp.placeEnglishIntroduction" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.placeAdvanceOrderDay')" prop="placeAdvanceOrderDay">
              <el-input v-model="temp.placeAdvanceOrderDay" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.placeEndTime')" prop="placeEndTime">
              <el-input v-model="temp.placeEndTime" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.placeNeedOrder')" prop="placeNeedOrder">
              <el-select v-model="temp.placeNeedOrder" placeholder="请选择">
                <el-option :key="0" value="0" label="否" />
                <el-option :key="1" value="1" label="是" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('clubhouse.placeFarthestOrderDay')" prop="placeFarthestOrderDay">
              <el-input v-model="temp.placeFarthestOrderDay" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.images')" prop="images">
              <!-- <el-input v-model="temp.images" /> -->
            </el-form-item>
            <el-form-item :label="$t('clubhouse.createTime')" prop="createTime">
              <el-input v-model="temp.createTime" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.updateTime')" prop="updateTime">
              <el-input v-model="temp.updateTime" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.placeIntroduction')" prop="placeIntroduction">
              <el-input v-model="temp.placeIntroduction" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.placeStartTime')" prop="placeStartTime">
              <el-input v-model="temp.placeStartTime" />
            </el-form-item>
            <el-form-item :label="$t('clubhouse.placeStatus')" prop="placeStatus">
              <el-select v-model="temp.placeStatus" placeholder="请选择">
                <el-option :key="0" value="0" label="未开放" />
                <el-option :key="1" value="1" label="开放" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('clubhouse.community')" prop="communityId">
            <el-select v-model="temp.communityId" placeholder="请绑定社区">
              <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
            </el-select>
          </el-form-item>
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
    getClubhouseList,
    addClubhouse,
    delClubhouse,
    updateClubhouse
  } from '@/api/clubhouse'
  import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import {
    parseTime
  } from '@/utils'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Clubhouse',
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
      clubhouseStatusFilter(status) {
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
          createTime: null, // createTime
          updateTime: null, // updateTime
          images: [], // images 【】
          placeAdvanceOrderDay: null, // 提前天数
          placeEndTime: null, // placeEndTime
          placeEnglishIntroduction: '', // 简介(英文)
          placeEnglishName: '', // 场所名字(英文)
          placeFarthestOrderDay: null, // 最大天数
          placeId: '', // placeId
          placeIntroduction: '',
          placeNeedOrder: null, // 需要预定(0否1是)
          placeStartTime: null, // 起始时间
          placeStatus: null, // 场所状态(0未开放1开放)
          placeTraditionalIntroduction: '', // 简介(简体)
          placeTraditionalName: '', // 场所名字(繁体)
          placeUpperLimit: null
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
        const response = await getClubhouseList(this.listQuery).catch(e => e)
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
          createTime: null, // createTime
          updateTime: null, // updateTime
          images: [], // images 【】
          placeAdvanceOrderDay: null, // 提前天数
          placeEndTime: null, // placeEndTime
          placeEnglishIntroduction: '', // 简介(英文)
          placeEnglishName: '', // 场所名字(英文)
          placeFarthestOrderDay: null, // 最大天数
          placeId: '', // placeId
          placeIntroduction: '',
          placeNeedOrder: null, // 需要预定(0否1是)
          placeStartTime: null, // 起始时间
          placeStatus: null, // 场所状态(0未开放1开放)
          placeTraditionalIntroduction: '', // 简介(简体)
          placeTraditionalName: '', // 场所名字(繁体)
          placeUpperLimit: null
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
        const response = await addClubhouse(this.temp).catch(e => e)
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
        const response = await updateClubhouse(this.temp).catch(e => e)
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
        this.$confirm('确定删除场所【' + row.placeTraditionalName + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delClubhouse({ placeId: row.placeId }).catch(e => e)
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
  .clubhouse-container {
    padding: 30px;
  }
  .clubhouse-img {
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

