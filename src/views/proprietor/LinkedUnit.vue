<template>
  <div class="unit-container">
    <el-row style="position: relative;top: -30px;">
      <span>{{ $t('unit.unitId') }} : </span>
      <el-select v-model="unitIds" multiple collapse-tags placeholder="请绑定单元">
        <el-option v-for="(item, index) in allUnits" :key="index" :value="item.unitId" :label="item.unitName" />
      </el-select>
      <el-button type="primary" style="position: relative;left: 30px;" @click="testTwo">{{ $t('proprietor.userWithCommunities') }}</el-button>
    </el-row>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
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
      <el-table-column :label="$t('unit.unitType')" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unitType | unitTypefilter }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" /> -->
  </div>
</template>

<script>
  import {
    getUnitList,
    batchAddUser
  } from '@/api/unit'
  // import { getCommunityList } from '@/api/community'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Unittest',
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
      }
    },
    props: {
      userId: {
        type: String,
        default: ''
      },
      allUnits: {
        type: Array,
        default: () => { [] }
      }
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: false,
        listQuery: {
          pageNo: 1,
          pageSize: 9999,
          keyword: ''
        },
        unitIds: []
      }
    },
    watch: {
      userId() {
        console.log('ssss', this.userId)
        // this.getList()
      }
    },
    async created() {
      this.getList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        const { code, msg, data } = await getUnitList({ ...this.listQuery, userId: this.userId }).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败1', message: msg, type: 'error', duration: 2000 })
        }
        this.list = data.list || []
        this.total = data.total
        this.list.forEach(element => {
          this.unitIds.push(element.unitId)
        })
      },
      async testTwo() {
        const data = []
        this.unitIds.forEach(unitId => {
          data.push({ userId: this.userId, unitId: unitId, owner: true })
        })
        const response = await batchAddUser(data).catch(e => e)
        if (response.code !== 200) {
          return this.$notify({ title: '关联失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.$notify({
          title: '成功',
          message: '关联成功',
          type: 'success',
          duration: 2000
        })
        this.$emit('refresh-data')
      }
    }
  }

</script>
<style lang="postcss" scoped>
  .unit-container {
    padding: 30px;
  }
  .print_notice {
    text-align: center;
    font-size: 16px;
  }
  .print_notice_title {
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
  }
  .print_notice_title_en {
    font-size: 20px;
    font-weight: bold;
    line-height: 24px;
  }
  .print_notice_no {
    text-align: right;
    font-weight: bold;
    padding: 10px 0;
  }
  .print_notice_content_title {
    font-weight: 600;
  }
  .content_table {
    border: 1px solid #cdcdcd;
    margin-top: 15px;
    text-align: left;
    padding-top: 15px;
    position: relative;
  }
  .content_table_top {
    position: relative;
  }
  .content_table_info {
    padding: 15px;
  }
  .content_table_amount {
    padding: 5px 0;
    width: 150px;
    border-left: 1px solid #cdcdcd;
    border-top: 1px solid #cdcdcd;
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: center;
  }
  .content_table_item {
    position: relative;
    border-top: 1px solid #cdcdcd;
  }
  .content_table_item_amount {
    /* padding: 5px 15; */
    text-align: center;
    height: 100%;
    width: 150px;
    border-left: 1px solid #cdcdcd;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .content_table_item_num {
    float: left;
    padding: 15px;
    border-right: 1px solid #cdcdcd;
    line-height: 48px;
  }
  .content_table_item_info {
    padding: 15px;
  }
  .content_table_item_msg {
    position: relative;
    left: 15px;
    line-height: 24px;
  }
  .table_bottom {
    font-weight: bold;
  }
  .content_bottom_tip1 {
    text-align: center;
    padding: 30px 0;
    font-weight: 600;
  }
  .content_bottom_tip2 {
    text-align: center;
    padding: 10px;
    color: #ffffff;
    background: #000;
  }

</style>
