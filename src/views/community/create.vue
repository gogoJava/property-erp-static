<template>
  <div class="community-create-view">
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
        <el-col style="text-align: center;padding-top: 30px;">
          <el-form-item>
            <el-button @click="$router.back()">取消</el-button>
            <el-button type="primary" @click="createClick">立即创建</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  // import {
  //   ElInput,
  //   ElSelect,
  //   ElOption
  // } from 'element-ui'
  import { createCommunity } from '@/api/community'
  export default {

    name: 'CreateForm',
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
    methods: {
      // 创建
      async createClick() {
        const response = await createCommunity(this.communityInfo).catch(e => e)
        if (response.data.code !== 200) {
          return this.$notify({
          title: '创建失败',
          message: response.data.msg,
          type: 'error',
          duration: 2000
        })
        }
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push('/community/list')
      }
    }
  }

</script>
<style>
  .community-create-view {
    padding: 30px;
  }

</style>
