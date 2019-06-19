<template>
  <div class="unit-container">
    <div class="filter-container">
      <el-input :placeholder="$t('unit.unitName')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" />
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('unit.buildingId') }}:</span>
      <el-select v-model="buildingId" placeholder="请选择" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in buildingList"
          :key="item.buildingId"
          :label="item.buildingName"
          :value="item.buildingId" />
      </el-select>
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('unit.unitPurpose') }}:</span>
      <el-select v-model="listQuery.unitType" placeholder="请选择" style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="(item, index) in unitTypeList"
          :key="index"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('unit.unitPurpose')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitType | unitTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitNo')" prop="id" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.unitNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitName')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.buildingId')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.building.buildingName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitCoveredArea')" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitCoveredArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitFullAddress')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitFullAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitPosition')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitPosition }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitStatus')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitStatus | unitStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitTitle')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitRelativeProportion')" width="140px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitRelativeProportion }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('unit.unitChildRelativeProportion')" width="190px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitChildRelativeProportion }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="200" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <!-- <el-button size="mini" @click="handleUpdatePwd(scope.row)">{{ $t('table.updatePwd') }}</el-button> -->
          <el-button size="text" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
          <el-button type="text" size="mini" @click="bindUser(scope.row)">{{ $t('table.bindUser') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="800px" top="15px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="250px" style="width: 700px;">
        <el-form-item :label="$t('unit.unitPurpose')" prop="unitType">
          <el-select v-model="temp.unitType" placeholder="请选择用途">
            <el-option :key="1" :value="1" label="商业" />
            <el-option :key="2" :value="2" label="轻型汽车/电单车" />
            <el-option :key="3" :value="3" label="住宅" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('unit.unitNo')" prop="unitNo">
          <el-input v-model="temp.unitNo" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitName')" prop="unitName">
          <el-input v-model="temp.unitName" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitCoveredArea')" prop="unitCoveredArea">
          <el-input v-model="temp.unitCoveredArea" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitFullAddress')" prop="unitFullAddress">
          <el-input v-model="temp.unitFullAddress" />
        </el-form-item>
        <el-form-item :label="$t('unit.buildingId')" prop="buildingId">
          <el-select v-model="buildingId" placeholder="请绑定建筑" disabled>
            <el-option v-for="(item, index) in buildingList" :key="index" :value="item.buildingId" :label="item.buildingName" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('unit.unitPosition')" prop="unitPosition">
          <el-input v-model="temp.unitPosition" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitStatus')" prop="unitStatus">
          <el-select v-model="temp.unitStatus" placeholder="请选择单位状态">
            <el-option :key="0" :value="0" label="空置" />
            <el-option :key="1" :value="1" label="租赁" />
            <el-option :key="2" :value="2" label="装修中" />
            <el-option :key="3" :value="3" label="入住" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('unit.unitRelativeProportion')" prop="unitRelativeProportion">
          <el-input v-model="temp.unitRelativeProportion" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitChildRelativeProportion')" prop="unitChildRelativeProportion">
          <el-input v-model="temp.unitChildRelativeProportion" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitTitle')" prop="unitTitle">
          <el-input v-model="temp.unitTitle" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogShow" width="75%">
      <el-form ref="dataForm" :model="temp" label-position="right" style="text-align: left;">
        <el-form-item label="业主">
          <el-select v-model="userIds" filterable multiple collapse-tags placeholder="请绑定住户">
            <el-option v-for="(item, index) in allProprietorList" :key="index" :value="item.userId" :label="item.username" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-table :data="proprietorList" border fit highlight-current-row>
        <el-table-column :label="$t('proprietor.username')" prop="id" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('proprietor.englishName')" prop="id" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.englishName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('proprietor.owner')" prop="id" align="center" min-width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.owner" @change="ownerChange(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('proprietor.title')" prop="id" align="center" min-width="120">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.title" size="mini"/>
          </template>
        </el-table-column>
        <el-table-column :label="$t('proprietor.sex')" prop="id" align="center" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.sex | sexFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('proprietor.email')" prop="id" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('proprietor.advanceAmount')" prop="id" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.advanceAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" align="center" width="60">
          <template slot-scope="scope">
            <el-button size="text" type="danger" @click="handleBindDelete(scope.row)">{{ $t('table.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="testTwo">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getUnitList,
    createUnit,
    updateUnit,
    delUnit,
    batchAddUserUnitId,
    getUnitUserList
  } from '@/api/unit'
  import {
    getBuildingList
  } from '@/api/building'
  import {
    getProprietorList
  } from '@/api/proprietor'
  import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Unit',
    components: {
      Pagination
    },
    directives: {
      waves
    },
    filters: {
      unitStatusFilter(value) {
        // 单元状态0空置1租赁2装修中3入住
        const sexMap = {
          0: '空置',
          1: '租赁',
          2: '装修中',
          3: '入住'
        }
        return sexMap[value]
      },
      unitTypefilter(type) {
        // 单位类型1商铺2住宅3停车场
        const typeMap = {
          1: '商铺',
          2: '住宅',
          3: '停车场'
        }
        return typeMap[type]
      },
      sexFilter(value) {
        const sexMap = {
          0: '女',
          1: '男'
        }
        return sexMap[value]
      },
      unitTypeFilter(type) {
        // 单位用途1商业2轻型汽车/电单车3住宅
        const typeMap = {
          1: '商业',
          2: '轻型汽车/电单车',
          3: '住宅'
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
          unitType: ''
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
          unitChildRelativeProportion: null, // 分层建筑物之子部分相对比(千分之一)
          buildingId: '', // buildingId
          unitCoveredArea: null, // 覆盖面积大小(单位平方米)
          unitName: '', // 单元名字
          unitFullAddress: '', // 全址
          unitId: '', // unitId
          unitNo: null, // 单位编号
          unitPosition: '', // 位置(地下,一楼,二楼,三楼,户外.)
          unitPurpose: '', // 用途
          unitRelativeProportion: null, // 分层建筑物相对比(千分之一)
          unitStatus: null, // 单位状态0空置1租赁2装修中3入住
          unitType: null, // 单位类型1商铺2住宅3停车场
          unitTitle: null // 单位业权
        },
        unitInfo: null,
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
          unitRelativeProportion: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+.?[0-9]*$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          unitChildRelativeProportion: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+.?[0-9]*$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          unitTitle: [
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
        buildingList: [],
        buildingId: null,
        communityList: [],
        proprietorList: [],
        allProprietorList: [],
        dialogShow: false,
        userId: null,
        userIds: []
      }
    },
    computed: {
      unitTypeList() {
        // 单位用途1商业2轻型汽车/电单车3住宅
        const list = [
          { label: '全部', value: '' },
          { label: '商业', value: 1 },
          { label: '轻型汽车/电单车', value: 2 },
          { label: '住宅', value: 3 }
        ]
        return list
      }
    },
    watch: {
      buildingId() {
        this.getList()
      },
      'listQuery.keyword'() {
        this.getList()
      },
      'listQuery.unitType'() {
        this.getList()
      },
      userIds() {
        const list = []
        this.allProprietorList.forEach(v => {
          if (this.userIds.some(item => item === v.userId)) {
            // title: 业权
            const rr = this.proprietorList.find(info => info.userId === v.userId)
            list.push({ ...v, owner: rr ? rr.owner : false, title: 0 })
          }
        })
        const length = list.length
        this.proprietorList = list.map((v, index) => {
          const title = parseInt(this.unitInfo.unitTitle / length)
          // 余数
          const remainder = parseInt(this.unitInfo.unitTitle % length)
          return { ...v, title: (title + ((remainder && remainder > index) ? 1 : 0)) }
        })
      }
    },
    async created() {
      this.queryBuildyList()
      this.queryAllProprietorList()
      // this.queryCommunityList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const { code, msg, data } = await getUnitList({ ...this.listQuery, buildingId: this.buildingId }).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败1', message: msg, type: 'error', duration: 2000 })
        }
        this.list = data.list
        this.total = data.total
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      },
      resetTemp() {
        this.temp = {
          unitChildRelativeProportion: null, // 分层建筑物之子部分相对比(千分之一)
          buildingId: this.buildingId, // buildingId
          unitCoveredArea: null, // 覆盖面积大小(单位平方米)
          unitName: '', // 单元名字
          unitFullAddress: '', // 全址
          unitId: '', // unitId
          unitNo: null, // 单位编号
          unitPosition: '', // 位置(地下,一楼,二楼,三楼,户外.)
          unitPurpose: '', // 用途
          unitRelativeProportion: null, // 分层建筑物相对比(千分之一)
          unitStatus: null, // 单位状态0空置1租赁2装修中3入住
          unitType: null, // 单位类型1商铺2住宅3停车场
          unitTitle: null
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
        const response = await createUnit(this.temp).catch(e => e)
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
        // this.temp.communityId = this.$store.getters.communityId
        const response = await updateUnit(this.temp).catch(e => e)
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
        this.$confirm('确定删除单位【' + row.unitName + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delUnit({ unitId: row.unitId }).catch(e => e)
          if (code !== 200) {
            return this.$notify({ title: '失败2', message: msg, type: 'error', duration: 2000 })
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
       // 获取建筑列表
      async queryBuildyList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.buildingList = response.data.list
        this.buildingId = this.buildingList[0].buildingId
      },
      // 获取社区列表
      async queryCommunityList() {
        if (!this.$store.getters.isSuper) return
        const response = await getCommunityList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.communityList = response.data.list
      },
      // 获取用户列表
      // async queryCommunityList() {
      //   const response = await getCommunityList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
      //   this.communityList = response.data.list
      // },
      async queryAllProprietorList() {
        this.listLoading = true
        const { code, msg, data } = await getProprietorList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.allProprietorList = [... data.list]
      },
      async queryProprietorList(unitId) {
        const { code, msg, data } = await getUnitUserList({ unitId }).catch(e => e)
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.proprietorList = [... data]
        this.userIds = []
        this.proprietorList.forEach(value => {
          this.userIds.push(value.userId)
          if (value.owner) {
            this.userId = value.userId
          }
        })
      },
      async bindUser(info) {
        this.unitInfo = info
        this.userId = null
        this.unitId = info.unitId
        await this.queryProprietorList(this.unitId)
        this.dialogShow = true
      },
      async testTwo() {
        let owner = false
        // let userId = ''
        const userUnitList = []
        this.proprietorList.forEach((value) => {
          if (value.owner) {
            owner = value.owner
          }
          userUnitList.push({ userId: value.userId, unitId: this.unitId, owner: value.owner, title: value.title })
        })
        if (!owner && this.proprietorList.length) return this.$notify({ title: '提示', message: '一定要选一个拥有业主', type: 'info', duration: 2000 })
        const response = await batchAddUserUnitId({ userUnitList, unitId: this.unitId }).catch(e => e)
        if (response.code !== 200) {
          return this.$notify({ title: '关联失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.dialogFormVisible = false
        this.dialogShow = false
        this.$notify({
          title: '成功',
          message: '关联成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      },
      handleBindDelete(info) {
        this.proprietorList = this.proprietorList.filter(v => v.userId !== info.userId)
        this.userIds = this.userIds.filter(v => v !== info.userId)
      },
      ownerChange(info) {
        this.proprietorList = this.proprietorList.map(v => {
          return { ...v, owner: v.owner ? (info.userId === v.userId) : false }
        })
      }
    }
  }

</script>
<style lang="postcss" scoped>
  .unit-container {
    padding: 30px;
  }

</style>
