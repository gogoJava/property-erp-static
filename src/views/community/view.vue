<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('community.communityNo')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
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
      <el-table-column :label="$t('community.communityNo')" prop="communityNo" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityNo }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityName')" prop="communityName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityAddress')" prop="communityAddress" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.communityAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityArea')" prop="communityArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityBuildingArea')" prop="communityBuildingArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityBuildingArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityCommonArea')" prop="communityCommonArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityCommonArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityContacts')" prop="communityContacts" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityContacts }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityContactsPhone')" prop="communityContactsPhone" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityContactsPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityGarageArea')" prop="communityGarageArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityGarageArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityGarageCount')" prop="communityGarageCount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityGarageCount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityGreenarea')" prop="communityGreenarea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityGreenarea }}</span>
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
      <el-table-column :label="$t('community.communityManagementType')" prop="communityManagementType" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityManagementType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityRemark')" prop="communityRemark" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityRemark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityRoadArea')" prop="communityRoadArea" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityRoadArea }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('community.communityRoomCount')" prop="communityRoomCount" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.communityRoomCount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleDetail()">{{ $t('table.detail') }}</el-button>
          <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { getCommunityList } from '@/api/community'
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
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
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
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getCommunityList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
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
      const { prop, order } = data
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
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleDetail() {
      this.$router.push('/community/detail/id')
    },
    handleUpdate(row) {
      this.$router.push('/community/edit/id')
    },
    handleDelete(row) {
      this.$confirm('确定删除社区【' + row.name + '】?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }).catch(() => {})
    }
  }
}
</script>
