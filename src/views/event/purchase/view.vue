<template>
  <div class="event-container">
    <div class="filter-container">
      <el-input :placeholder="$t('event.eventContent')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
      <span style="padding-left: 15px;">{{ $t('event.eventType') }}:</span>
      <el-select v-model="listQuery.eventType" placeholder="请选择" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option :value="0" label="全部" />
        <el-option :value="1" label="采购" />
        <el-option :value="2" label="保养" />
        <el-option :value="3" label="其他" />
      </el-select>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('event.community')" prop="communityId" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.community.communityName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventType')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventType | eventTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventCause')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventCause }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventContent')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventContent }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventDate')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventDate ? $moment(scope.row.eventDate).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventFinishDate')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventFinishDate ? $moment(scope.row.eventFinishDate).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventRemindCycle')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventRemindCycle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventRemark')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventRemark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventSolve')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventSolve }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventStatus')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventStatus | eventStatusFilter }}</span>
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
            <el-form-item :label="$t('event.eventCause')" prop="username">
              <el-input v-model="temp.eventCause" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('event.eventContent')" prop="name">
              <el-input v-model="temp.eventContent" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('event.eventDate')" prop="idCard">
              <el-date-picker v-model="eventDate" type="date" format="yyyy-MM-dd" placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('event.eventFinishDate')" prop="englishName">
              <el-date-picker v-model="eventFinishDate" type="date" format="yyyy-MM-dd" placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="$store.getters.isSuper">
          <el-col :span="12">
            <el-form-item :label="$t('event.community')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('event.eventStatus')" prop="eventStatus">
              <!-- <el-input v-model="temp.eventStatus" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" /> -->
              <el-select v-model="temp.eventStatus" placeholder="请选择">
                <el-option :value="0" label="开始" />
                <el-option :value="1" label="待定" />
                <el-option :value="2" label="完成" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('event.eventStatus')" prop="eventStatus">
              <el-select v-model="temp.eventStatus" placeholder="请选择">
                <el-option :value="0" label="开始" />
                <el-option :value="1" label="待定" />
                <el-option :value="2" label="完成" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('event.eventType')" prop="eventType">
              <el-select v-model="temp.eventType" placeholder="请选择">
                <el-option :value="1" label="采购" />
                <el-option :value="2" label="保养" />
                <el-option :value="3" label="其他" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="temp.eventType === 2" :span="12">
            <el-form-item :label="$t('event.eventRemindCycle')" prop="eventRemindCycle">
              <el-input v-model="temp.eventRemindCycle" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('event.eventRemark')" prop="eventRemark">
              <el-input v-model="temp.eventRemark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('event.eventSolve')" prop="eventSolve">
              <el-input v-model="temp.eventSolve" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
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
    getEventList,
    createEvent,
    updateEvent,
    delEvent
  } from '@/api/event'
  import { getCommunityList } from '@/api/community'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Event',
    components: {
      Pagination
    },
    filters: {
      // 事件进度0开始1待定2完成
      eventStatusFilter(status) {
        const statusMap = {
          0: '开始',
          1: '待定',
          2: '完成'
        }
        return statusMap[status]
      },
      // 事件类型1采购2保养3其他
      eventTypeFilter(type) {
        const typeMap = {
          1: '采购',
          2: '保养',
          3: '其他'
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
          eventType: 0
        },
        communityList: [],
        buildingList: [],
        eventDate: '',
        eventFinishDate: '',
        temp: {
          communityId: '', // 社区ID
          eventCause: '', // 事件起因
          eventContent: '', // 事件内容
          eventDate: '', // 事件日期
          eventId: '', // ID
          eventFinishDate: null, // 完成时间
          eventRemark: '', // 备注
          eventSolve: '', // 解决方案
          eventStatus: 0, // 事件进度0开始1待定2完成
          eventType: 1, // 事件类型1采购2保养3其他
          eventRemindCycle: null
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
    watch: {
      'listQuery.keyword'() {
        this.getList()
      },
      'listQuery.eventType'() {
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
        const param = { ...this.listQuery }
        if (this.listQuery.eventType === 0) {
          delete param.eventType
        }
        const { code, msg, data } = await getEventList(param).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.list = [... data.list]
        this.total = data.total
      },
      // 获取社区列表
      async queryCommunityList() {
        if (!this.$store.getters.isSuper) return
        const response = await getCommunityList({ pageNo: 1, pageSize: 9999 }).catch(e => e)
        this.communityList = response.data.list
      },
      resetTemp() {
        this.eventDate = ''
        this.eventFinishDate = ''
        this.temp = {
          communityId: '', // 社区ID
          eventCause: '', // 事件起因
          eventContent: '', // 事件内容
          eventDate: '', // 事件日期
          eventId: '', // ID
          eventFinishDate: null, // 完成时间
          eventRemark: '', // 备注
          eventSolve: '', // 解决方案
          eventStatus: 0, // 事件进度0开始1待定2完成
          eventType: 1, // 事件类型1采购2保养3其他
          eventRemindCycle: null
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
        this.temp.eventDate = this.eventDate ? this.$moment(this.eventDate).format('YYYY-MM-DD') : ''
        this.temp.eventFinishDate = this.eventFinishDate ? this.$moment(this.eventFinishDate).format('YYYY-MM-DD') : ''
        const response = await createEvent(this.temp).catch(e => e)
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
        this.eventDate = this.temp.eventDate ? this.$moment(this.temp.eventDate) : ''
        this.eventFinishDate = this.temp.eventFinishDate ? this.$moment(this.temp.eventFinishDate) : ''
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        this.temp.communityId = this.$store.getters.communityId
        this.temp.eventDate = this.eventDate ? this.$moment(this.eventDate).format('YYYY-MM-DD') : ''
        this.temp.eventFinishDate = this.eventFinishDate ? this.$moment(this.eventFinishDate).format('YYYY-MM-DD') : ''
        this.listLoading = true
        const response = await updateEvent(this.temp).catch(e => e)
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
        this.$confirm('确定删除事件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delEvent({ eventId: row.eventId }).catch(e => e)
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
 .event-container {
    padding: 30px;
  }
</style>
