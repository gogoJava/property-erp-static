<template>
  <div class="placeRecord-container">
    <div class="filter-container">
      <el-input :placeholder="$t('placeRecord.place')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" />
      <!-- <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button> -->
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('placeRecord.place')" type="expand" min-width="200">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row>
              <el-col :span="6"><span>{{ $t('clubhouse.createTime') }}:{{ props.row.place.createTime }}</span></el-col>
              <el-col :span="6"><span>{{ $t('clubhouse.placeAdvanceOrderDay') }}:{{ props.row.place.placeAdvanceOrderDay }}</span></el-col>
              <el-col :span="8"><span>{{ $t('clubhouse.placeAttachCharge') }}:{{ props.row.place.placeAttachCharge }}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><span>{{ $t('clubhouse.placeCharge') }}:{{ props.row.place.placeCharge }}</span></el-col>
              <el-col :span="6"><span>{{ $t('clubhouse.placeEndTime') }}:{{ props.row.place.placeEndTime }}</span></el-col>
              <el-col :span="8"><span>{{ $t('clubhouse.placeEnglishIntroduction') }}:{{ props.row.place.placeEnglishIntroduction }}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><span>{{ $t('clubhouse.placeEnglishName') }}:{{ props.row.place.placeEnglishName }}</span></el-col>
              <el-col :span="6"><span>{{ $t('clubhouse.placeFarthestOrderDay') }}:{{ props.row.place.placeFarthestOrderDay }}</span></el-col>
              <el-col :span="8"><span>{{ $t('clubhouse.placeIconType') }}:{{ props.row.place.placeIconType }}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><span>{{ $t('clubhouse.placeIntroduction') }}:{{ props.row.place.placeIntroduction }}</span></el-col>
              <el-col :span="6"><span>{{ $t('clubhouse.placeName') }}:{{ props.row.place.placeName }}</span></el-col>
              <el-col :span="8"><span>{{ $t('clubhouse.placeNeedOrder') }}:{{ props.row.place.placeNeedOrder }}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><span>{{ $t('clubhouse.placeStartTime') }}:{{ props.row.place.placeStartTime }}</span></el-col>
              <el-col :span="6"><span>{{ $t('clubhouse.placeStatus') }}:{{ props.row.place.placeStatus }}</span></el-col>
              <el-col :span="8"><span>{{ $t('clubhouse.placeTraditionalIntroduction') }}:{{ props.row.place.placeTraditionalIntroduction }}</span></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><span>{{ $t('clubhouse.placeTraditionalName') }}:{{ props.row.place.placeTraditionalName }}</span></el-col>
              <el-col :span="6"><span>{{ $t('clubhouse.placeUpperLimit') }}:{{ props.row.place.placeUpperLimit }}</span></el-col>
              <el-col :span="8"><span>{{ $t('clubhouse.updateTime') }}:{{ props.row.place.updateTime }}</span></el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.attachCharge')" prop="id" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.attachCharge }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.averageCharge')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.averageCharge || '' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.createTime')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.orderDate')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderDate ? $moment(scope.row.orderDate).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.orderEndTime')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.orderStartTime')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderStartTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.recordStatus')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.recordStatus | recordStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.totalCharge')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.totalCharge }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.totalHour')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.totalHour }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('placeRecord.updateTime')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime ? $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm') : '--' }}</span>
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
            <el-form-item :label="$t('placeRecord.attachCharge')" prop="attachCharge">
              <el-input v-model="temp.attachCharge" />
            </el-form-item>
            <el-form-item :label="$t('placeRecord.averageCharge')" prop="averageCharge">
              <el-input v-model="temp.averageCharge"><template slot="append">rmb</template></el-input>
            </el-form-item>
            <el-form-item :label="$t('placeRecord.createTime')" prop="createTime">
              <!-- <el-input v-model="temp.createTime" /> -->
              <el-date-picker v-model="temp.createTime" type="datetime" format="yyyy-MM-DD HH:mm" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item :label="$t('placeRecord.orderDate')" prop="orderDate">
              <!-- <el-input v-model="temp.orderDate"/> -->
              <el-date-picker v-model="temp.orderDate" type="datetime" format="yyyy-MM-DD" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item :label="$t('placeRecord.orderStartTime')" prop="orderStartTime">
              <el-time-picker v-model="temp.orderStartTime" format="HH:mm:ss" placeholder="选择时间"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('placeRecord.totalCharge')" prop="totalCharge">
              <el-input v-model="temp.totalCharge" />
            </el-form-item>
            <el-form-item :label="$t('placeRecord.totalHour')" prop="totalHour">
              <el-input v-model="temp.totalHour" />
            </el-form-item>
            <el-form-item :label="$t('placeRecord.updateTime')" prop="updateTime">
              <!-- <el-input v-model="temp.updateTime" /> -->
              <el-date-picker v-model="temp.updateTime" type="datetime" format="yyyy-MM-DD HH:mm" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item :label="$t('placeRecord.recordStatus')" prop="recordStatus">
              <el-select v-model="temp.recordStatus" placeholder="请选择">
                <el-option :key="-1" value="-1" label="预约取消" />
                <el-option :key="0" value="0" label="开始发起" />
                <el-option :key="1" value="1" label="预约成功(收费)" />
                <el-option :key="2" value="2" label="预约失败" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('placeRecord.orderEndTime')" prop="orderEndTime">
              <el-time-picker v-model="temp.orderEndTime" format="HH:mm:ss" placeholder="选择时间"/>
            </el-form-item>
            <!-- <el-form-item v-if="$store.getters.isSuper" :label="$t('placeRecord.community')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item> -->
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
    getPlaceRecordList,
    delPlaceRecord,
    updatePlaceRecord
  } from '@/api/place'
  import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import {
    parseTime
  } from '@/utils'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import SingleImage from './singleImage'

  export default {
    name: 'PlaceRecord',
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
      },
      placeRecordStatusFilter(status) {
        const statusMap = {
          0: '发起',
          1: '收到',
          2: '处理中',
          3: '处理完成'
        }
        return statusMap[status]
      },
      recordStatusFilter(value) {
        // 预定状态(-1预约取消0开始发起1预约成功(收费)2预约失败)
        // const statusMap = {
        //   '-1': '预约取消',
        //   '0': '开始发起',
        //   '1': '预约成功(收费)',
        //   '2': '预约失败'
        // }
        // return statusMap[status]
        let msg = ''
        switch ((value - 0)) {
          case -1:
            msg = '预约取消'
            break
          case 0:
            msg = '开始发起'
            break
          case 1:
            msg = '预约成功(收费)'
            break
          case 2:
            msg = '预约失败'
            break
          default:
            msg = ''
        }
        return msg
      },
      placeIconTypeFilter(type) {
        // 0篮球场1羽毛球馆2KTV3足球馆4高尔夫馆
        const typeMap = {
          0: '篮球场',
          1: '羽毛球馆',
          2: 'KTV',
          3: '足球馆',
          4: '高尔夫馆'
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
        placeStartTime: '',
        placeEndTime: '',
        temp: {
          createTime: null, // createTime
          updateTime: null, // updateTime
          images: [], // images 【】
          placeAdvanceOrderDay: null, // 提前天数
          placeEndTime: '', // placeEndTime
          placeEnglishIntroduction: '', // 简介(英文)
          placeEnglishName: '', // 场所名字(英文)
          placeFarthestOrderDay: null, // 最大天数
          placeId: '', // placeId
          placeIntroduction: '',
          placeNeedOrder: null, // 需要预定(0否1是)
          placeStartTime: '', // 起始时间
          placeStatus: null, // 场所状态(0未开放1开放)
          placeTraditionalIntroduction: '', // 简介(简体)
          placeTraditionalName: '', // 场所名字(繁体)
          placeUpperLimit: null,
          placeName: null,
          placeIconType: null,
          placeCharge: null,
          placeAttachCharge: null,
          orderStartTime: '',
          orderEndTime: ''
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
        imgPrefix: 'http://songsong.fun/file' // 图片前缀
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
    },
    methods: {
      async getList() {
        this.listLoading = true
        const response = await getPlaceRecordList(this.listQuery).catch(e => e)
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
        if (!this.$store.getters.isSuper) return
        const response = await getCommunityList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.communityList = response.data.list
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
        this.temp = null
        this.placeStartTime = ''
        this.placeEndTime = ''
        this.temp = {
          createTime: null, // createTime
          updateTime: null, // updateTime
          images: [], // images 【】
          placeAdvanceOrderDay: null, // 提前天数
          placeEndTime: '', // placeEndTime
          placeEnglishIntroduction: '', // 简介(英文)
          placeEnglishName: '', // 场所名字(英文)
          placeFarthestOrderDay: null, // 最大天数
          placeId: '', // placeId
          placeIntroduction: '',
          placeNeedOrder: null, // 需要预定(0否1是)
          placeStartTime: '', // 起始时间
          placeStatus: null, // 场所状态(0未开放1开放)
          placeTraditionalIntroduction: '', // 简介(简体)
          placeTraditionalName: '', // 场所名字(繁体)
          placeUpperLimit: null,
          placeName: null,
          placeIconTypeL: null,
          placeCharge: null,
          placeAttachCharge: null
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
      // async createData() {
      //   // this.temp.communityId = this.$store.getters.communityId
      //   this.temp.placeStartTime = this.placeStartTime ? this.$moment(this.placeStartTime).format('YYYY-MM-DD HH:mm:ss') : ''
      //   this.temp.placeEndTime = this.placeEndTime ? this.$moment(this.placeEndTime).format('YYYY-MM-DD HH:mm:ss') : ''
      //   const response = await addplaceRecord(this.temp).catch(e => e)
      //   if (response.code !== 200) {
      //     return this.$notify({ title: '创建失败', message: response.msg, type: 'error', duration: 2000 })
      //   }
      //   this.dialogFormVisible = false
      //   this.$notify({
      //     title: '成功',
      //     message: '创建成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      //   this.getList()
      // },
      handleUpdate(row) {
        this.temp.images = []
        this.placeStartTime = this.temp.placeStartTime ? this.$moment(this.temp.placeStartTime) : ''
        this.placeEndTime = this.temp.placeEndTime ? this.$moment(this.temp.placeEndTime) : ''
        this.temp = null
        this.temp = Object.assign({}, row) // copy obj
        const start = this.temp.orderStartTime.split(':')
        const end = this.temp.orderEndTime.split(':')
        this.temp.orderStartTime = new Date(2019, 1, 1, start[0], start[1], start[2])
        this.temp.orderEndTime = new Date(2019, 1, 1, end[0], end[1], end[2])
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        // this.temp.communityId = this.$store.getters.communityId
        this.temp.placeStartTime = this.placeStartTime ? this.$moment(this.placeStartTime).format('YYYY-MM-DD HH:mm:ss') : ''
        this.temp.placeEndTime = this.placeEndTime ? this.$moment(this.placeEndTime).format('YYYY-MM-DD HH:mm:ss') : ''
        this.temp.orderStartTime = this.$moment(this.temp.orderStartTime).format('HH:mm:ss')
        this.temp.orderEndTime = this.$moment(this.temp.orderEndTime).format('YHH:mm:ss')
        this.listLoading = true
        const response = await updatePlaceRecord(this.temp).catch(e => e)
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
        this.$confirm('确定删除改场所记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delPlaceRecord({ recordId: row.recordId }).catch(e => e)
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
  .placeRecord-container {
    padding: 30px;
  }
  .placeRecord-img {
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

