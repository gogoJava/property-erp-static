<template>
  <div class="import-unit">
    <el-upload :action="action" :http-request="httpRequest" multiple>
      <el-button size="mini" type="primary">{{ $t('table.importUnit') }}</el-button>
    </el-upload>
  </div>
</template>

<script>
  import { Loading } from 'element-ui'
  import axios from 'axios'

  export default {
    name: 'ImportUnit',
    props: {
      buildingId: {
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
      buildingId() {
        this.action = 'http://songsong.fun/backstage/back/unit/import?buildingId=' + this.buildingId
      }
    },
    created() {
      this.dataObj.token = localStorage.getItem('Admin-Token')
    },
    methods: {
      async httpRequest(option) {
        const loadingInstance = Loading.service({
          fullscreen: true,
          text: '上传文件中...'
        })
        // formData
        const formData = new FormData()
        formData.append(option.filename, option.file)
        const options = {
         // 设置axios的参数
         url: 'http://songsong.fun/backstage/back/unit/import?buildingId=' + this.buildingId,
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
            return this.$notify({ title: '失败', message: '导入单元文件失败', type: 'error', duration: 2000 })
          }
          this.$notify({ title: '成功', message: '导入单元文件成功！', type: 'success', duration: 2000 })
          this.$emit('success')
        })
        return null
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  .import-unit {
    & .el-upload-list {
      display: none;
    }
  }
</style>
