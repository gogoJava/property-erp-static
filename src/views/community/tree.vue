<template>
  <div style="height: 100%;width: 100%;position: absolute;padding: 15px;">
    <el-tabs type="border-card" style="height: 100%;" @tab-click="tabClick">
      <el-tab-pane v-for="(item, index) in treeData" :key="index" :label="item.communityName">
        <el-tabs tab-position="left" style="height: 700px;" @tab-click="buildTabClick">
          <el-card class="box-card" style="margin-bottom: 15px;">
            <el-row :gutter="20">
              <el-col :span="3"><div style="font-size: 20px;font-weight: 800;">社区信息</div></el-col>
              <el-col v-if="communityInfo" :span="21">
                <el-row :gutter="20" style="padding-bottom: 15px;">
                  <el-col :span="6">{{ $t('community.communityName') }}:{{ communityInfo.communityName || '--' }}</el-col>
                  <el-col :span="6">{{ $t('community.communityArea') }}:{{ communityInfo.communityArea || '--' }}</el-col>
                  <el-col :span="12">{{ $t('community.communityAddress') }}:{{ communityInfo.communityAddress || '--' }}</el-col>
                  <!-- <el-col :span="6">{{ $t('community.communityName') }}:{{ communityInfo.communityName || '--' }}</el-col> -->
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">{{ $t('community.communityManagementType') }}:{{ communityInfo.communityManagementType === 0 ? '简单管理' : '综合管理' || '--' }}</el-col>
                  <el-col :span="6">{{ $t('community.communityRoomCount') }}:{{ communityInfo.communityRoomCount || '--' }}</el-col>
                  <el-col :span="6">{{ $t('community.communityGarageCount') }}:{{ communityInfo.communityGarageCount || '--' }}</el-col>
                  <el-col :span="6">{{ $t('community.communityShopsCount') }}:{{ communityInfo.communityShopsCount || '--' }}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
          <el-tab-pane v-for="(buildingInfo, k) in item.buildingWithUnits" :key="k" :label="(buildingInfo.buildingName) + '（建筑）'">
            <el-card class="box-card" style="margin-bottom: 15px;">
              <el-row :gutter="20">
                <el-col :span="3"><div style="font-size: 20px;font-weight: 800;">建筑信息</div></el-col>
                <el-col v-if="buildingDetail" :span="20">
                  <el-row :gutter="21">
                    <el-col :span="6">{{ $t('building.buildingNo') }}:{{ buildingDetail.buildingNo || '--' }}</el-col>
                    <el-col :span="6">{{ $t('building.buildingName') }}:{{ buildingDetail.buildingName || '--' }}</el-col>
                    <el-col :span="6">{{ $t('building.communityId') }}:{{ buildingDetail.community.communityName || '--' }}</el-col>
                    <el-col :span="6">{{ $t('building.floorLowNum') }}:{{ buildingDetail.floorLowNum || '--' }}</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
            <div style="font-size: 20px;font-weight: 800;margin-bottom: 15px;">单元信息</div>
            <el-table :data="buildingInfo.unitList" row-key="label" border fit highlight-current-row style="height: 460px;overflow-y: auto;">
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
                  <span>{{ scope.row.building ? scope.row.building.buildingName : '--' }}</span>
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
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    getCommunityTree,
    getBuildingList,
    getBuildingDetail
  } from '@/api/building'
  import {
    getUnitList
  } from '@/api/unit'
  import { queryCommunityDetail } from '@/api/community'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  // import { ElTree } from 'element-ui'

  export default {
    name: 'Community',
    components: {
      Pagination
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
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
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
        list: [],
        buildingList: [],
        unitList: [],
        communityId: '',
        buildingId: '',
        listLoading: true,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        resData: [],
        showType: 1,
        key: 'key',
        treeProps: {
          children: 'children',
          hasChildren: 'hasChildren'
        },
        communityInfo: null,
        buildingDetail: null,
        communityIndex: 0
      }
    },
    computed: {
      treeData() {
        const data = this.resData.map(item => {
          let children = []
          if (item.buildingWithUnits) {
            children = item.buildingWithUnits.map(value => {
              let unitList = []
              if (value.unitList) {
                unitList = value.unitList.map(el => {
                  return {
                    ...el,
                    label: el.unitName + '(单位)',
                    type: 3,
                    children: []
                  }
                })
              }
              return {
                ...value,
                label: value.buildingName + '(建筑)',
                type: 2,
                children: unitList
              }
            })
          } else if (item.unitList) {
            children = item.unitList.map(value => {
              return {
                ...value,
                label: value.unitName + '(单位)',
                type: 3,
                children: []
              }
            })
          }
          return {
            ...item,
            label: item.communityName + '(社区)',
            children
          }
        })
        // console.log('data', data)
        return data
      }
    },
    watch: {},
    async created() {
      await this.getList()
      this.queryBuildingList()
    },
    methods: {
      tabClick(e) {
        this.communityIndex = e.index
        this.getCommunityDetail(this.treeData[e.index].communityId)
        const buildingId = this.treeData[e.index].buildingWithUnits[0] ? this.treeData[e.index].buildingWithUnits[0].buildingId : ''
        this.querBuildingDetail(buildingId)
      },
      buildTabClick(e) {
        const buildingId = this.treeData[this.communityIndex].buildingWithUnits[e.index] ? this.treeData[this.communityIndex].buildingWithUnits[e.index].buildingId : ''
        this.querBuildingDetail(buildingId)
      },
      // 获取社区详情
      async getCommunityDetail(communityId) {
        const { code, msg, data } = await queryCommunityDetail({ communityId }).catch(e => e)
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.communityInfo = { ...data }
      },
      // 获取建筑详情
      async querBuildingDetail(buildingId) {
        this.buildingDetail = null
        if (!buildingId) return
        const { code, msg, data } = await getBuildingDetail({ buildingId }).catch(e => e)
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        // console.log('res.data', data)
        this.buildingDetail = { ...data }
      },
      async getList() {
        this.listLoading = true
        const response = await getCommunityTree().catch(e => e)
        if (response.code !== 200) {
          return this.$notify({
            title: '查询失败',
            message: response.msg,
            type: 'error',
            duration: 2000
          })
        }
        this.resData = response.data
        this.list = this.resData[0].buildingWithUnits || this.resData[0].unitList || []
        this.key = this.resData[0].communityId || this.resData[0].buildingId
        this.communityId = this.resData[0].communityId
        // 第一次加载的是第一个社区信息
        this.getCommunityDetail(this.treeData[0].communityId)
        this.querBuildingDetail(this.treeData[0].buildingWithUnits[0].buildingId)
        this.listLoading = false
      },
      handleNodeClick(data) {
        // console.log('handleNodeClick', data)
        if (data.type === 3) return
        this.key = data.communityId || data.buildingId
        this.showType = data.type || 1
        this.list = data.children
        if (this.showType === 1) {
          this.communityId = data.communityId
          this.queryBuildingList()
        } else if (this.showType === 2) {
          this.buildingId = data.buildingId
          this.queryUnitList()
        }
      },
      async queryBuildingList() {
        const {
          code,
          msg,
          data
        } = await getBuildingList({
          pageNo: 1,
          pageSise: this.list.length,
          communityId: this.communityId
        }).catch(e => e)
        if (code !== 200) {
          return this.$notify({
            title: '失败',
            message: msg,
            type: 'error',
            duration: 2000
          })
        }
        this.buildingList = [...data.list]
      },
      async queryUnitList() {
        const {
          code,
          msg,
          data
        } = await getUnitList({
          pageNo: 1,
          pageSize: this.list.length,
          buildingId: this.buildingId
        }).catch(e => e)
        if (code !== 200) {
          return this.$notify({
            title: '失败',
            message: msg,
            type: 'error',
            duration: 2000
          })
        }
        this.unitList = [...data.list]
      }
    }
  }

</script>
