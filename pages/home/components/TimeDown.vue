<template>
	<view class="wrap">
		<view class="left">
			<view class="price-label">
				<view class="price">
					<text class="fz14">￥</text>
					<text class="fz24">{{infoObj.price}}</text>
				</view>
				<view class="label" v-if="!typeMs">{{infoObj.buy_num}}人成团价</view>
			</view>
			<view class="del fz12">￥{{infoObj.goods_price}}</view>
		</view>
		<view class="right" v-if="infoObj.time>0||infoObj.surplusTime>0">
			<view class="fz12 right-tip">距离活动开始仅剩</view>
			<u-count-down
				:timestamp="infoObj.time||infoObj.surplusTime"
				:show-days="true"
				:show-minutes="true"
				:show-seconds="true"
				separator="zn"
				bg-color="#fff"
				color="#ff4b34"
				separator-color="#fff"
			></u-count-down>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timestamp: 886400,
			}
		},
		props:{
			infoObj:{
				type:Object,
				default () {
				  return {}
				}
			},
			typeMs:{
				type:Boolean,
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		width: 750rpx;
		height: 60px;
		padding: 0 15px;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
		
		.price-label{
			display: flex;
			align-items: center;
			.label{
				color: #ff4b34;
				width: 65px;
				height: 20px;
				font-size: 11px;
				background-color: #fff;
				line-height: 20px;
				text-align: center;
				border-radius: 20px;
				margin-left: 10px;
			}
		}
		
		.right-tip{
			margin-bottom: 6px;
		}
		
		background-image: linear-gradient(-55deg, 
			#ff4b34 0%, 
			#ff6834 100%), 
		linear-gradient(
			#ffffff, 
			#ffffff);
		background-blend-mode: normal, 
			normal;
	}
</style>
