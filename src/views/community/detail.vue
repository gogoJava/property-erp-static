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
      <el-row :gutter="20">
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
            <div v-for="(item, index) in communityInfo.commonPdf" :key="index" class="common-img-detail-community">
              <el-tooltip :content="$t('table.download')" placement="top">
                <span>
                  <i class="el-icon-folder-opened" style="width: 24px;"/>
                  <a :href="item" :download="fileName(item)">{{ fileName(item) }}</a>
                  <i class="el-icon-download" style="padding-left: 80px;"/>
                </span>
              </el-tooltip>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item :label="$t('community.communityChildList')" prop="communityChildList">
          <el-row>
            <el-col v-show="false" :span="1"><div>排序</div></el-col>
            <el-col :span="5"><div>名稱</div></el-col>
            <el-col :span="4"><div>數量</div></el-col>
            <el-col :span="5"><div>面積</div></el-col>
            <el-col :span="5"><div>用途</div></el-col>
            <el-col :span="5"><div>千分比之相对价值</div></el-col>
          </el-row>
          <el-row v-for="(item, index) in communityInfo.communityChildList" :key="index">
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
            <!-- <el-col :span="5"><el-input v-model="item.perthousand" placeholder="20"><el-button slot="append" icon="el-icon-minus" @click.native="cutChildList(index)"/></el-input></el-col> -->
          </el-row>
          <!-- <el-row style="text-align: center;"><span style="cursor: pointer;font-size: 30px;" @click="addChildList">+</span></el-row> -->
        </el-form-item>
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
      },
      fileName(fileUrl) {
        const arr = fileUrl.split('/')
        return arr[arr.length - 1]
      }
    }
  }

</script>
<style>
  .community-detail-view {
    padding: 30px;
  }
  .common-img-detail-community {
    /* width: 48px;
    height: 48px; */
    cursor: pointer;
  }
</style>
