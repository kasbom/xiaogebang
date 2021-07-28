<template>
	<view class="">
		<view class="list-wrap">
			<view class="list">
				<view class="list-left">
					<image src="../../static/images/a1.png" class="list-icon" mode="aspectFill"></image>
					<view class="list-con">
						<view class="fz15 h1 list-name">派单消息通知</view>
						<view class="fz12 h3 desc">您的订单，商家已确认结单</view>
					</view>
				</view>
				
				<view class="list-right">
					<view class="time fz11 h4">2021-11-20</view>
					<u-badge type="error" count="7" :absolute="false"></u-badge>
				</view>
			</view>
			<view class="list" @click="toDetail">
				<view class="list-left">
					<image src="../../static/images/a2.png" class="list-icon" mode="aspectFill"></image>
					<view class="list-con">
						<view class="fz15 h1 list-name">系统通知</view>
						<view class="fz12 h3 desc">提现申请已通过审核</view>
					</view>
				</view>
				
				<view class="list-right">
					<view class="time fz11 h4">2021-11-20</view>
					<u-badge type="error" count="7" :absolute="false"></u-badge>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toDetail() {
				this.$mRouter.push({
					path: '/publicPages/pages/news/detail'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.list-wrap{
		margin-top: 10px;
	}
	.list{
		padding: 10px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		position: relative;
		&::after{
			content: '';
			width: 611rpx;
			height: 1px;
			background-color: #e9e9e9;
			position: absolute;
			bottom: 0;
			right: 0;
		}
		.list-icon{
			width: 45px;
			height: 45px;
			margin-right: 10px;
		}
		.list-left{
			display: flex;
			align-items: center;
		}
		.list-right{
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			.time{
				padding-bottom: 8px;
			}
		}
	}
</style>
