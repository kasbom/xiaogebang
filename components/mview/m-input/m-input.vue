<!-- 
  props
    value 使用v-model 输入框的值 string/number
    label 左边的标题 string
    placeholder 提示
    type 类型
    confirmType 键盘确定按钮文字
    textAlign 输入框显示字显示再左边还是右边 left/right 默认 left
    disabled 是否禁用 默认 false
    maxlength 最大长度
    hasIcon 左边是否是图标 false
    border 是否有下边框 true
    padding 是否有两侧padding true
    
   slot
    left  左边  常用放icon
    right 右边  常用放获取验证码的按钮
    
   event
    change  input值改变时候触发
 -->

<template>
  <view class="m-input" :class="{'has-icon': hasIcon, 'padding': padding, 'border': border}">
    <view class="left">
      <view class="label" v-if="label">{{label}}</view>
      <slot name="left"></slot>
    </view>
    <view class="center">
      <input
        class="input input-text"
        :value="value"
        :type="type"
        :confirm-type="confirmType"
        :placeholder="placeholder"
        :style="{
          'text-align': textAlign
        }"
        :maxlength="maxlength"
        :disabled="disabled"
        @input="handleValueChange"
       >
    </view>
    <view class="right">
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      label: {
        type: [String, Number],
        default: ''
      },
      textAlign: {
        type: String,
        default: 'left'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      confirmType: {
        type: String,
        default: 'done'
      },
      type: {
        type: String,
        default: 'text'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      hasIcon: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: 140
      },
      border: {
        type: Boolean,
        default: true
      },
      padding: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleValueChange (e) {
        let value = e.detail.value
        this.$emit('input', value)
        this.$emit('change', value)
      }
    }
  }
</script>

<style scoped lang="less">
  .m-input{
    display: flex;
    position: relative;
    &.padding{
      padding: 0 20upx;
    }
    &.has-icon{
      padding: 0;
      .left{
        min-width: 35px;
      }
    }
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 1px;
    }
    &.border{
      &::after{
        background: #e4e4e4;
      }
    }
    .left{
      min-width: 70px;
      box-sizing: border-box;
      padding-right: 8px;
      display: flex;
      align-items: center;
      .label{
        font-size: 14px;
        color: #333;
      }
    }
    .center{
      flex: 1;
      .input-text{
        display: block;
        height: 50px;
        box-sizing: border-box;
        font-size: 14px;
        color: #333;
        padding-right: 8px;
      }
    }
    .right{
      display: flex;
      align-items: center;
    }
  }
</style>
