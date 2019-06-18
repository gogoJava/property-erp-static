<template>
  <div class="building-container">
    <div class="filter-container">
      <el-input :placeholder="$t('building.buildingName')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column :label="$t('building.buildingNo')" prop="id" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.buildingName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.managementType')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.managementType === 0 ? '简单管理' : '综合管理' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.buildingDirection')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingDirection }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.buildingStruct')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingStruct }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.communityId')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.community.communityName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.floorLowNum')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floorLowNum }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.floorUpNum')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.floorUpNum }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('building.fullAddress')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fullAddress }}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="margin:0 50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('building.buildingNo')" prop="buildingNo">
              <el-input v-model="temp.buildingNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('building.buildingName')" prop="buildingName">
              <el-input v-model="temp.buildingName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('building.buildingDirection')" prop="buildingDirection">
              <el-input v-model="temp.buildingDirection" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('building.buildingStruct')" prop="buildingStruct">
              <el-input v-model="temp.buildingStruct" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="$store.getters.isSuper" :label="$t('building.communityId')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('building.managementType')" prop="managementType">
              <el-select v-model="temp.managementType" disabled placeholder="请绑定类型">
                <el-option v-for="(item, index) in typeList" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('building.floorLowNum')" prop="floorLowNum">
              <el-input v-model="temp.floorLowNum" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('building.floorUpNum')" prop="floorUpNum">
              <el-input v-model="temp.floorUpNum" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item :label="$t('building.fullAddress')" prop="fullAddress">
              <el-input v-model="temp.fullAddress" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="!!temp.managementType" :label="$t('building.buildingChildList')" prop="buildingChildList">
          <el-row>
            <el-col :span="8"><div>排序</div></el-col>
            <el-col :span="8"><div>子部分之提示</div></el-col>
            <el-col :span="8"><div>子部分之值</div></el-col>
          </el-row>
          <el-row v-for="(item, index) in temp.buildingChildList" :key="index">
            <el-col :span="8"><el-input v-model="item.sort" placeholder="1" /></el-col>
            <el-col :span="8"><el-input v-model="item.tips" placeholder="数量"/></el-col>
            <el-col :span="8"><el-input v-model="item.value" placeholder="20"><el-button slot="append" icon="el-icon-minus" @click.native="cutChildList(index)"/></el-input></el-col>
          </el-row>
          <el-row style="text-align: center;"><span style="cursor: pointer;font-size: 30px;" @click="addChildList">+</span></el-row>
        </el-form-item>
        <!-- 综合类型才有 -->
        <el-form-item v-if="temp.managementType" :label="$t('building.commonPdf')">
          <single-image :value.sync="temp.commonPdf" :type="2"/>
        </el-form-item>
        <el-form-item :label="$t('building.rosterPdf')">
          <single-image :value.sync="temp.rosterPdf" :type="3"/>
        </el-form-item>
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
    getBuildingList,
    createBuilding,
    updateBuilding,
    delBuilding,
    getBuildingDetail
  } from '@/api/building'
  import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import SingleImage from './singleImage'

  export default {
    name: 'Building',
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
        temp: {
          buildingDirection: '', // 楼宇方向
          buildingId: '', // buildingId
          buildingName: '', // 楼宇名字
          buildingNo: '', // 楼宇编号
          buildingStruct: '', // 楼宇结构
          communityId: '', // 社区ID
          floorLowNum: null, // 楼下几层
          floorUpNum: null, // 楼上几层
          fullAddress: '', // 楼宇全址
          commonPdf: [],
          buildingChildList: [],
          rosterPdf: [],
          managementType: null
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
          }],
          floorLowNum: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+.?[0-9]*$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          floorUpNum: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+.?[0-9]*$/
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
        typeList: [
          { label: '简单管理', value: 0 },
          { label: '综合管理', value: 1 }
        ]
      }
    },
    computed: {
      setectedCommunity() {
        if (!this.temp.communityId) return null
        return this.communityList.find(v => v.communityId === this.temp.communityId)
      }
    },
    watch: {
      'listQuery.keyword'() {
        this.getList()
      },
      dialogFormVisible() {
        if (!this.dialogFormVisible) {
          this.resetTemp()
        }
      },
      'temp.communityId'() {
        this.temp.managementType = this.setectedCommunity && this.setectedCommunity.communityManagementType
      }
    },
    created() {
      this.getList()
      this.queryCommunityList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const { code, msg, data } = await getBuildingList(this.listQuery).catch(e => e)
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
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: '',
          commonPdf: [],
          buildingChildList: [],
          rosterPdf: [],
          managementType: null
        }
      },
      handleCreate() {
        if (!this.communityList.length) {
          this.queryCommunityList()
        }
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async createData() {
        // this.temp.communityId = this.$store.getters.communityId
        const response = await createBuilding(this.temp).catch(e => e)
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
        const temp = await this.querBuildingDetail(row.buildingId)
        this.temp = Object.assign({}, temp) // copy obj
        if (!this.temp.commonPdf) {
          this.temp.commonPdf = []
        }
        if (!this.temp.buildingChildList) {
          this.temp.buildingChildList = []
        }
        if (!this.temp.rosterPdf) {
          this.temp.rosterPdf = []
        }
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      async updateData() {
        this.listLoading = true
        // this.temp.communityId = this.$store.getters.communityId
        const response = await updateBuilding(this.temp).catch(e => e)
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
        this.$confirm('确定删除建筑【' + row.buildingName + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delBuilding({ buildingId: row.buildingId }).catch(e => e)
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
      },
      addChildList() {
        this.temp.buildingChildList.push({
          buildingId: '',
          childId: '',
          sort: null,
          tips: null,
          value: null
        })
      },
      cutChildList(index) {
        this.temp.buildingChildList.splice(index, 1)
      },
      async querBuildingDetail(buildingId) {
        const res = await getBuildingDetail({ buildingId }).catch(e => e)
        return res.data
      }
    }
  }

</script>
<style lang="postcss" scoped>
  .building-container {
    padding: 30px;
  }

</style>
