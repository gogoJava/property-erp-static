<template>
  <div class="asset-container">
    <div class="filter-container">
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('notice.community') }}:</span>
      <el-select v-model="listQuery.communityId" filterable placeholder="请选择" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in communityList2"
          :key="item.communityId"
          :label="item.communityName"
          :value="item.communityId" />
      </el-select>
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('unit.buildingId') }}:</span>
      <el-select v-model="buildingId" filterable placeholder="请选择" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in buildingList"
          :key="item.buildingId"
          :label="item.buildingName"
          :value="item.buildingId" />
      </el-select>
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;right: 15px;" @click="handleExport()">{{ $t('table.export') }}</el-button>
    </div>
    <div class="filter-container">
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('asset.assetStatus') }}:</span>
      <el-select v-model="listQuery.assetStatus" :placeholder="$t('asset.assetStatus')" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="(item, index) in assetStatusList"
          :key="index"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-input :placeholder="$t('asset.assetNo') + ' ' + $t('asset.assetName')" v-model="listQuery.keyword" style="width: 200px;margin-left: 15px;" class="filter-item" />
      <el-input :placeholder="$t('asset.assetMaintainRemindCycle')" v-model="listQuery.assetMaintainRemindCycle" style="width: 200px;position: relative;padding-left: 15px;" class="filter-item" />
      <el-date-picker v-model="listQuery.assetOverdueDate" :placeholder="$t('asset.assetOverdueDate')" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" style="position: relative;top: -4px;left: 15px;"/>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('asset.assetNo')" prop="assetNo" align="center" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.assetNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetDescribe')" prop="assetDescribe" align="center" min-width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.assetDescribe }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetEnglishDescribe')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetEnglishDescribe }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetEnglishName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetEnglishName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetStatus')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetStatus | assetStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetMaintainRemindCycle')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetMaintainRemindCycle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetOverdueDate')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetOverdueDate ? $moment(scope.row.assetOverdueDate).format('YYYY-MM-DD HH:mm') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetPosition')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetEnglishPosition')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetEnglishPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetMaintain')" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetMaintain }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.assetBuyDate')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetBuyDate ? $moment(scope.row.assetBuyDate).format('YYYY-MM-DD HH:mm') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('asset.community')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.community.communityName }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('asset.assetType')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.assetType }}</span>
        </template>
      </el-table-column> -->
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="140px" style="margin:0 30px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetNo')" prop="assetNo">
              <el-input v-model="temp.assetNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetStatus')" prop="assetStatus">
              <el-select v-model="temp.assetStatus" placeholder="请选择状态">
                <el-option :key="1" :value="0" label="使用中" />
                <el-option :key="2" :value="1" label="货存" />
                <el-option :key="3" :value="2" label="损坏" />
                <el-option :key="4" :value="3" label="弃置" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
            <el-form-item :label="$t('asset.assetName')" prop="assetName">
              <el-input v-model="temp.assetName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetEnglishName')" prop="assetEnglishName">
              <el-input v-model="temp.assetEnglishName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetPosition')" prop="assetPosition">
              <el-input v-model="temp.assetPosition" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetEnglishPosition')" prop="assetEnglishPosition">
              <el-input v-model="temp.assetEnglishPosition" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetMaintain')" prop="assetMaintain">
              <el-select v-model="temp.assetMaintain" placeholder="是否保养">
                <el-option :value="true" label="是" />
                <el-option :value="false" label="否" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetMaintainRemindCycle')" prop="assetMaintainRemindCycle">
              <el-input v-model="temp.assetMaintainRemindCycle" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.buildingId')" prop="buildingId">
              <el-select v-model="temp.buildingId" filterable placeholder="请选择">
                <el-option v-for="(item, index) in buildingList" :key="index" :value="item.buildingId" :label="item.buildingName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="$store.getters.isSuper" :span="12">
            <el-form-item :label="$t('asset.community')" prop="communityId">
              <el-select v-model="temp.communityId" filterable placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetBuyDate')" prop="assetBuyDate">
              <el-date-picker v-model="assetBuyDate" type="date" format="yyyy-MM-dd" placeholder="选择日期"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('asset.assetOverdueDate')" prop="assetOverdueDate">
              <el-date-picker v-model="assetOverdueDate" type="date" format="yyyy-MM-dd" placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('asset.assetImage')" prop="assetImage">
              <single-image :value.sync="temp.assetImage" />
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
  import {
    getBuildingList
  } from '@/api/building'
  import {
    assetExport
  } from '@/api/file'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import SingleImage from './singleImage'

  export default {
    name: 'Asset',
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
      assetStatusFilter(type) {
        // 状态0使用中1货存2损坏3弃置
        const typeMap = {
          0: '使用中',
          1: '货存',
          2: '损坏',
          3: '弃置'
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
          assetMaintainRemindCycle: '',
          assetOverdueDate: '',
          assetStatus: '',
          communityId: ''
        },
        buildingId: '',
        buildingList: [{ buildingId: '', buildingName: '全部' }],
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
          communityId: '', // 社区ID
          buildingId: '',
          assetMaintain: true,
          assetMaintainRemindCycle: null,
          assetBuyDate: null,
          assetOverdueDate: null,
          assetStatus: null,
          assetNo: '',
          assetImage: []
        },
        assetBuyDate: '',
        assetOverdueDate: '',
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
          }],
          assetMaintainRemindCycle: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ]
        },
        downloadLoading: false,
        password: null,
        communityList: [],
        communityList2: [{ communityId: '', communityName: '全部' }]
      }
    },
    computed: {
      assetStatusList() {
        // 状态0使用中1货存2损坏3弃置
        const list = [
          { label: '全部', value: '' },
          { label: '使用中', value: 0 },
          { label: '货存', value: 1 },
          { label: '损坏', value: 2 },
          { label: '弃置', value: 3 }
        ]
        return list
      }
    },
    watch: {
      'listQuery.keyword'() {
        this.getList()
      },
      'listQuery.assetStatus'() {
        this.getList()
      },
      'listQuery.assetMaintainRemindCycle'() {
        this.getList()
      },
      'listQuery.assetOverdueDate'() {
        this.getList()
      },
      'listQuery.communityId'() {
        this.getList()
      },
      buildingId() {
        this.getList()
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
        const param = {
          ...this.listQuery,
          buildingId: this.buildingId
        }
        if (!param.communityId) delete param.communityId
        if (!param.buildingId) delete param.buildingId
        const { code, msg, data } = await getAssetList(param).catch(e => e)
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
        this.assetBuyDate = ''
        this.assetOverdueDate = ''
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: '',
          assetMaintain: true,
          assetMaintainRemindCycle: null,
          assetBuyDate: null,
          assetOverdueDate: null,
          assetStatus: null,
          assetNo: '',
          assetImage: []
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
        const isValidate = await new Promise(this.$refs.dataForm.validate)
        if (!isValidate) {
          return this.$notify({ title: '提示', message: '请填写正确的信息！', type: 'info', duration: 2000 })
        }
        this.temp.assetBuyDate = this.assetBuyDate ? this.$moment(this.assetBuyDate).format('YYYY-MM-DD') : ''
        this.temp.assetOverdueDate = this.assetOverdueDate ? this.$moment(this.assetOverdueDate).format('YYYY-MM-DD') : ''
        // this.temp.communityId = this.$store.getters.communityId
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
        this.assetBuyDate = this.temp.assetBuyDate ? this.$moment(this.temp.assetBuyDate) : ''
        this.assetOverdueDate = this.temp.assetOverdueDate ? this.$moment(this.temp.assetOverdueDate) : ''
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        const isValidate = await new Promise(this.$refs.dataForm.validate)
        if (!isValidate) {
          return this.$notify({ title: '提示', message: '请填写正确的信息！', type: 'info', duration: 2000 })
        }
        this.listLoading = true
        // this.temp.communityId = this.$store.getters.communityId
        this.temp.assetBuyDate = this.assetBuyDate ? this.$moment(this.assetBuyDate).format('YYYY-MM-DD') : ''
        this.temp.assetOverdueDate = this.assetOverdueDate ? this.$moment(this.assetOverdueDate).format('YYYY-MM-DD') : ''
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
        if (!this.$store.getters.isSuper) return
        const response = await getCommunityList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.communityList = response.data.list
        this.communityList2 = [...this.communityList2, ...response.data.list]
      },
      // 获取建筑列表
      async queryBuildingList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.buildingList = [...this.buildingList, ...response.data.list]
      },
      // 导出
      async handleExport() {
        const content = await assetExport(this.listQuery).catch(e => e)
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
  .asset-container {
    padding: 30px;
  }

  .asset-portrait {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }

</style>
