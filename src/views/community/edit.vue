<template>
  <div class="community-edit-view">
    <el-form ref="form" :model="communityInfo" label-width="150px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityNo')">
            <el-input v-model="communityInfo.communityNo" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityName')">
            <el-input v-model="communityInfo.communityName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddress')">
            <el-input v-model="communityInfo.communityAddress" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityManagementType')">
            <el-select v-model="communityInfo.communityManagementType" placeholder="请选择">
              <el-option :value="0" label="简单管理" />
              <el-option :value="1" label="综合管理" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFirstTips')">
            <el-input v-model="communityInfo.communityAddressDirectionFirstTips" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFirstValue')">
            <el-input v-model="communityInfo.communityAddressDirectionFirstValue" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="communityInfo.communityAddressDirectionFirstValue" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionSecondTips')">
            <el-input v-model="communityInfo.communityAddressDirectionSecondTips" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionSecondValue')">
            <el-input v-model="communityInfo.communityAddressDirectionSecondValue" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="communityInfo.communityAddressDirectionSecondValue" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionThirdTips')">
            <el-input v-model="communityInfo.communityAddressDirectionThirdTips" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionThirdValue')">
            <el-input v-model="communityInfo.communityAddressDirectionThirdValue" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="communityInfo.communityAddressDirectionThirdValue" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFourthTips')">
            <el-input v-model="communityInfo.communityAddressDirectionFourthTips" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFourthValue')">
            <el-input v-model="communityInfo.communityAddressDirectionFourthValue" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityArea')">
            <el-input v-model="communityInfo.communityArea" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityVerticalArea')">
            <el-input v-model="communityInfo.communityVerticalArea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityCoverArea')">
            <el-input v-model="communityInfo.communityCoverArea" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityNoCoverArea')">
            <el-input v-model="communityInfo.communityNoCoverArea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityShopsArea')">
            <el-input v-model="communityInfo.communityShopsArea" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityHouseArea')">
            <el-input v-model="communityInfo.communityHouseArea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityBuildingArea')">
            <el-input v-model="communityInfo.communityBuildingArea" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityCommonArea')">
            <el-input v-model="communityInfo.communityCommonArea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityContacts')">
            <el-input v-model="communityInfo.communityContacts" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityContactsPhone')">
            <el-input v-model="communityInfo.communityContactsPhone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGarageArea')">
            <el-input v-model="communityInfo.communityGarageArea" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGarageCount')">
            <el-input v-model="communityInfo.communityGarageCount" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGreenarea')">
            <el-input v-model="communityInfo.communityGreenarea" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRoadArea')">
            <el-input v-model="communityInfo.communityRoadArea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityLocY')">
            <el-input v-model="communityInfo.communityLocY" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityLocX')">
            <el-input v-model="communityInfo.communityLocX" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRoomCount')">
            <el-input v-model="communityInfo.communityRoomCount" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRemark')">
            <el-input v-model="communityInfo.communityRemark" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="$t('community.commonPdf')">
            <single-image :value.sync="communityInfo.commonPdf"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="text-align: center;padding-top: 30px;">
          <el-form-item>
            <el-button @click="$router.back()">取消</el-button>
            <el-button type="primary" @click="updateInfo">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import { queryCommunityDetail, updateCommunityDetail } from '@/api/community'
  import SingleImage from './singleImage'
  export default {
    name: 'EditCommunity',
    components: {
      SingleImage
    },
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
        this.communityInfo = { ...data, communityManagementType: data.communityManagementType - 0 }
      },
      async updateInfo() {
        const { code, msg } = await updateCommunityDetail(this.communityInfo).catch(e => e)
        if (code !== 200) {
          return this.$notify({ title: '修改失败', message: msg, type: 'error', duration: 2000 })
        }
        this.$notify({ title: '修改成功', message: '修改社区资料成功！', type: 'success', duration: 2000 })
        this.$router.push('/community/list')
      }
    }
  }

</script>
<style>
  .community-edit-view {
    padding: 30px;
  }

</style>
