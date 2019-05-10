<template>
  <div class="community-detail-view">
    <el-form ref="form" :model="communityInfo" label-width="150px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityNo')">
            <div>：{{ communityInfo.communityNo || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityName')">
            <div>：{{ communityInfo.communityName || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddress')">
            <div>：{{ communityInfo.communityAddress || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityManagementType')">
            <el-select v-model="communityInfo.communityManagementType" placeholder="请选择" disabled>
              <el-option :value="0" label="简单管理" />
              <el-option :value="1" label="综合管理" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFirstValue')">
            <div>：{{ communityInfo.communityAddressDirectionFirstValue || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFirstTips')">
            <div>：{{ communityInfo.communityAddressDirectionFirstTips || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionSecondValue')">
            <div>：{{ communityInfo.communityAddressDirectionSecondValue || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionSecondTips')">
            <div>：{{ communityInfo.communityAddressDirectionSecondTips || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionThirdValue')">
            <div>：{{ communityInfo.communityAddressDirectionThirdValue || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionThirdTips')">
            <div>：{{ communityInfo.communityAddressDirectionThirdTips || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFourthValue')">
            <div>：{{ communityInfo.communityAddressDirectionFourthValue || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFourthTips')">
            <div>：{{ communityInfo.communityAddressDirectionFourthTips || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityArea')">
            <div>：{{ communityInfo.communityArea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityVerticalArea')">
            <div>：{{ communityInfo.communityVerticalArea || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityCoverArea')">
            <div>：{{ communityInfo.communityCoverArea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityNoCoverArea')">
            <div>：{{ communityInfo.communityNoCoverArea || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityShopsArea')">
            <div>：{{ communityInfo.communityShopsArea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityShopsCount')">
            <div>：{{ communityInfo.communityShopsCount || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityHouseArea')">
            <div>：{{ communityInfo.communityHouseArea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRoomCount')">
            <div>：{{ communityInfo.communityRoomCount || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!-- <el-col :span="12">
          <el-form-item :label="$t('community.communityBuildingArea')">
            <div>：{{ communityInfo.communityBuildingArea || '--' }}</div>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item :label="$t('community.communityCommonArea')">
            <div>：{{ communityInfo.communityCommonArea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGreenarea')">
            <div>：{{ communityInfo.communityGreenarea || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGarageArea')">
            <div>：{{ communityInfo.communityGarageArea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGarageCount')">
            <div>：{{ communityInfo.communityGarageCount || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGreenarea')">
            <div>：{{ communityInfo.communityGreenarea || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRoadArea')">
            <div>：{{ communityInfo.communityRoadArea || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityLocY')">
            <div>：{{ communityInfo.communityLocY || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityLocX')">
            <div>：{{ communityInfo.communityLocX || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="20">
        <!-- <el-col :span="12">
          <el-form-item :label="$t('community.communityRoomCount')">
            <div>：{{ communityInfo.communityRoomCount || '--' }}</div>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRemark')">
            <div>：{{ communityInfo.communityRemark || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityContacts')">
            <div>：{{ communityInfo.communityContacts || '--' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityContactsPhone')">
            <div>：{{ communityInfo.communityContactsPhone || '--' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 综合管理才有 -->
      <el-row v-if="communityInfo.communityManagementType" :gutter="20">
        <el-col :span="24">
          <el-form-item :label="$t('community.commonPdf')">
            <img v-for="(item, index) of communityInfo.commonPdf" :key="index" :src="item" class="common-img">
          </el-form-item>
        </el-col>
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
          communityAddressDirectionFirstTips: null, // 社区全址
          communityAddressDirectionFirstValue: null, // 社区全址
          communityAddressDirectionSecondTips: null, // 社区全址
          communityAddressDirectionSecondValue: null, // 社区全址
          communityAddressDirectionThirdTips: null, // 社区全址
          communityAddressDirectionThirdValue: null, // 社区全址
          communityAddressDirectionFourthTips: null, // 社区全址
          communityAddressDirectionFourthValue: null, // 社区全址
          communityArea: null, // 总面积(平方米)
          communityCoverArea: null, // 覆盖面积(平方米)
          communityNoCoverArea: null, // 无覆盖面积(平方米)
          communityVerticalArea: null, // 垂直占用空间面积(平方米)
          communityShopsArea: null, // 商铺面积(平方米)
          communityHouseArea: null, // 住宅面积(平方米)
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
          communityRoomCount: null, // 房间总数
          commonPdf: []
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
  .common-img {
    width: 48px;
    height: 48px;
    cursor: pointer;
  }
</style>
