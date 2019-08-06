<template>
  <div class="upload-container-building">
    <el-upload :action="action" :on-remove="handleRemove" :on-preview="handlePreview" :file-list="fileList" :http-request="httpRequest" multiple>
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
  // 预览效果见付费文章
  // import {
  //   uploadFile
  // } from '@/api/file'
  import { Loading } from 'element-ui'
  import axios from 'axios'

  export default {
    name: 'SingleImageUpload',
    props: {
      value: {
        type: Array,
        default: () => ([])
      },
      type: {
        type: Number,
        default: 2 // 0社区pdf 1事件pdf 2建筑pdf 3建筑业主名册 4视频广告文件
      }
    },
    data() {
      return {
        tempUrl: '',
        dataObj: {
          token: '',
          key: ''
        },
        imageUrl: null,
        fileList: [],
        dataFileList: [],
        list: [],
        imgPrefix: 'http://songsong.fun/file', // 图片前缀
        action: ''
      }
    },
    watch: {
      value() {
        this.setData()
      }
    },
    created() {
      this.action = 'http://songsong.fun/backstage/back/file/uploadFile?type=' + this.type
      this.setData()
      this.dataObj.token = localStorage.getItem('Admin-Token')
    },
    methods: {
      setData() {
        this.fileList = []
        this.list = []
        this.dataFileList = []
        this.value.forEach(element => {
          this.fileList.push({ name: this.fileName(element), url: element })
          this.dataFileList.push(element)
          this.list.push(element)
        })
      },
      rmImage() {
        this.emitInput('')
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      handleImageSuccess() {
        this.emitInput(this.tempUrl)
      },
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
         url: 'http://songsong.fun/backstage/back/file/uploadFile?type=' + this.type,
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
            return this.$notify({ title: '失败', message: '上传文件失败', type: 'error', duration: 2000 })
          }
          this.fileList.push({ name: this.fileName(res.data.data), url: (this.imgPrefix + res.data.data) })
          this.list.push((this.imgPrefix + res.data.data))
          this.$emit('update:value', this.list)
        })
        return null
      },
      handleRemove(file, fileList) {
        const list = this.dataFileList.filter((item) => {
          if (fileList.some((value) => value.url.search(item) !== -1)) return true
        })
        this.$emit('update:value', list)
      },
      handlePreview(file) {
        const a = document.createElement('a')
        a.setAttribute('download', this.fileName(file.url))
        a.setAttribute('href', file.url)
        a.setAttribute('target', '_blank')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      },
      fileName(fileUrl) {
        const arr = fileUrl.split('/')
        return arr[arr.length - 1]
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  @import "~@/styles/mixin.scss";

  .upload-container-building {
    // width: 100%;
    position: relative;
    @include clearfix;

    .image-uploader {
      // width: 60%;
      // float: left;
    }

    .el-upload {
      width: auto;
      // height: 146px;
    }

    .image-preview {
      width: 200px;
      height: 200px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      margin-left: 50px;

      .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 200px;

        .el-icon-delete {
          font-size: 36px;
        }
      }

      &:hover {
        .image-preview-action {
          opacity: 1;
        }
      }
    }
  }
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 178px;
  //   height: 178px;
  //   line-height: 178px;
  //   text-align: center;
  // }

</style>
