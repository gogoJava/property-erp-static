<template>
  <div class="community-edit-view">
    <el-form ref="dataForm" :model="communityInfo" :rules="rules" label-width="150px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityNo')">
            <el-input v-model="communityInfo.communityNo" :placeholder="$t('community.communityNo')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityName')">
            <el-input v-model="communityInfo.communityName" :placeholder="$t('community.communityName')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddress')">
            <el-input v-model="communityInfo.communityAddress" :placeholder="$t('community.communityAddress')" />
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
          <el-form-item :label="$t('community.communityAddressDirectionFirstValue')">
            <el-input v-model="communityInfo.communityAddressDirectionFirstValue" :placeholder="'东北'"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFirstTips')">
            <el-input v-model="communityInfo.communityAddressDirectionFirstTips" :placeholder="'新葡京娱乐场'"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="communityInfo.communityAddressDirectionFirstValue" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionSecondValue')">
            <el-input v-model="communityInfo.communityAddressDirectionSecondValue" :placeholder="'西北'"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionSecondTips')">
            <el-input v-model="communityInfo.communityAddressDirectionSecondTips" :placeholder="'大三巴牌坊'"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="communityInfo.communityAddressDirectionSecondValue" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionThirdValue')">
            <el-input v-model="communityInfo.communityAddressDirectionThirdValue" :placeholder="'西南'"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionThirdTips')">
            <el-input v-model="communityInfo.communityAddressDirectionThirdTips" :placeholder="'金莲花广场'"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="communityInfo.communityAddressDirectionThirdValue" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFourthValue')">
            <el-input v-model="communityInfo.communityAddressDirectionFourthValue" :placeholder="'南边'"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityAddressDirectionFourthTips')">
            <el-input v-model="communityInfo.communityAddressDirectionFourthTips" :placeholder="'银河广场'"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityArea')" prop="communityArea">
            <el-input v-model="communityInfo.communityArea" :placeholder="$t('community.communityArea')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityVerticalArea')" prop="communityVerticalArea">
            <el-input v-model="communityInfo.communityVerticalArea" :placeholder="$t('community.communityVerticalArea')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityCoverArea')" prop="communityCoverArea">
            <el-input v-model="communityInfo.communityCoverArea" :placeholder="$t('community.communityCoverArea')"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityNoCoverArea')" prop="communityNoCoverArea">
            <el-input v-model="communityInfo.communityNoCoverArea" :placeholder="$t('community.communityNoCoverArea')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityShopsArea')" prop="communityShopsArea">
            <el-input v-model="communityInfo.communityShopsArea" :placeholder="$t('community.communityShopsArea')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityShopsCount')" prop="communityShopsCount">
            <el-input v-model="communityInfo.communityShopsCount" :placeholder="$t('community.communityShopsCount')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityHouseArea')" prop="communityHouseArea">
            <el-input v-model="communityInfo.communityHouseArea" :placeholder="$t('community.communityHouseArea')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRoomCount')" prop="communityRoomCount">
            <el-input v-model="communityInfo.communityRoomCount" :placeholder="$t('community.communityRoomCount')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityCommonArea')" prop="communityCommonArea">
            <el-input v-model="communityInfo.communityCommonArea" :placeholder="$t('community.communityCommonArea')" />
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="$t('community.communityGreenarea')" prop="communityGreenarea">
            <el-input v-model="communityInfo.communityGreenarea" :placeholder="$t('community.communityGreenarea')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGarageArea')" prop="communityGarageArea">
            <el-input v-model="communityInfo.communityGarageArea" :placeholder="$t('community.communityGarageArea')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityGarageCount')" prop="communityGarageCount">
            <el-input v-model="communityInfo.communityGarageCount" :placeholder="$t('community.communityGarageCount')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityRemark')">
            <el-input v-model="communityInfo.communityRemark" :placeholder="$t('community.communityRemark')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.communityContacts')">
            <el-input v-model="communityInfo.communityContacts" :placeholder="$t('community.communityContacts')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('community.communityContactsPhone')">
            <el-input v-model="communityInfo.communityContactsPhone" :placeholder="$t('community.communityContactsPhone')" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 综合管理才有 -->
      <el-row v-if="communityInfo.communityManagementType" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('community.commonPdf')">
            <single-image :value.sync="communityInfo.commonPdf" :type="0"/>
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
        },
        rules: {
          communityArea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityVerticalArea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityCoverArea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityNoCoverArea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityShopsArea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityShopsCount: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityHouseArea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityRoomCount: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityCommonArea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityGreenarea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityGarageArea: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ],
          communityGarageCount: [
            { validator: (rule, value, callback) => {
              const reg = /^[0-9]+\.{0,1}[0-9]{0,100}$/
              if (!reg.test(value)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: ['blur', 'change'] }
          ]
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
        const isValidate = await new Promise(this.$refs.dataForm.validate)
        if (!isValidate) {
          return this.$notify({ title: '提示', message: '请填写正确的信息！', type: 'info', duration: 2000 })
        }
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
