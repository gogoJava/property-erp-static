<template>
  <div class="upload-container-clubhouse">
    <el-upload :file-list="fileList" :http-request="httpRequest" :on-remove="handleRemove" list-type="picture-card" action="http://songsong.fun/backstage/back/file/upload?type=3">
      <i class="el-icon-plus"/>
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
        imgPrefix: 'http://songsong.fun/file' // 图片前缀
      }
    },
    watch: {
      value() {
        this.setData()
      }
    },
    created() {
      this.setData()
      this.dataObj.token = localStorage.getItem('Admin-Token')
    },
    methods: {
      setData() {
        this.fileList = []
        this.list = []
        this.dataFileList = []
        this.value.forEach(element => {
          this.fileList.push({ name: '图片', url: (this.imgPrefix + element.imageUrl) })
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
          text: '上传图片中...'
        })
        // formData
        const formData = new FormData()
        formData.append(option.filename, option.file)
        const options = {
         // 设置axios的参数
         url: 'http://songsong.fun/backstage/back/file/upload?type=3',
         data: formData,
         method: 'post',
         headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('Admin-Token')
         }
        }
        axios(options).then((res) => {
          loadingInstance.close()
          if (res.data.code !== 200 || !res.data.data.originalUrl) {
            return this.$notify({ title: '失败', message: '上传文件失败', type: 'error', duration: 2000 })
          }
          this.fileList.push({ name: '图片', url: (this.imgPrefix + res.data.data.originalUrl) })
          this.dataFileList.push({ imageThumbnail: res.data.data.imageThumbnail, imageUrl: res.data.data.originalUrl })
          this.list.push({ imageThumbnail: res.data.data.thumbnailUrl, imageUrl: res.data.data.originalUrl })
          this.$emit('update:value', this.list)
        })
        return null
      },
      handleRemove(file, fileList) {
        const list = this.dataFileList.filter((item) => {
          if (fileList.some((value) => value.url.search(item.imageUrl) !== -1)) return true
        })
        this.$emit('update:value', list)
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  @import "~@/styles/mixin.scss";

  .upload-container-clubhouse {
    // width: 100%;
    position: relative;
    @include clearfix;

    .image-uploader {
      // width: 60%;
      // float: left;
    }

    .el-upload {
      width: 146px;
      height: 146px;
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
