<template>
	<view class="wrap">
		<view class="icon">
			<image src="../../static/images/a3.png" class="icon-img" mode=""></image>
		</view>
		<view class="news-wrap">
			<view class="news-top">
				<view class="news-title fz15 h1">
					<text>代办事项提醒通知</text>
				</view>
			</view>
			
			<view class="news-bottom">
				<view class="wenti-name fz15 h1">新客户需要跟进</view>
				<view class="wenti-desc fz12 h3">提醒时间: 2020-2285-2585</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.wrap{
		padding: 15px;
		display: flex;
		justify-content: space-between;
		
		.btn-wrap{
			display: flex;
			justify-content: flex-end;
		}
		
		.news-top{
			padding: 15px;
			border-bottom: solid 1px #e6e6e6;
			.news-title{
			}
		}
		
		.news-bottom{
			padding: 15px;
			.wenti-name{
				padding-bottom: 10px;
			}
			.img-wrap{
				display: flex;
				flex-wrap: wrap;
				padding: 15px 0;
				.img{
					width: 130rpx;
					height: 130rpx;
					border-radius: 8px;
					margin-right: 10px;
				}
			}
		}
		
		.news-wrap{
			width: 580rpx;
			background-color: #fff;
			border-radius: 10px;
		}
		
		.icon-img{
			width: 45px;
			height: 45px;
		}
	}
</style>
