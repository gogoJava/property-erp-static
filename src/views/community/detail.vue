<template>
  <div class="community-detail-view">
    <el-form ref="form" :model="communityInfo" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityNo')">
            <!-- <el-input v-model="communityInfo.communityNo" /> -->
            <div>：{{ communityInfo.communityNo || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityName')">
            <!-- <el-input v-model="communityInfo.communityName" /> -->
            <div>：{{ communityInfo.communityName || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddress')">
            <!-- <el-select v-model="communityInfo.communityAddress" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select> -->
            <div>：{{ communityInfo.communityAddress || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityArea')">
            <!-- <el-input v-model="communityInfo.communityArea" /> -->
            <div>：{{ communityInfo.communityArea || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityBuildingArea')">
            <!-- <el-input v-model="communityInfo.communityBuildingArea" /> -->
            <div>：{{ communityInfo.communityBuildingArea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityCommonArea')">
            <!-- <el-input v-model="communityInfo.communityCommonArea" /> -->
            <div>：{{ communityInfo.communityCommonArea || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityContacts')">
            <!-- <el-input v-model="communityInfo.communityContacts" /> -->
            <div>：{{ communityInfo.communityContacts || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityContactsPhone')">
            <!-- <el-input v-model="communityInfo.communityContactsPhone" /> -->
            <div>：{{ communityInfo.communityContactsPhone || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGarageArea')">
            <!-- <el-input v-model="communityInfo.communityGarageArea" /> -->
            <div>：{{ communityInfo.communityGarageArea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGarageCount')">
            <!-- <el-input v-model="communityInfo.communityGarageCount" /> -->
            <div>：{{ communityInfo.communityGarageCount || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGreenarea')">
            <!-- <el-input v-model="communityInfo.communityGreenarea" /> -->
            <div>：{{ communityInfo.communityGreenarea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityLocX')">
            <!-- <el-input v-model="communityInfo.communityLocX" /> -->
            <div>：{{ communityInfo.communityLocX || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityLocY')">
            <!-- <el-input v-model="communityInfo.communityLocY" /> -->
            <div>：{{ communityInfo.communityLocY || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityManagementType')">
            <!-- <el-input v-model="communityInfo.communityManagementType" /> -->
            <!-- <div>{{ communityInfo.communityManagementType || '--' }}</div> -->
            <el-select v-model="communityInfo.communityManagementType" placeholder="请选择" disabled>
              <el-option value="0" label="普通管理" />
              <el-option value="1" label="综合管理" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRemark')">
            <!-- <el-input v-model="communityInfo.communityRemark" /> -->
            <div>：{{ communityInfo.communityRemark || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRoadArea')">
            <!-- <el-input v-model="communityInfo.communityRoadArea" /> -->
            <div>：{{ communityInfo.communityRoadArea || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRoomCount')">
            <!-- <el-input v-model="communityInfo.communityRoomCount" /> -->
            <div>：{{ communityInfo.communityRoomCount || '--' }}</div>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12"></el-col> -->
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import { queryCommunityDetail } from '@/api/community'
  export default {
    name: 'DetailCommunity',
    components: {},
    data() {
      return {
        communityInfo: {
          communityId: null,
          communityNo: null,
          communityName: null,
          communityAddress: null, // 社区全址
          communityArea: null, // 总面积(平方米)
          communityBuildingArea: null, // 建筑面积
          communityCommonArea: null, // 公用面积
          communityContacts: null, // 联系人
          communityContactsPhone: null, // 联系人号码
          communityGarageArea: null, // 车库面积
          communityGarageCount: null, // 车位数量
          communityGreenarea: null, // 绿化面积
          communityLocX: null, // 社区纬度
          communityLocY: null, // 社区经度
          communityManagementType: 0, // 管理类型(0普通管理1综合管理)
          communityRemark: null, // 备注
          communityRoadArea: null, // 道路面积
          communityRoomCount: null // 房间总数
        }
      }
    },
    computed: {
      communityId() {
        return this.$route.params.id
      }
    },
    mounted() {
      this.getCommunityDetail()
    },
    methods: {
      // 获取社区详情
      async getCommunityDetail() {
        const { code, msg, data } = await queryCommunityDetail({ communityId: this.communityId }).catch(e => e)
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.communityInfo = { ...data }
      }
    }
  }

</script>
<style>
  .community-detail-view {
    padding: 30px;
  }

</style>
