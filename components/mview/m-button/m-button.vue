<!-- 
  props
   size 按钮尺寸  可选值   
   title String 按钮文字
	 hollow Boolean 是否镂空
   gray Boolean 是否灰色背景
   css Object 自定义样式
   
  event
    @handleClick 按钮点击事件
   
   slot
    按钮内内容 如果有title就不显示
 -->
<template>
  <view
    class="m-button"
    :class="[size, {'gray': gray, 'white': white, 'hollow': hollow}]"
    :style="css"
    @click.stop="handleClick"
   >
    <view class="title" v-if="title">{{title}}</view>
    <view v-else>
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default: 'center'
      },
      title: {
        type: [String, Number],
        default: ''
      },
      gray: {
        type: Boolean,
        default: false
      },
      white: {
        type: Boolean,
        default: false
      },
			hollow: {
        type: Boolean,
        default: false
      },
      css: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      handleClick () {
        this.$emit('handleClick')
      }
    }
  }
</script>

<style lang="scss" scoped>  
  .m-button{
    background: $theme-c;
		border-color: $theme-c;
    display: flex;
    align-items: center;
    justify-content: center;
    .title{
      color: #fff;
    }
    &.max{
      // width: 100%;
			flex: 1;
      height: 44px;
      font-size: 14px;
    }
    &.center{
      // width: 100%;
      flex: 1;
      height: 40px;
      border-radius: 40px;
      font-size: 16px;
    }

    &.gray{
      background: #eee;
			border-color: #eee;
      .title{
        color: #7b7b7b;
      }
    }
    &.white{
      background-color: #fff;
			border-color: #fff;
      .title{
        color: $uni-color-primary;
      }
    }
    &.mini{
      width: 144rpx;
      height: 48rpx;
      border-radius: 2px;
      .title{
        font-size: 12px;
      }
    }
		
		&.hollow{
			background-color: #fff;
			border-width: 1px;
			border-style: solid;
			border-radius: 8rpx;
			.title{
				color: $theme-c;
			}
			&.gray{
				.title{
					color: #666;
				}
			}
		}
  }
</style>
