<template>
  <div style="height: 100%;width: 100%;position: absolute;padding: 15px;">
    <el-tabs type="border-card" style="height: 100%;" @tab-click="tabClick">
      <el-tab-pane v-for="(item, index) in treeData" :key="index" :label="item.communityName">
        <el-tabs tab-position="left" style="height: 700px;overflow-y: auto;" @tab-click="buildTabClick">
          <el-card class="box-card" style="margin-bottom: 15px;">
            <el-row :gutter="20">
              <el-col :span="3">
                <div style="font-size: 20px;font-weight: 800;">
                  <div>社区信息</div>
                  <el-button type="text" size="mini" @click="$router.push('/community/edit/' + communityInfo.communityId)">{{ $t('table.edit') }}</el-button>
                  <el-button type="text" size="mini" @click="$router.push('/community/create')">{{ $t('table.add') }}</el-button>
                </div>
              </el-col>
              <el-col v-if="communityInfo" :span="21">
                <el-row :gutter="20" style="padding-bottom: 15px;">
                  <el-col :span="6">{{ $t('community.communityName') }}:{{ communityInfo.communityName || '--' }}</el-col>
                  <el-col :span="6">{{ $t('community.communityArea') }}:{{ communityInfo.communityArea || '--' }}</el-col>
                  <el-col :span="12">{{ $t('community.communityAddress') }}:{{ communityInfo.communityAddress || '--' }}</el-col>
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
                <el-col :span="3">
                  <div style="font-size: 20px;font-weight: 800;">
                    <div>建筑信息</div>
                    <el-button type="text" size="mini" @click="handleBuildUpdate()">{{ $t('table.edit') }}</el-button>
                    <el-button type="text" size="mini" @click="handleCreate()">{{ $t('table.add') }}</el-button>
                  </div>
                </el-col>
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
            <el-table :data="unitList" row-key="label" border fit highlight-current-row>
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
              <el-table-column :label="$t('table.actions')" align="center" min-width="160" class-name="small-padding fixed-width" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
                  <el-button type="text" size="mini" @click="bindUser(scope.row)">{{ $t('table.bindUser') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="queryUnitList" />
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加、编辑、详情 -->
    <el-dialog :visible.sync="dialogFormVisible" title="Edit" width="800px" top="15px">
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
        <el-form-item v-if="!!temp.managementType" :label="$t('unit.unitChildRelativeProportion')" prop="unitChildRelativeProportion">
          <el-input v-model="temp.unitChildRelativeProportion" />
        </el-form-item>
        <el-form-item :label="$t('unit.unitTitle')" prop="unitTitle">
          <el-input v-model="temp.unitTitle" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 绑定 -->
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
    <!-- 建筑添加、编辑、详情 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisibleBulid" width="70%" top="30px">
      <el-form ref="builddataForm" :rules="buildRules" :model="tempBuild" label-position="right" label-width="120px" style="margin:0 50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('building.buildingNo')" prop="buildingNo">
              <el-input v-model="tempBuild.buildingNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('building.buildingName')" prop="buildingName">
              <el-input v-model="tempBuild.buildingName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('building.buildingDirection')" prop="buildingDirection">
              <el-input v-model="tempBuild.buildingDirection" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('building.buildingStruct')" prop="buildingStruct">
              <el-input v-model="tempBuild.buildingStruct" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="$store.getters.isSuper" :label="$t('building.communityId')" prop="communityId">
              <el-input v-if="communityInfo" v-model="communityInfo.communityName" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('building.managementType')" prop="managementType">
              <el-select v-model="tempBuild.managementType" disabled placeholder="请绑定类型">
                <el-option v-for="(item, index) in typeList" :key="index" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('building.floorLowNum')" prop="floorLowNum">
              <el-input v-model="tempBuild.floorLowNum" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item :label="$t('building.fullAddress')" prop="fullAddress">
              <el-input v-model="tempBuild.fullAddress" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="!!tempBuild.managementType" :label="$t('building.buildingChildList')" prop="buildingChildList">
          <el-row>
            <el-col v-show="false" :span="1"><div>排序</div></el-col>
            <el-col :span="5"><div>名稱</div></el-col>
            <el-col :span="4"><div>數量</div></el-col>
            <el-col :span="5"><div>總面積</div></el-col>
            <el-col :span="5"><div>用途</div></el-col>
            <el-col :span="5"><div>千分比之相对价值</div></el-col>
          </el-row>
          <el-row v-for="(item, index) in tempBuild.buildingChildList" :key="index">
            <el-col v-show="false" :span="1"><el-input v-model="item.sort" placeholder="1" /></el-col>
            <el-col :span="5"><el-input v-model="item.name" placeholder="名稱"/></el-col>
            <el-col :span="4"><el-input v-model="item.amount" placeholder="數量"/></el-col>
            <el-col :span="5"><el-input v-model="item.area" placeholder="總面積"/></el-col>
            <el-col :span="5">
              <el-select v-model="item.purpose" placeholder="请选择用途">
                <el-option value="商業" label="商業" />
                <el-option value="輕型汽車/電單車" label="輕型汽車/電單車" />
                <el-option value="住宅" label="住宅" />
              </el-select>
            </el-col>
            <el-col :span="5"><el-input v-model="item.perthousand" placeholder="20"><el-button slot="append" icon="el-icon-minus" @click.native="cutChildList(index)"/></el-input></el-col>
          </el-row>
          <el-row style="text-align: center;"><span style="cursor: pointer;font-size: 30px;" @click="addChildList">+</span></el-row>
        </el-form-item>
        <!-- 层数内容 -->
        <el-form-item :label="$t('building.floorList')" prop="floorList">
          <el-row>
            <el-col v-show="false" :span="1"><div>排序</div></el-col>
            <el-col :span="4"><div>楼层名称</div></el-col>
            <el-col :span="4"><div>楼层平面图</div></el-col>
            <el-col :span="12"><div>楼层用途</div></el-col>
          </el-row>
          <el-row v-for="(item, index) in tempBuild.floorList" :key="index">
            <el-col v-show="false" :span="1"><el-input v-model="item.floorSort" placeholder="1" /></el-col>
            <el-col :span="4"><el-input v-model="item.floorName" placeholder="楼层名称"/></el-col>
            <el-col :span="4"><single-image :value.sync="item.floorIchnographyList" :type="7"/></el-col>
            <el-col :span="12"><el-input v-model="item.floorPurpose" placeholder="楼层用途"><el-button slot="append" icon="el-icon-minus" @click.native="cutLayersChildList(index)"/></el-input></el-col>
          </el-row>
          <el-row style="text-align: center;"><span style="cursor: pointer;font-size: 30px;" @click="addLayersChildList">+</span></el-row>
        </el-form-item>
        <!-- 综合类型才有 -->
        <el-form-item v-if="tempBuild.managementType" :label="$t('building.commonPdf')">
          <single-image :value.sync="tempBuild.commonPdf" :type="2"/>
        </el-form-item>
        <el-form-item :label="$t('building.rosterPdf')">
          <single-image :value.sync="tempBuild.rosterPdf" :type="3"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateBuildData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getCommunityTree,
    getBuildingList,
    getBuildingDetail,
    createBuilding,
    updateBuilding
  } from '@/api/building'
  import {
    getUnitList,
    updateUnit,
    batchAddUserUnitId,
    getUnitUserList
  } from '@/api/unit'
  import {
    getProprietorList
  } from '@/api/proprietor'
  import { queryCommunityDetail } from '@/api/community'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import SingleImage from './singleImage'
  // import { ElTree } from 'element-ui'

  export default {
    name: 'Community',
    components: {
      Pagination,
      SingleImage
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
      },
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
        communityIndex: 0,
        listQuery: {
          pageNo: 1,
          pageSize: 10
        },
        total: 0,
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
        dialogFormVisible: false,
        dialogFormVisibleBulid: false,
        tempBuild: {
          buildingDirection: '', // 建筑方向
          buildingId: '', // buildingId
          buildingName: '', // 建筑名字
          buildingNo: '', // 建筑编号
          buildingStruct: '', // 建筑结构
          communityId: '', // 社区ID
          floorLowNum: null, // 楼下几层
          floorUpNum: null, // 楼上几层
          fullAddress: '', // 建筑全址
          commonPdf: [],
          buildingChildList: [],
          floorList: [], // 层数内容
          rosterPdf: [],
          managementType: null
        },
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        buildRules: {
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
          floorLowNum: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ]
        },
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
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          unitChildRelativeProportion: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          unitTitle: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          unitCoveredArea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ]
        },
        dialogShow: false,
        userId: null,
        userIds: [],
        proprietorList: [],
        allProprietorList: [],
        typeList: [
          { label: '简单管理', value: 0 },
          { label: '综合管理', value: 1 }
        ]
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
    watch: {
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
      this.loadData()
    },
    methods: {
      async loadData() {
        await this.getList()
        this.queryBuildingList()
        this.queryAllProprietorList()
      },
      tabClick(e) {
        this.communityIndex = e.index
        this.getCommunityDetail(this.treeData[e.index].communityId)
        const buildingId = this.treeData[e.index].buildingWithUnits[0] ? this.treeData[e.index].buildingWithUnits[0].buildingId : ''
        this.querBuildingDetail(buildingId)
        this.buildingId = buildingId
        this.queryUnitList()
      },
      buildTabClick(e) {
        const buildingId = this.treeData[this.communityIndex].buildingWithUnits[e.index] ? this.treeData[this.communityIndex].buildingWithUnits[e.index].buildingId : ''
        this.querBuildingDetail(buildingId)
        this.buildingId = buildingId
        this.queryUnitList()
      },
      // 获取社区详情
      async getCommunityDetail(communityId) {
        const { code, msg, data } = await queryCommunityDetail({ communityId }).catch(e => e)
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.communityInfo = { ...data }
        this.tempBuild.managementType = this.communityInfo.communityManagementType
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
        this.buildingId = this.treeData[0].buildingWithUnits[0].buildingId
        this.queryUnitList()
        this.listLoading = false
      },
      async queryBuildingList() {
        const {
          code,
          msg,
          data
        } = await getBuildingList({
          pageNo: 1,
          pageSise: this.list.length,
          communityId: this.communityInfo && this.communityInfo.communityId
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
        this.listLoading = true
        const { code, msg, data } = await getUnitList({ ...this.listQuery, buildingId: this.buildingId }).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败1', message: msg, type: 'error', duration: 2000 })
        }
        this.unitList = data.list
        this.total = data.total
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
        const response = await updateUnit(this.temp).catch(e => e)
        this.listLoading = false
        if (response.code !== 200) {
          return this.$notify({ title: '修改失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.$notify({ title: '成功', message: '修改成功', type: 'success', duration: 2000 })
        this.dialogFormVisible = false
        this.dialogUpdateVisible = false
        this.queryUnitList()
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
        this.queryUnitList()
      },
      handleBindDelete(info) {
        this.proprietorList = this.proprietorList.filter(v => v.userId !== info.userId)
        this.userIds = this.userIds.filter(v => v !== info.userId)
      },
      ownerChange(info) {
        this.proprietorList = this.proprietorList.map(v => {
          return { ...v, owner: v.owner ? (info.userId === v.userId) : false }
        })
      },
      async queryAllProprietorList() {
        this.listLoading = true
        const { code, msg, data } = await getProprietorList({ pageNo: 1, pageSize: 99999 }).catch(e => e)
        this.listLoading = false
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.allProprietorList = [... data.list]
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisibleBulid = true
        this.$nextTick(() => {
          this.$refs['builddataForm'].clearValidate()
        })
      },
      resetTemp() {
        this.tempBuild = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: '',
          commonPdf: [],
          buildingChildList: [],
          floorList: [],
          rosterPdf: [],
          managementType: null,
          communityId: this.communityInfo && this.communityInfo.communityId
        }
        this.tempBuild.managementType = this.communityInfo.communityManagementType
      },
      // 层数内容
      addLayersChildList() {
        this.tempBuild.floorList.push({
          buildingId: this.buildingId,
          childId: '',
          floorIchnographyList: [],
          floorSort: this.tempBuild.floorList.length,
          floorPurpose: null,
          floorName: null
        })
      },
      cutChildList(index) {
        this.tempBuild.buildingChildList.splice(index, 1)
      },
      async handleBuildUpdate() {
        const tempBuild = { ...this.buildingDetail }
        this.tempBuild = Object.assign({}, tempBuild) // copy obj
        if (!this.tempBuild.commonPdf) {
          this.tempBuild.commonPdf = []
        }
        if (!this.tempBuild.buildingChildList) {
          this.tempBuild.buildingChildList = []
        }
        if (!this.tempBuild.floorList) {
          this.tempBuild.floorList = []
        }
        if (!this.tempBuild.rosterPdf) {
          this.tempBuild.rosterPdf = []
        }
        this.dialogStatus = 'update'
        this.dialogFormVisibleBulid = true
        this.$nextTick(() => {
          this.$refs['builddataForm'].clearValidate()
        })
      },
      async updateBuildData() {
        const isValidate = await new Promise(this.$refs.builddataForm.validate)
        if (!isValidate) {
          return this.$notify({ title: '提示', message: '请填写正确的信息！', type: 'info', duration: 2000 })
        }
        this.tempBuild.floorList = this.tempBuild.floorList.map(v => {
          return { ...v, floorIchnography: v.floorIchnographyList[0] }
        })
        this.listLoading = true
        const response = await updateBuilding(this.tempBuild).catch(e => e)
        this.listLoading = false
        if (response.code !== 200) {
          return this.$notify({ title: '修改失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.$notify({ title: '成功', message: '修改成功', type: 'success', duration: 2000 })
        this.dialogFormVisible = false
        this.dialogFormVisibleBulid = false
        // this.getList()
        this.querBuildingDetail(this.buildingId)
      },
      async createData() {
        const isValidate = await new Promise(this.$refs.builddataForm.validate)
        if (!isValidate) {
          return this.$notify({ title: '提示', message: '请填写正确的信息！', type: 'info', duration: 2000 })
        }
        this.tempBuild.floorList = this.tempBuild.floorList.map(v => {
          return { ...v, floorIchnography: v.floorIchnographyList[0] }
        })
        const response = await createBuilding(this.tempBuild).catch(e => e)
        if (response.code !== 200) {
          return this.$notify({ title: '创建失败', message: response.msg, type: 'error', duration: 2000 })
        }
        this.dialogFormVisibleBulid = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.loadData()
      },
      addChildList() {
        this.tempBuild.buildingChildList.push({
          buildingId: this.buildingId,
          childId: '',
          sort: this.tempBuild.buildingChildList.length,
          perthousand: null,
          name: '',
          amount: null,
          area: null,
          purpose: null
        })
      }
    }
  }

</script>
