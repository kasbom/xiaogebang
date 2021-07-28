<!-- 
  props
    value 选中状态
    list 协议id
 -->
<template>
  <view class="m-protocol">
    <view class="icon" :class="{active: value}" @click="handleChangeSel"></view>
    <view class="text">
      <text @click="handleChangeSel">请阅读并同意</text>
      <text
        class="name"
        v-for="(item, index) in selProtocolList"
        :key="index"
      >
        <text class="name-text" @click="open(index)">《{{item.name}}》</text>
        <template v-if="index != list.length - 1">&</template>
      </text>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        show: false,
        content: '',
        title: '',
				allProtocolList: [], // 所有协议
				selProtocolList: [], // 用户需要的协议
				protocolListDetailList: [], // 详情数组
      }
    },
		created() {
			this.platformRulesAndProtocols()
		},
    methods: {
			// 获取协议列表
			async platformRulesAndProtocols() {
				const { code,content } = await this.$u.api.platformRulesAndProtocols()
				if (code === 0) {
					this.allProtocolList = content.list
					this.selProtocolList = this.allProtocolList.filter(item => {
						if (this.list.includes(item.id)) return true
						else return false
					})
				}
			},
      open(index) {
				const { name: title, id } = this.selProtocolList[index]
        uni.navigateTo({
        	url: `/pages/protocol/detail?id=${id}&title=${title}`
        })
      },
      handleChangeSel () {
        this.$emit('input', !this.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  .protocol-con{
    height: 100%;
    display: flex;
    flex-direction: column;
    .title{
      padding: 20rpx;
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content{
      padding: 20rpx 24rpx;
      flex-grow: 1;
      overflow-y: auto;
    }
    .btn-wrap{
      padding: 20rpx 24rpx 20rpx;
    }
  }
  .m-protocol{
    display: flex;
    align-items: center;
  }
  .icon{
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1px solid #d0d0d0;
    box-sizing: border-box;
    margin-right: 10upx;
    &.active{
      border: 1px solid $u-type-primary;
      display: flex;
      align-items: center;
      justify-content: center;
      &:after{
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: $u-type-primary;
      }
    }
  }
  .text{
    font-size: 12px;
  }
  .name{
    color: #333;
  }
  .name-text{
    color: $uni-color-primary;
  }
</style>
