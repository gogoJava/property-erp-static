<template>
  <div class="visitor-container">
    <div class="filter-container">
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('notice.community') }}:</span>
      <el-select v-model="listQuery.communityId" placeholder="请选择" filterable style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in communityList"
          :key="item.communityId"
          :label="item.communityName"
          :value="item.communityId" />
      </el-select>
      <span style="position: relative;top: -4px;padding-left: 15px;">{{ $t('unit.buildingId') }}:</span>
      <el-select v-model="buildingId" placeholder="请选择" filterable style="position: relative;top: -4px;padding-left: 15px;">
        <el-option
          v-for="item in buildingList"
          :key="item.buildingId"
          :label="item.buildingName"
          :value="item.buildingId" />
      </el-select>
      <el-input :placeholder="$t('visitor.visitorName')" v-model="listQuery.keyword" style="width: 200px;margin-left: 15px;" class="filter-item" />
    </div>
    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;">
      <el-table-column :label="$t('visitor.visitorName')" prop="id" align="center" min-width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.visitorName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('visitor.visitorCause')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.visitorCause }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('visitor.visitorSex')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.visitorSex | sexFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('visitor.visitorPhone')" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.visitorPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('visitor.createTime')" min-width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? $moment(scope.row.createTime).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('visitor.updateTime')" min-width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime ? $moment(scope.row.updateTime).format('YYYY-MM-DD') : '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('visitor.community')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.community.communityName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('visitor.building')" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.buildingName || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('visitor.visitorImage')" min-width="180px" align="center">
        <template slot-scope="scope">
          <img v-for="(item, index) of scope.row.visitorImage" :key="index" :src="(imgPrefix + item.imageUrl)" class="clubhouse-img">
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- 添加、编辑、详情 -->
    <el-dialog v-loading="listLoading" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="70%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="130px" style="margin:0 50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('visitor.visitorName')" prop="username">
              <el-input v-model="temp.visitorName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('visitor.visitorCause')" prop="name">
              <el-input v-model="temp.visitorCause" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('visitor.visitorSex')" prop="idCard">
              <el-select v-model="temp.visitorSex" placeholder="请选择">
                <el-option :key="0" :value="0" label="女" />
                <el-option :key="1" :value="1" label="男" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('visitor.visitorType')" prop="englishName">
              <el-input v-model="temp.visitorType" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('visitor.buildingId')" prop="sex">
              <el-select v-model="temp.buildingId" placeholder="请选择">
                <el-option v-for="(item, index) in buildingList" :key="index" :value="item.buildingId" :label="item.buildingName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('visitor.communityId')" prop="communityId">
              <el-select v-model="temp.communityId" placeholder="请绑定社区">
                <el-option v-for="(item, index) in communityList" :key="index" :value="item.communityId" :label="item.communityName" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('visitor.visitorPhone')" prop="visitorPhone">
              <el-input v-model="temp.visitorPhone" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('visitor.updateTime')" prop="updateTime">
              <el-input v-model="temp.updateTime" type="text" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('visitor.createTime')" prop="createTime">
              <el-input v-model="temp.createTime" type="text" />
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
    getVisitorList
  } from '@/api/visitor'
  import {
    getBuildingList
  } from '@/api/building'
  import { getCommunityList } from '@/api/community'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

  export default {
    name: 'Visitor',
    components: {
      Pagination
    },
    filters: {
      sexFilter(value) {
        const sexMap = {
          0: '女',
          1: '男'
        }
        return sexMap[value]
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
          communityId: ''
        },
        buildingId: '',
        communityList: [{ communityId: '', communityName: '全部' }],
        buildingList: [{ buildingId: '', buildingName: '全部' }],
        temp: {
          buildingId: '', // 建筑id
          communityId: '', // communityId
          createTime: null, // createTime
          updateTime: null, // updateTime
          visitorCause: '', // visitorCause
          visitorId: '', // visitorId
          visitorName: '', // visitorName
          visitorSex: null, // 性别0女1男
          visitorPhone: null // visitorPhone
        },
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogStatus: '',
        dialogFormVisible: false,
        rules: {},
        imgPrefix: 'http://songsong.fun/file' // 图片前缀
      }
    },
    watch: {
      'listQuery.keyword'() {
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
      this.queryCommunityList()
      this.queryBuildingList()
      this.getList()
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
        const { code, msg, data } = await getVisitorList(param).catch(e => e)
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
        this.communityList = [...this.communityList, ...response.data.list]
        // 经理身份
        if (this.$store.getters.manager) {
          this.communityList = this.communityList.filter(v => this.$store.getters.communityId.split(',').some((item) => item === v.communityId))
        }
      },
      // 获取建筑列表
      async queryBuildingList() {
        const response = await getBuildingList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.buildingList = [...this.buildingList, ...response.data.list]
      }
    }
  }

</script>
<style lang="postcss" scoped>
 .visitor-container {
    padding: 30px;
  }
  .clubhouse-img {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
</style>
