<template>
  <div class="event-container">
    <div class="filter-container">
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('notice.community') }}:</span>
      <el-select v-model="listQuery.communityId" placeholder="请选择" filterable style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in communityList2"
          :key="item.communityId"
          :label="item.communityName"
          :value="item.communityId" />
      </el-select>
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('event.eventType') }}:</span>
      <el-select v-model="listQuery.eventType" placeholder="请选择" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option :value="0" label="全部" />
        <el-option :value="3" label="投诉" />
        <el-option :value="1" label="采购" />
        <el-option :value="2" label="保养" />
        <el-option :value="4" label="损坏" />
      </el-select>
      <el-input :placeholder="$t('event.eventContent')" v-model="listQuery.keyword" style="width: 200px;margin-left: 15px;" class="filter-item" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
      <!-- <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('event.eventStatus') }}:</span> -->
      <!-- <el-select v-model="listQuery.eventStatus" placeholder="请选择" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option value="" label="全部" />
        <el-option :value="0" label="跟进中" />
        <el-option :value="1" label="报价中" />
        <el-option :value="2" label="接获投诉" />
        <el-option :value="3" label="与管理机关讨论中" />
        <el-option :value="4" label="待定" />
        <el-option :value="5" label="工程进行中" />
        <el-option :value="6" label="待大会表决" />
        <el-option :value="7" label="完成" />
      </el-select> -->
      <el-button size="mini" type="primary" style="position: relative;top: -4px;left: 15px;" @click="handleExport()">{{ $t('table.export') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('event.community')" prop="communityId" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.community ? scope.row.community.communityName : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventType')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventType | eventTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventStatus')" min-width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ eventStatusFilter(scope.row.eventType, scope.row.eventStatus) }}</span>
          <!-- <span v-else>{{ scope.row.eventStatus.split(',').forEach(v => eventStatusFilter(scope.row.eventType, v)) }}</span> -->
        </template>
      </el-table-column>
      <el-table-column :label="$t('event.eventChannel')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventChannel | eventChannelFilter }}</span>
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
      <!-- <el-table-column :label="$t('event.eventRemindCycle')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eventRemindCycle }}</span>
        </template>
      </el-table-column> -->
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%" top="30px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="130px" style="margin:0 50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('event.assetNo')" prop="username">
              <el-input v-model="temp.assetNo" />
            </el-form-item>
          </el-col>
        </el-row>
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
            <el-form-item :label="$t('event.eventType')" prop="eventType">
              <el-select v-model="temp.eventType" placeholder="请选择">
                <el-option value="1" label="采购" />
                <el-option value="2" label="保养" />
                <el-option value="3" label="投诉" />
                <el-option value="4" label="损坏" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('event.eventStatus')" prop="eventStatus">
              <el-select v-if="temp.eventType === '2' || temp.eventType === '3'" v-model="temp.eventStatus" placeholder="请选择">
                <el-option v-for="(item, index) in eventStatusData" :key="index" :value="item" :label="item" />
                <!-- <el-option :value="0" label="跟进中" />
                <el-option :value="1" label="报价中" />
                <el-option :value="2" label="接获投诉" />
                <el-option :value="3" label="与管理机关讨论中" />
                <el-option :value="4" label="待定" />
                <el-option :value="5" label="工程进行中" />
                <el-option :value="6" label="待大会表决" />
                <el-option :value="7" label="完成" /> -->
              </el-select>
              <el-cascader v-else v-model="temp.eventStatusList" :options="eventStatusData" :props="{ checkStrictly: true }" change-on-select clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('event.community')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 接收渠道0公司1app2业主口头投诉 -->
            <el-form-item :label="$t('event.eventChannel')" prop="eventChannel">
              <el-select v-model="temp.eventChannel" placeholder="请选择">
                <el-option :value="0" label="公司" />
                <el-option :value="1" label="app" />
                <el-option :value="2" label="业主口头投诉" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row v-if="temp.eventType === 2">
          <el-col :span="12">
            <el-form-item :label="$t('event.eventRemindCycle')" prop="eventRemindCycle">
              <el-input v-model="temp.eventRemindCycle" />
            </el-form-item>
          </el-col>
        </el-row> -->
        <!-- 事件类型是投诉的时候才有 -->
        <el-row v-if="temp.eventType === 3">
          <el-col :span="12">
            <el-form-item :label="$t('event.complainClassType')" prop="username">
              <el-input v-model="temp.complainClassType" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('event.complainType')" prop="username">
              <el-input v-model="temp.complainType" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="temp.eventType === 3">
          <el-col :span="12">
            <el-form-item :label="$t('event.complainPosition')" prop="name">
              <el-input v-model="temp.complainPosition" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('event.complainSpecificPosition')" prop="name">
              <el-input v-model="temp.complainSpecificPosition" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="temp.eventType === 3">
          <el-col :span="24">
            <el-form-item :label="$t('event.complainReply')" prop="username">
              <el-input v-model="temp.complainReply" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
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
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('event.eventRemark')" prop="eventRemark">
              <el-input v-model="temp.eventRemark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('event.reportPdf')" prop="reportPdf">
              <single-image :value.sync="temp.reportPdf" action="http://songsong.fun/backstage/back/file/upload?type=5"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('event.reports')" prop="reports">
              <single-image :value.sync="temp.reports" action="http://songsong.fun/backstage/back/file/uploadFile?type=1"/>
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
  import {
    eventExport
  } from '@/api/file'
  import { getCommunityList } from '@/api/community'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import SingleImage from './singleImage'

  export default {
    name: 'Event',
    components: {
      Pagination,
      SingleImage
    },
    filters: {
      // 事件进度0开始1待定2完成
      // eventStatusFilter(status) {
      //   // 事件进度0跟进中1报价中2接获投诉3与管理机关讨论中4待定5工程进行中6待开大会表决7完成
      //   const statusMap = {
      //     0: '跟进中',
      //     1: '报价中',
      //     2: '接获投诉',
      //     3: '与管理机关讨论中',
      //     4: '待定',
      //     5: '工程进行中',
      //     6: '待开大会表决',
      //     7: '完成'
      //   }
      //   return statusMap[status]
      // },
      // 事件类型1采购2保养3其他
      eventTypeFilter(type) {
        const typeMap = {
          1: '采购',
          2: '保养',
          3: '投诉',
          4: '损坏'
        }
        return typeMap[type]
      },
      // 接收渠道0公司1app2业主口头投诉
      eventChannelFilter(value) {
        const valueMap = {
          0: '公司',
          1: 'app',
          2: '业主口头投诉'
        }
        return valueMap[value]
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
          eventType: 0,
          communityId: ''
          // eventStatus: ''
        },
        communityList: [],
        communityList2: [{ communityId: '', communityName: '全部' }],
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
          eventStatus: '', // 事件进度0开始1待定2完成
          eventStatusList: [],
          eventType: 1, // 事件类型1采购2保养3其他
          eventRemindCycle: null,
          eventChannel: null,
          reportPdf: [],
          reports: [],
          complainClassType: '',
          complainPosition: '',
          complainReply: '',
          complainSpecificPosition: '',
          complainType: '',
          assetNo: ''
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
    computed: {
      eventStatusData() {
        // console.log(typeof this.temp.eventType, this.temp.eventType)
        // 1:采购、2:保养、3：投诉、4:损坏
        const list = {
          1: [{ value: '1', label: '接受/发现', children: [{ value: '2', label: '确认事件', children: [{ value: '3', label: '跟进中', children: [
            { value: '4', label: '派工作到清洁跟进/派工作到工程部跟进/派工作到外派跟进', children: [{ value: '5', label: '检查', children: [{ value: '6', label: '完成' }] }] },
            { value: '7', label: '报价中(管理机关讨论)', children: [{ value: '8', label: '管理机关讨论', children: [{ value: '9', label: '待定', children: [{ value: '10', label: '发出通告', children: [{ value: '11', label: '工程跟进中', children: [{ value: '12', label: '工程验收', children: [{ value: '13', label: '完成' }] }] }] }] }] }] },
            { value: '14', label: '报价中(所有人大会)', children: [{ value: '15', label: '所有人大会', children: [{ value: '16', label: '发出通告', children: [{ value: '17', label: '工程进行中', children: [{ value: '18', label: '工程验收', children: [{ value: '19', label: '完成' }] }] }] }] }] }
          ] }] }] }],
          2: ['推动到行政', '报价中', '采购中', '到货', '在建筑物存货', '完成'],
          3: ['发出提示', '安排时间', '发出通告', '完成'],
          4: [{ value: '20', label: '接受/发现', children: [{ value: '21', label: '确认事件', children: [{ value: '22', label: '跟进中', children: [
            { value: '23', label: '派工作到清洁跟进/派工作到工程部跟进/派工作到外派跟进', children: [{ value: '24', label: '检查', children: [{ value: '25', label: '完成' }] }] },
            { value: '26', label: '报价中(管理机关讨论)', children: [{ value: '27', label: '管理机关讨论', children: [{ value: '28', label: '待定', children: [{ value: '29', label: '发出通告', children: [{ value: '30', label: '工程跟进中', children: [{ value: '31', label: '工程验收', children: [{ value: '32', label: '完成' }] }] }] }] }] }] },
            { value: '33', label: '报价中(所有人大会)', children: [{ value: '34', label: '所有人大会', children: [{ value: '35', label: '发出通告', children: [{ value: '36', label: '工程进行中', children: [{ value: '37', label: '工程验收', children: [{ value: '38', label: '完成' }] }] }] }] }] }
          ] }] }] }]
        }
        return list[this.temp.eventType]
      }
    },
    watch: {
      'listQuery.keyword'() {
        this.getList()
      },
      'listQuery.eventType'() {
        this.getList()
      },
      'listQuery.eventStatus'() {
        this.getList()
      },
      'listQuery.communityId'() {
        this.getList()
      }
    },
    created() {
      this.getList()
      this.queryCommunityList()
    },
    methods: {
      eventStatusFilter(eventType, status) {
        if (eventType === '2' || eventType === '3') {
          return status
        }
        // console.log('status', typeof status, status)
        const valueMap = {
          '1': '接受/发现',
          '2': '确认事件',
          '3': '跟进中',
          '4': '派工作到清洁跟进/派工作到工程部跟进/派工作到外派跟进',
          '5': '检查',
          '6': '完成',
          '7': '报价中(管理机关讨论)',
          '8': '管理机关讨论',
          '9': '待定',
          '10': '发出通告',
          '11': '工程进行中',
          '12': '工程验收',
          '13': '完成',
          '14': '报价中(所有人大会)',
          '15': '所有人大会',
          '16': '发出通告',
          '17': '工程进行中',
          '18': '工程验收',
          '19': '完成',
          '20': '接受/发现',
          '21': '确认事件',
          '22': '跟进中',
          '23': '派工作到清洁跟进/派工作到工程部跟进/派工作到外派跟进',
          '24': '检查',
          '25': '完成',
          '26': '报价中(管理机关讨论)',
          '27': '管理机关讨论',
          '28': '待定',
          '29': '发出通告',
          '30': '工程进行中',
          '31': '工程验收',
          '32': '完成',
          '33': '报价中(所有人大会)',
          '34': '所有人大会',
          '35': '发出通告',
          '36': '工程进行中',
          '37': '工程验收',
          '38': '完成'
        }
        let msg = ''
        status.split(',').forEach((v, index) => {
          if (index) msg = msg + ' -> '
          if (valueMap[v]) msg = msg + valueMap[v]
        })
        return msg || '无'
      },
      async getList() {
        this.listLoading = true
        const param = { ...this.listQuery }
        if (this.listQuery.eventType === 0) {
          delete param.eventType
        }
        if (!param.communityId) delete param.communityId
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
        if (!(this.$store.getters.isSuper || this.$store.getters.manager)) return
        const response = await getCommunityList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.communityList = response.data.list
        this.communityList2 = [...this.communityList2, ...response.data.list]
        // 经理身份
        if (this.$store.getters.manager) {
          this.communityList = this.communityList.filter(v => this.$store.getters.communityId.split(',').some((item) => item === v.communityId))
          this.communityList2 = this.communityList2.filter(v => this.$store.getters.communityId.split(',').some((item) => item === v.communityId))
        }
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
          eventStatus: '', // 事件进度0开始1待定2完成
          eventStatusList: [],
          eventType: 1, // 事件类型1采购2保养3其他
          eventRemindCycle: null,
          eventChannel: null,
          reportPdf: [],
          reports: [],
          complainClassType: '',
          complainPosition: '',
          complainReply: '',
          complainSpecificPosition: '',
          complainType: '',
          assetNo: ''
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
        // this.temp.communityId = this.$store.getters.communityId
        this.temp.eventDate = this.eventDate ? this.$moment(this.eventDate).format('YYYY-MM-DD') : ''
        this.temp.eventFinishDate = this.eventFinishDate ? this.$moment(this.eventFinishDate).format('YYYY-MM-DD') : ''
        if (this.temp.eventType === '2' || this.temp.eventType === '3') {
          this.temp.eventStatus = this.temp.eventStatusList.join(',')
        }
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
        if (this.temp.eventType === '1' || this.temp.eventType === '4') {
          this.temp.eventStatusList = this.temp.eventStatus.split(',')
        }
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        // this.temp.communityId = this.$store.getters.communityId
        this.temp.eventDate = this.eventDate ? this.$moment(this.eventDate).format('YYYY-MM-DD') : ''
        this.temp.eventFinishDate = this.eventFinishDate ? this.$moment(this.eventFinishDate).format('YYYY-MM-DD') : ''
        if (this.temp.eventType === '1' || this.temp.eventType === '4') {
          this.temp.eventStatus = this.temp.eventStatusList.join(',')
        }
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
      },
      // 导出
      async handleExport() {
        const param = { ...this.listQuery, buildingId: this.buildingId }
        if (!param.eventStatus && param.eventStatus !== 0) delete param.eventStatus
        if (!param.eventType) delete param.eventType
        if (!param.keyword) delete param.keyword
        const content = await eventExport(param).catch(e => e)
        const link = document.createElement('a')
        const blob = new Blob([content], {
          type: 'application/vnd.ms-excel'
        })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        let num = ''
        for (let i = 0; i < 10; i++) {
          num += Math.ceil(Math.random() * 10)
        }
        link.setAttribute('download', 'excel_' + num + '.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

</script>
<style lang="postcss" scoped>
 .event-container {
    padding: 30px;
  }
</style>
