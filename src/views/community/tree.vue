<template>
  <div style="height: 100%;width: 100%;position: absolute;padding: 15px;">
    <el-container style="height: 100%; border-right: 1px solid #eee">
      <el-aside width="200px" style="border-right: 1px solid #eee">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
      </el-aside>
      <el-container style="padding: 0 15px;">
        <!-- 建筑 -->
        <div v-if="showType === 1" style="width: 100%;">
          <el-table :key="1" :data="list" border fit highlight-current-row>
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
            <el-table-column :label="$t('building.fullAddress')" min-width="180px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.fullAddress }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('table.actions')" align="center" width="130" class-name="small-padding fixed-width" fixed="right">
              <!-- <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
                <el-button size="text" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
                </el-button>
              </template> -->
            </el-table-column>
          </el-table>
        </div>
        <!-- 单位 -->
        <div v-if="showType === 2" style="width: 100%;">
          <el-table :key="2" :data="list" border fit highlight-current-row>
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
            <el-table-column :label="$t('table.actions')" align="center" width="130" class-name="small-padding fixed-width" fixed="right">
              <!-- <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
                <el-button size="text" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}
                </el-button>
                <el-button type="text" size="mini" @click="bindUser(scope.row)">绑定用户</el-button>
              </template> -->
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
        listLoading: true,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        resData: [],
        showType: 1
      }
    },
    computed: {
      treeData() {
        console.log('resData', this.resData)
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
        this.listLoading = false
      },
      handleNodeClick(data) {
        console.log('handleNodeClick', data)
        if (data.type === 3) return
        this.showType = data.type || 1
        this.list = data.children
      }
    }
  }

</script>
