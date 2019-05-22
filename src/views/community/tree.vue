<template>
  <div style="height: 100%;width: 100%;position: absolute;padding: 15px;">
    <el-container style="height: 100%; border-right: 1px solid #eee">
      <el-aside width="200px" style="border-right: 1px solid #eee">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
      </el-aside>
      <el-container style="padding: 0 15px;">
        <!-- 建筑 -->
        <div style="width: 100%;">
          <el-table :data="list" row-key="label" border fit highlight-current-row>
            <el-table-column v-if="showType === 1" :label="$t('building.buildingNo')" prop="id" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.buildingNo }}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="showType === 1" :label="$t('building.buildingName')" min-width="180px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.buildingName }}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="showType === 1" :label="$t('building.fullAddress')" min-width="180px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.communityAddress }}</span>
                <span>{{ scope.row.communityAddressDirectionFirstValue }}</span>
                <span>{{ scope.row.communityAddressDirectionSecondValue }}</span>
                <span>{{ scope.row.communityAddressDirectionThirdValue }}</span>
                <span>{{ scope.row.communityAddressDirectionFourthValue }}</span>
              </template>
            </el-table-column>
            <!-- 单位 -->
            <el-table-column v-if="showType === 2" :label="$t('unit.unitNo')" prop="id" align="center" min-width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.unitNo }}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="showType === 2" :label="$t('unit.unitName')" min-width="180px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.unitName }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    getCommunityTree
  } from '@/api/building'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  // import { ElTree } from 'element-ui'

  export default {
    name: 'Community',
    components: {
      Pagination
    },
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
        list: [],
        buildingList: [],
        unitList: [],
        listLoading: true,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        resData: [],
        showType: 1,
        key: 'key'
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
            label: item.communityName,
            children
          }
        })
      }
    },
    watch: {},
    created() {
      this.getList()
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
        // this.buildingList = this.resData[0].buildingWithUnits || []
        // this.unitList = this.resData[0].unitList || []
        this.key = this.resData[0].communityId || this.resData[0].buildingId
        this.listLoading = false
      },
      handleNodeClick(data) {
        console.log('handleNodeClick', data)
        if (data.type === 3) return
        this.key = data.communityId || data.buildingId
        this.showType = data.type || 1
        // if (this.showType === 1) {
        //   this.buildingList = data.children
        // } else {
        //   this.unitList = data.children
        // }
        this.list = data.children
      }
    }
  }

</script>
