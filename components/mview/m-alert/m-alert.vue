<!-- 
  buttons: 数组/对象  按钮对象，可以多个 {text: 按钮文字, color: 字体颜色, disable: 是否禁用, autoClose: '是否自动关闭'}
  title: 字符串   提示语
  
  EVENT
  click-button  点击按钮  params: {index: 按钮suo索引}
 -->
<template>
  <view>
    <m-popup :show="value" @change="showChange">
      <view class="m-alert">
        <view class="title" v-html="title"></view>
        <view class="btn-wrap">
          <view
            class="btn"
            v-for="(item, index) in btnLists"
            :key="index"
            :class="{'last-btn': index == btnLists.length - 1}"
            :style="{color: item.color || '#333'}"
            @click="clickBtn(item, index)"
           >{{item.text}}</view>
        </view>
      </view>
    </m-popup>
  </view>
</template>

<script>
  import mPopup from '../m-popup/m-popup.vue'
  export default {
    props: {
      buttons: {
        type: [Array, Object],
        default () {
          return {
            text: '确定',
            color: '#333',
            disable: false,
            autoClose: true
          }
        }
      },
      title: {
        type: String,
        default: ''
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    components: {
      mPopup
    },
    data () {
      return {
        btnLists: []
      }
    },
    created () {
      this.btnLists = Object.prototype.toString.call(this.buttons) === '[object Array]' ?  this.buttons : [this.buttons]
    },
    methods: {
      clickBtn (item, index) {
        if (!item.disable)
        this.$emit('click-button', {item, index})
        if (item.autoClose)
        this.$emit('input', false)
      },
      showChange ({show}) {
        this.$emit('input', show)
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-alert{
    width: 520upx;
    background: #fff;
    border-radius: 4px;
    .title{
      min-height: 50px;
      padding: 25px 15px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #333;
    }
    .btn-wrap{
      border-top: 1px solid #dcdcdc;
      display: flex;
      .btn{
        flex: 1;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #333;
        border-right: 1px solid #dcdcdc;
        &.last-btn{
          border-right: 0;
        }
      }
    }
  }
</style>
