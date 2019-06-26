<template>
  <div class="import-user">
    <el-upload :action="action" :http-request="httpRequest" multiple>
      <el-button size="mini" type="primary">{{ $t('table.importUser') }}</el-button>
    </el-upload>
  </div>
</template>

<script>
  import { Loading } from 'element-ui'
  import axios from 'axios'

  export default {
    name: 'ImportUser',
    props: {
      communityId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dataObj: {
          token: '',
          key: ''
        },
        action: ''
      }
    },
    watch: {
      communityId() {
        this.action = 'http://songsong.fun/backstage/back/user/import?communityId=' + this.communityId
      }
    },
    created() {
      this.dataObj.token = localStorage.getItem('Admin-Token')
    },
    methods: {
      async httpRequest(option) {
        if (!this.communityId) return this.$notify({ title: '提示', message: '请选择社区！', type: 'info', duration: 2000 })
        const loadingInstance = Loading.service({
          fullscreen: true,
          text: '上传文件中...'
        })
        // formData
        const formData = new FormData()
        formData.append(option.filename, option.file)
        const options = {
         // 设置axios的参数
         url: 'http://songsong.fun/backstage/back/user/import?communityId=' + this.communityId,
         data: formData,
         method: 'post',
         headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('Admin-Token')
         }
        }
        axios(options).then((res) => {
          loadingInstance.close()
          if (res.data.code !== 200 || !res.data.data) {
            return this.$notify({ title: '失败', message: '导入业主文件失败', type: 'error', duration: 2000 })
          }
          this.$notify({ title: '成功', message: '导入业主文件成功！', type: 'success', duration: 2000 })
          this.$emit('success')
        })
        return null
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  .import-user {
    & .el-upload-list {
      display: none;
    }
  }
</style>
