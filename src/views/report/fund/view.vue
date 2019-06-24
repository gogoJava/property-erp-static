<template>
  <div class="chargeItem-container">
    <div class="filter-container">
      <el-input :placeholder="$t('chargeItem.itemName')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" />
      <el-button size="mini" type="success" style="position: relative;top: -4px;float: right;" @click="handleCreate()">{{ $t('table.add') }}</el-button>
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('chargeItem.itemName')" prop="id" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.itemName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.itemNo')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.itemNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.community')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.community.communityName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.describe')" min-width="80px" align="center">
        <template slot-scope="scope">
          <!-- 金额用unitPrice -->
          <span>{{ scope.row.unitPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.additionalCost')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.additionalCost }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.formula')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.formula }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.alculationMethod')" min-width="180px" align="center">
        <template slot-scope="scope">
          <!-- 计算方式0定额1公式 -->
          <span>{{ scope.row.alculationMethod ? '公式' : '定额' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.billingMode')" min-width="80px" align="center">
        <template slot-scope="scope">
          <!-- 收费模式0每月一次1单次收费 -->
          <span>{{ scope.row.billingMode ? '单次收费' : '每月一次' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.lateFee')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lateFee }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.unitPrice')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('chargeItem.lateDate')" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lateDate }}</span>
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
    <el-dialog v-loading="listLoading" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="140px" style="margin:0 50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('chargeItem.itemName')" prop="username">
              <el-input v-model="temp.itemName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('chargeItem.itemNo')" prop="name">
              <el-input v-model="temp.itemNo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('chargeItem.alculationMethod')" prop="alculationMethod">
              <el-select v-model="temp.alculationMethod" placeholder="请选择">
                <el-option :value="0" label="每月一次" />
                <el-option :value="1" label="单次收费" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="$store.getters.isSuper" :span="12">
            <el-form-item :label="$t('chargeItem.community')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="!temp.billingMode" :span="12">
            <el-form-item :label="$t('chargeItem.describe')" prop="unitPrice">
              <!-- 金额用unitPrice字段 -->
              <el-input v-model="temp.unitPrice" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('chargeItem.additionalCost')" prop="additionalCost">
              <el-input v-model="temp.additionalCost" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('chargeItem.billingMode')" prop="billingMode">
              <el-select v-model="temp.billingMode" placeholder="请选择">
                <!-- 状态0欠费1已付2预支付 -->
                <el-option :value="0" label="定额" />
                <el-option :value="1" label="公式" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="temp.billingMode">
          <el-col :span="12">
            <el-form-item :label="$t('chargeItem.unitPrice')" prop="unitPrice">
              <el-input v-model="temp.unitPrice" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('chargeItem.formula')" prop="formula">
              <!-- <el-input v-model="temp.formula" /> -->
              <span>單位面積 x 計算單價</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('chargeItem.lateFee')" prop="lateFee">
              <el-input v-model="temp.lateFee" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('chargeItem.lateDate')" prop="lateDate">
              <el-input v-model="temp.lateDate" />
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
    addChargeItem,
    getChargeItemList,
    updChargeItem,
    delChargeItem
  } from '@/api/charge'
  import {
    getBuildingList
  } from '@/api/building'
  import { getCommunityList } from '@/api/community'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'ChargeItem',
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
          keyword: '',
          recordStatus: 0 // 状态0欠费1已付2预支付
        },
        communityList: [],
        buildingList: [],
        temp: {
          additionalCost: '', // 额外费用(基金费用)
          alculationMethod: null, // 计算方式0定额1公式
          billingMode: null, // 收费模式0周期性1临时性
          communityId: '', // 社区id
          describe: null, // 金额
          formula: '', // 计算公式
          itemId: '', // itemId
          itemName: '', // 收费项目名字
          itemNo: '', // 收费项目编号
          lateFee: null, // 滞纳金率(单位:百分之一)
          unitPrice: null, // 计算单价
          lateDate: null // 滞纳开始天数
        },
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        rules: {
          unitPrice: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          additionalCost: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          lateFee: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          lateDate: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ]
        }
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
      this.queryBuildingList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const { code, msg, data } = await getChargeItemList(this.listQuery).catch(e => e)
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
        const response = await getCommunityList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.communityList = response.data.list
      },
      // 获取建筑列表
      async queryBuildingList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.buildingList = response.data.list
      },
      resetTemp() {
        this.temp = {
          additionalCost: '', // 额外费用(基金费用)
          alculationMethod: null, // 计算方式0定额1公式
          billingMode: null, // 收费模式0周期性1临时性
          communityId: '', // 社区id
          describe: null, // 金额
          formula: '', // 计算公式
          itemId: '', // itemId
          itemName: '', // 收费项目名字
          itemNo: '', // 收费项目编号
          lateFee: null, // 滞纳金率(单位:百分之一)
          unitPrice: null, // 计算单价
          lateDate: null // 滞纳开始天数
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
        // this.temp.communityId = this.$store.getters.communityId
        const response = await addChargeItem(this.temp).catch(e => e)
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
        const isValidate = await new Promise(this.$refs.dataForm.validate)
        if (!isValidate) {
          return this.$notify({ title: '提示', message: '请填写正确的信息！', type: 'info', duration: 2000 })
        }
        this.listLoading = true
        // this.temp.communityId = this.$store.getters.communityId
        const response = await updChargeItem(this.temp).catch(e => e)
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
        this.$confirm('确定删除收费项目【' + row.itemName + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const { code, msg } = await delChargeItem({ itemId: row.itemId }).catch(e => e)
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
 .chargeItem-container {
    padding: 30px;
  }
</style>
