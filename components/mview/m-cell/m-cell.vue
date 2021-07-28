<!-- 
  props
    label String  左边的标签
    title String/Number 右边的值
    is-link Boolean 是否为链接，值为true时显示右边的箭头
    to String/Object 需要跳转的地址
    id String/Number 改cell标识
    icon Obj 箭头配置
    border 是否显示底部边框
    padding 
   event
    click-cell 点击cell  params: {key: id}
    
    slot
      left cell左边部分
      right cell 右边部分
 -->
<template>
  <view class="m-cell" @click="clickCell" :class="{'no-border': !border, 'no-padding': !padding}" :style="{'width': width, height: height}">
    <view class="left">
      <template v-if="label">
        <view class="label">{{label}}</view>
      </template>
      <view class="left-slot">
        <slot name="left"></slot>
      </view>
    </view>
    <view class="right">
      <view class="right-slot">
        <slot name="right"></slot>
      </view>
      <template>
        <view class="right-wrap">
          <view class="label">{{title}}</view>
          <u-icon name="arrow-right" class="right-icon" color="#858585" size="24" v-if="isLink"></u-icon>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      title: {
        type: [String, Number],
        default: ''
      },
      'isLink': {
        type: Boolean,
        default: false
      },
      to: {
        type: [String, Object],
        default: ''
      },
      id: {
        type: [String, Number],
        default: ''
      },
      icon: {
        type: Object,
        default () {
          return {
            size: 20,
            color: '#808080'
          }
        }
      },
      border: {
        type: Boolean,
        default: true
      },
      padding: {
        type: Boolean,
        default: true
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: 'auto'
      }
    },
    methods: {
      clickCell () {
        if (this.isLink && this.to) {
          let url = ''
          if(Object.prototype.toString.call(this.to) === '[object Object]') {
             let {path, query} = this.to
             let queryString = this.$u.queryParams(query)
             url = `${path}?${queryString}`
          } else {
            url = this.to
          }
          this.$mRouter.push({
            path: url
          })
        } else {
          this.$emit('clickCell')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .m-cell{
    box-sizing: border-box;
    display: flex;
    flex: 1;
		flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 31rpx 24upx;
    position: relative;
    background-color: #fff;
    &.no-border{
      &::after{
        background: rgba(255,255,255,0);
      }
    }
		&.no-padding{
			padding: 31rpx 0;
			&::after{
			  left: 0;
				right: 0;
			}
		}
    &:after{
      position: absolute;
      bottom: 0;
      left: 12px;
      right: 12px;
      content: '';
      height: 1px;
      background: #e4e4e4;
    }
		.left{
			display: flex;
			flex-shrink: 0;
			align-items: center;
		}
    .right{
			// width: 400upx;
			flex: 1;
      display: flex;
			justify-content: flex-end;
      align-items: center;
    }
    .right-slot{
      width: 100%;
    }
    .right-wrap{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      // flex: 1;
      color: #808080;
    }
    .right-icon{
      margin-left: 6rpx;
    }
  }
</style>
