<template>
  <view class="m-upload" >
    <view class="btn-wrap" @click="selectSourceType">
      <slot></slot>
    </view>
    <u-action-sheet :list="list" v-model="show" @click="open"></u-action-sheet>
  </view>
</template>

<script>
	import config from '@/config/index.js'
  let sourceType = ['album', 'camera']
  export default {
    props: {
      count: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        show: false,
        list: [{
          text: '相机',
          color: '#666'
        }, {
          text: '相册',
          color: '#666'
        }]
      }
    },
    methods: {
      selectSourceType() {
        this.show = true
      },
      open(index) {
        let sourceType = ''
        switch (index) {
          case 0:
            sourceType = ['camera']
            break
          case 1:
            sourceType = ['album']
            break
        }
        this.chooseImage(sourceType)
      },
      chooseImage (sourceType) {
        uni.chooseImage({
          count: this.count, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: sourceType, //从相册选择
          success: res => {
            // console.log(JSON.stringify(res.tempFilePaths))
            uni.showLoading({
              title: '上传中...',
              mask: true
            })
            let promises = res.tempFilePaths.map(filePath => {
              return this.uploadFile(filePath)
            })
            
            Promise.all(promises)
            .then(data => {
              
              let images = []
              data.forEach((item, index) => {
                images.push({
                  data: JSON.parse(item.data).data,
                  filePath: res.tempFilePaths[index]
                })
              })
              this.$emit('uploadSuccess', images)
              uni.hideLoading()
            })
            .catch((err) => {
              uni.hideLoading()
            })
          }
        })
      },
      uploadFile (filePath) {
        return new Promise((reslove, reject) => {
          uni.uploadFile({
            url: `${config.apiURL}/tools/uploadImg`, //仅为示例，非真实的接口地址
            filePath: filePath,
            name: 'imgFile',
            success: (res => {
              reslove(res)
            })
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
</style>
