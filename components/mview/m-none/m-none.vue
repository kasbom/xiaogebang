<template>
	<view class="none-wrap" :style="css">
   <u-empty
			:text="text"
			:mode="mode"
			:color="color"
			:font-size="fontSize"
			:icon-size="iconSize"
			:icon-color="iconColor"
			:margin-top="marginTop"
		></u-empty>
		<!-- <image src="../../../static/images/6.png" class="empty-icon" mode=""></image> -->
		<view class="empty-text">暂无数据</view>
  </view>
</template>

<script>
	export default {
		props: {
      'iconColor': {
				type: String,
				default: '#999'
			},
			'iconSize': {
				type: [ String, Number ],
				default: 120
			},
			color: {
				type: String,
				default: '#999'
			},
			'fontSize': {
				type: [ String, Number ],
				default: 28
			},
			text: {
				type: String,
				default: '暂无数据'
			},
			mode: {
				type: String,
				default: 'list'
			},
			'marginTop': {
				type: [ String, Number ],
				default: 120
			},
			css: {
				type: Object,
				default() {
					return {}
				}
			}
    }
	}
</script>

<style scoped lang="scss">
	.none-wrap{
		padding: 60rpx 0 45rpx;
	}
	.empty-icon{
		width: 219rpx;
		height: 156rpx;
		display: block;
		margin: 0 auto;
	}
	.empty-text{
		color: #ececec;
		font-size: 22.5rpx;
		text-align: center;
		padding-top: 24.75rpx;
	}
</style>
