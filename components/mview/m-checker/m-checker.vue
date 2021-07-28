<template>
  <view class="checker-wrap">
    <view
      class="checker-list"
      v-for="(item, index) in list"
      :key="index"
      :class="{'checker-list-active': value.includes(item.value)}"
			:style="css"
      @touchstart="selectLabel(item)"
    >{{item.label}}</view>
  </view>
</template>

<script>
  /**
   * actionSheet 选择组件
   * @description 标签形式的单选或者多选组件
   * @property {Array<Object>} list 可选列表，{value: 选项的id, label: 选项的名称, disabled: '选项是否禁用' }
   * @property {Array} value 已经选择的值
   * @property {String} type 单选或者多选  可选值为 radio, checkbox. 默认 radio
   * @property {Number String} max 最多可选多少个, 多选时可用, 0 为不限数量, 默认为 0
   */
  
  export default {
    props: {
      // 可选列表
      list: {
        type: Array,
        default() {
          /**
           * 如下
           * [{value: 1, lable: '广东省', disabled: false}]
           */
          return []
        }
      },
      // 已选的值
      value: {
        type: Array,
        default() {
          return []
        }
      },
      // 类型 单选或者多选
      type: {
        type: String,
        default: 'radio'
      },
      // 最多可选 多选时可用
      max: {
        type: [Number, String],
        default: 0
      },
			// 自定义样式
			css: {
				type: Object,
				default() {
				  return {}
				}
			}
    },
    methods: {
      selectLabel(item) {
        if (this.type == 'radio') {
          let _values = JSON.parse(JSON.stringify(this.value))
          _values[0] = item.value
          this.$emit('input', _values)
          this.$emit('on-change', _values)
        } else {
          this.changeValue(item)
        }
      },
      changeValue(item) {
        let _values = JSON.parse(JSON.stringify(this.value))
        if (!_values.includes(item.value)) {
          if (this.max == 0) {
            _values.push(item.value)
          } else {
            if (this.value.length >= this.max) {
              this.$emit('on-max', this.max)
              return
            } else {
              _values.push(item.value)
            }
          }
          
        } else {
          let index = _values.findIndex((value) => item.value == value)
          console.log(_values)
          console.log(index)
          _values.splice(index, 1)
        }
        this.$emit('input', _values)
        this.$emit('on-change', _values)
      }
    }
  }
</script>

<style scoped lang="scss">
  .checker-wrap{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .checker-list{
    min-width: 160rpx;
    height: 56rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    // background-color: #f4f4f4;
    border-radius: 56rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    color: $theme-c;
		border: 1px solid $theme-c;
    margin-bottom: 20rpx;
    margin-right: 20rpx;
  }
  .checker-list-active{
    background-color: $theme-c;
    color: #fff;
  }
</style>
