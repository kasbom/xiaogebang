<template>
  <view class="">
    <view class="searchHead">
      <view class="bar" :style="{height: statusBarHeight + 'rpx'}"></view>
      <view class="head" :style="{height: headerHeight + 'rpx'}">
        <view class="icon" @click="$mRouter.back()">
					<u-icon name="fanhui" custom-prefix="custom-icon" size="32" color="#fff" v-if="showBack"></u-icon>
        </view>
        <view class="search-wrap">
          <view class="title" v-if="title">{{title}}</view>
					<slot name="title" v-else></slot>
        </view>
        <view class="icon">
					<slot name="right"></slot>
				</view>
      </view>
    </view>
    <view class="hei" style="background-color: #fff;" :style="{height: statusBarHeight + headerHeight - 2 + 'rpx'}"></view>
  </view>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
			showBack: {
				type: Boolean,
				default: true
			}
    },
    data () {
      return {
        statusBarHeight: 0,
				headerHeight: 120
      }
    },
    created () {
      this.statusBarHeight = getApp().globalData.systemInfo.statusBarHeight
    },
    methods: {
      confirm (e) {
        let val = e.detail.value
        val = val ? val : this.keyWord
        this.$emit('confirm', val)
      }
    }
  }
</script>

<style scoped lang="less">
  .searchHead{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #1d1d1d;
    z-index: 9999;
    transition: all .8;
  }
  .immersive{
    background-color: transparent;
    .title{
      color: #fff;
    }
  }
  .title{
    color: #fff;
		font-size: 50rpx;
		font-weight: 400;
		// letter-spacing: 6px;
  }
  .head{
    height: 120rpx;
    padding: 0 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left{
    display: flex;
  }
  .back{
    width: 52rpx;
    height: 52rpx;
  }
  .icon{
    width: 52rpx;
    height: 52rpx;
		font-size: 0;
		display: flex;
		align-items: center;
  }
</style>
