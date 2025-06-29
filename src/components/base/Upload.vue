<template>
  <lsj-upload
    ref="lsjUpload"
    childId="dayUpload"
    :height="height"
    :option="option"
    :formats="formats"
    :debug="debug"
    :webview="webviewUrl"
    @uploadEnd="onuploadEnd"
    @progress="onprogre"
    @change="change"
    :multiple="false"
  >
    <slot>默认内容</slot>
  </lsj-upload>
</template>
<script>
import { wrapperEnv } from '@/utils/env'
const { VITE_APP_BASE_URL, VITE_APP_UPLOAD_HTML_URL } = wrapperEnv
export default {
  props: {
    height: { type: String, default: '88rpx' },
    requestUrl: { type: String, default: '' }
    // entityId: { type: String, default: '' },
    // fundId: { type: String, default: '' }
  },
  data() {
    return {
      imageValue: [], //文件存放列表
      webviewUrl: `${VITE_APP_UPLOAD_HTML_URL}`,
      option: {
        url: `${VITE_APP_BASE_URL}${this.requestUrl}`, //服务器地址
        name: 'file',
        header: {
          // Authorization: `Bearer ${uni.getStorageSync('token')}`
          Authorization: uni.getStorageSync('userInfo')?.token || ''
        },
        formData: {}
      },
      // accept: 'application/pdf',
      formats: 'pdf,doc,docx,jpg,png',
      debug: false,
      files: new Map(),
      btnLoading: false
    }
  },
  mounted() {},
  methods: {
    async toTemplatePage() {
      if (!this.imageValue.length) {
        this.showToastDesc('请进行附件上传')
        return
      }
      let pages = getCurrentPages()
      const curPage = pages[pages.length - 1] //当前页
      const prePage = pages[pages.length - 2] //上一页
      prePage.$vm.getDayQueData(this.imageValue)
      uni.navigateBack({
        delta: 1
      })
    },
    hanldUpload() {
      if (this.imageValue.length) {
        this.showToastDesc('只能上传一个文件')
        return
      }
    },
    //单个删除上传文件
    hanldDelete(itemFile) {
      this.imageValue.map((item, index) => {
        if (item.path === itemFile.path) {
          this.imageValue.splice(index, 1)
        }
      })
    },
    showToastDesc(text) {
      uni.showToast({
        icon: 'none',
        title: text
      })
    },
    //完成上传
    onuploadEnd(item) {
      console.log(`${item.name}已上传结束，上传状态=${item.type}`)
      if (item['responseText']) {
        // console.log('演示服务器返回的字符串JSON转Object对象')
        const responseText = JSON.parse(item.responseText)
        console.log(responseText, '上传成功的数据')
        if (responseText?.filePath || responseText?.docPath) {
          this.imageValue.push({
            name: item.name,
            url: responseText?.filePath || responseText?.docPath
          })
          this.btnLoading = false
          uni.hideLoading()
          this.$emit('saveList', this.imageValue)
          // console.log(this.imageValue)
        } else {
          uni.hideLoading()
          this.showToastDesc(responseText.errorMessage || '上传失败，请重试')
        }
      } else {
        uni.hideLoading()
        this.showToastDesc(item.errorMessage || 'error')
      }
    },
    onprogre(item) {
      // 更新当前状态变化的文件
      this.files.set(item.name, item)
      // console.log('打印对象', JSON.stringify(this.files.get(item.name)))
    },
    change(files) {
      if (files?.values) {
        const fileData = JSON.stringify([...files.values()])
        if (fileData?.length) {
          const url = JSON.parse(fileData)[0].path
          const name = JSON.parse(fileData)[0].name
          console.log(url, name, '获取文件url')
          //触发上传
          this.$refs['lsjUpload'].upload()
          uni.showLoading({
            title: 'Loading...',
            mask: true
          })
          this.btnLoading = true
        }
      }
      // this.files = files;
    }
  },
  onLoad(props) {
    if (props.dayData && props.dayData !== 'null') {
      const dealData = JSON.parse(decodeURIComponent(props.dayData))
      // console.log(dealData)
      this.imageValue = [
        {
          ...dealData
        }
      ]
    }
    //当文件列表本来就有值的时候，点击上传弹出提示，不再弹出选择文件弹框
    //为什么使用setTimeout，option会触发show，导致设置的hide不生效
    const timeout = setTimeout(() => {
      if (this.imageValue.length) {
        this.$refs['lsjUpload'].hide()
      }
      if (timeout) {
        clearTimeout(timeout)
      }
    }, 600)
  },
  //监听文件列表的值，hide时候会触发hanldUpload
  watch: {
    imageValue(val) {
      if (this.imageValue.length) {
        this.$refs['lsjUpload'].hide()
      } else {
        this.$refs['lsjUpload'].show()
      }
    }
  }
}
</script>

<style lang="scss"></style>
