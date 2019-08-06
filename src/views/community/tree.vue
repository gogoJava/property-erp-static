<template>
  <div style="height: 100%;width: 100%;position: absolute;padding: 15px;">
    <el-container style="height: 100%; border-right: 1px solid #eee">
      <el-aside width="200px" style="border-right: 1px solid #eee">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
      </el-aside>
      <el-container style="padding: 0 15px;">
        <!-- 建筑 -->
        <div style="width: 100%;overflow-y: auto;">
          <el-table v-if="showType === 1" :data="buildingList" row-key="label" border fit highlight-current-row>
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
            <!-- <el-table-column :label="$t('table.actions')" align="center" width="130" class-name="small-padding fixed-width" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
                <el-button size="text" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
                </el-button>
              </template>
            </el-table-column> -->
          </el-table>
          <el-table v-if="showType === 2" :data="unitList" row-key="label" border fit highlight-current-row>
            <!-- 单位 -->
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
            <!-- <el-table-column :label="$t('table.actions')" align="center" width="200" class-name="small-padding fixed-width" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
                <el-button size="text" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
                </el-button>
                <el-button type="text" size="mini" @click="bindUser(scope.row)">{{ $t('table.bindUser') }}</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    getCommunityTree,
    getBuildingList
  } from '@/api/building'
  import {
    getUnitList
  } from '@/api/unit'
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
        }
      }
    },
    computed: {
      treeData() {
        // console.log('resData', this.resData)
        return this.resData.map(item => {
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
      }
    },
    watch: {},
    async created() {
      await this.getList()
      this.queryBuildingList()
    },
    methods: {
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
