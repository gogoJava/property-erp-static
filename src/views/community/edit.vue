<template>
  <div class="community-edit-view">
    <el-form ref="form" :model="communityInfo" label-width="100px">
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
            <!-- <el-select v-model="communityInfo.communityAddress" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select> -->
            <el-input v-model="communityInfo.communityAddress" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityArea')">
            <el-input v-model="communityInfo.communityArea" />
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
          <el-form-item :label="$t('community.communityLocX')">
            <el-input v-model="communityInfo.communityLocX" />
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
          <el-form-item :label="$t('community.communityManagementType')">
            <!-- <el-input v-model="communityInfo.communityManagementType" /> -->
            <el-select v-model="communityInfo.communityManagementType" placeholder="请选择">
              <el-option :value="0" label="普通管理" />
              <el-option :value="1" label="综合管理" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRemark')">
            <el-input v-model="communityInfo.communityRemark" />
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
          <el-form-item :label="$t('community.communityRoomCount')">
            <el-input v-model="communityInfo.communityRoomCount" />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12"></el-col> -->
      </el-row>
      <el-row>
        <el-col style="text-align: center;">
          <el-form-item>
            <el-button @click="$router.back()">取消</el-button>
            <el-button type="primary" @click="updateInfo">编辑</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import { queryCommunityDetail, updateCommunityDetail } from '@/api/community'
  export default {
    name: 'EditCommunity',
    components: {
      // ElInput,
      // ElSelect,
      // ElOption
    },
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
        const { data: { code, msg, data }} = await queryCommunityDetail({ communityId: this.communityId }).catch(e => e)
        if (code !== 200) {
          return this.$notify({ title: '失败', message: msg, type: 'error', duration: 2000 })
        }
        this.communityInfo = { ...data, communityManagementType: data.communityManagementType - 0 }
      },
      async updateInfo() {
        const { data: { code, msg }} = await updateCommunityDetail(this.communityInfo).catch(e => e)
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
