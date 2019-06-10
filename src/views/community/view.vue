<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('community.communityName')" v-model="listQuery.keyword" style="width: 200px;" class="filter-item"/>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column :label="$t('community.communityNo')" prop="communityNo" align="center" min-width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.communityNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityName')" prop="communityName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityAddress')" prop="communityAddress" align="center" min-width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.communityAddress }}</span>
          <span>{{ scope.row.communityAddressDirectionFirstValue }}</span>
          <span>{{ scope.row.communityAddressDirectionSecondValue }}</span>
          <span>{{ scope.row.communityAddressDirectionThirdValue }}</span>
          <span>{{ scope.row.communityAddressDirectionFourthValue }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityArea')" prop="communityArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityArea')" prop="communityArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityCoverArea')" prop="communityCoverArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityCoverArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityNoCoverArea')" prop="communityNoCoverArea" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.communityNoCoverArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityVerticalArea')" prop="communityVerticalArea" align="center" min-width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.communityVerticalArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityCommonArea')" prop="communityCommonArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityCommonArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityGarageArea')" prop="communityGarageArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityGarageArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityShopsArea')" prop="communityShopsArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityShopsArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityHouseArea')" prop="communityHouseArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityHouseArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityGreenarea')" prop="communityGreenarea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityGreenarea }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('community.communityRoadArea')" prop="communityRoadArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityRoadArea }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('community.communityManagementType')" prop="communityManagementType" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityManagementType === 0 ? '简单管理' : '综合管理' }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('community.commonPdf')" prop="commonPdf" align="center">
        <template slot-scope="scope">
          <img v-for="(item, index) of scope.row.commonPdf" :key="index" :src="item" class="common-img">
        </template>
      </el-table-column> -->
      <!-- <el-table-column :label="$t('community.communityContacts')" prop="communityContacts" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityContacts }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityContactsPhone')" prop="communityContactsPhone" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityContactsPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityGarageCount')" prop="communityGarageCount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityGarageCount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityLocX')" prop="communityLocX" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityLocX }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityLocY')" prop="communityLocY" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityLocY }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityRemark')" prop="communityRemark" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityRemark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityRoomCount')" prop="communityRoomCount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityRoomCount }}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleDetail(scope.row)">{{ $t('table.detail') }}</el-button>
          <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { getCommunityList, delCommunity } from '@/api/community'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Community',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
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
        keyword: ''
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published',
        num: undefined,
        name: '',
        address: '',
        latitudeLongitude: ''
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
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  watch: {
    'listQuery.keyword'() {
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const response = await getCommunityList(this.listQuery).catch(e => e)
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
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
        type: ''
      }
    },
    handleDetail(row) {
      this.$router.push('/community/detail/' + row.communityId)
    },
    handleUpdate(row) {
      this.$router.push('/community/edit/' + row.communityId)
    },
    handleDelete(row) {
      this.$confirm('确定删除社区【' + row.communityName + '】?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { code, msg } = await delCommunity({ communityId: row.communityId }).catch(e => e)
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
  .common-img {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
</style>
