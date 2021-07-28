<template>
  <view class="list-body">
    <view
      class="list-body-li"
      v-for="(item, index) in list"
      :key="index"
      :class="{'list-body-li-last': index === list.length - 1}"
      @click="clickCell(item)"
    >
      <view class="list-body-li-label fz14 h2">{{item.label}}</view>
      <view class="list-body-li-value fz14 h1">{{item.value}}</view>
      <u-icon name="arrow-right" v-if="item.isLink"></u-icon>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      clickCell(item) {
        this.$emit('click', item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-body{
    padding: 0 20rpx;
    background-color: #fff;
    position: relative;
  }
  .list-body-li{
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    line-height: 50rpx;
    padding: 20rpx 0;
  }
  .list-body-li-last{
    border-bottom: 0;
  }
  .list-body-li-label{
    padding-right: 20rpx;
    flex-shrink: 0;
    flex-grow: 0,
  }
  .list-body-li-value{
    flex-grow: 1;
  }
</style>
