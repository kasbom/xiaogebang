<template>
	<view class="list-wrap border-img">
		<view class="list">
			<view class="left">
				<view class="left-top">
					<text class="left-top-text1">BTC</text>
					<text class="left-top-text2">／usdt</text>
				</view>
				<view class="left-bottom">24H额 ¥ 12020208392</view>
			</view>
			
			<view class="center">
				<view class="center-top">
					<text class="">0.6</text>
				</view>
				<view class="center-bottom">≈ 7.72 CNY</view>
			</view>
			
			<view class="right">
				<view class="btn">+ 2.00%</view>
			</view>
		</view>
		
		<view class="list last-list">
			<view class="left">
				<view class="left-top">
					<text class="left-top-text1">BTC</text>
					<text class="left-top-text2">／usdt</text>
				</view>
				<view class="left-bottom">24H额 ¥ 12020208392</view>
			</view>
			
			<view class="center">
				<view class="center-top">
					<text class="">0.6</text>
				</view>
				<view class="center-bottom">≈ 7.72 CNY</view>
			</view>
			
			<view class="right">
				<view class="btn btn1">+ 2.00%</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.list-wrap{
		width: 685.5rpx;
	}
	.list{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 26.25rpx 0 22.5rpx;
		flex-wrap: wrap;
		position: relative;
	}
	.list::after{
		content: '';
		width: calc(100% - 18rpx);
		height: 1px;
		background-color: #636363;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	
	.last-list::after{
		height: 0;
	}
	.right{
		padding-right: 33rpx;
		.btn{
			width: 115.5rpx;
			height: 50.25rpx;
			background-color: #3eac8e;
			border-radius: 7.5rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 22.5rpx;
			color: #FFFFFF;
		}
		.btn1{
			background-color: #cc5165;
		}
	}
	.center{
		width: 169.5rpx;
		text-align: center;
		.center-top{
			font-size: 22.5rpx;
		}
		.center-bottom{
			font-size: 15rpx;
			padding-top: 13.5rpx;
			color: #9d9d9d;
		}
	}
	.left{
		width: 285rpx;
		padding-left: 13.5rpx;
		box-sizing: border-box;
		flex-shrink: 0;
	}
	.left-top{
		display: flex;
		align-items: flex-end;
		.left-top-text1{
			font-size: 22.5rpx;
			color: #ffffff;
		}
		.left-top-text2{
			font-size: 18rpx;
			color: #9d9d9d;
		}
	}
	.left-bottom{
		font-size: 15rpx;
		padding-top: 13.5rpx;
		color: #9d9d9d;
	}
</style>
