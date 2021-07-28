<template>
	<view class="wrap">
		<image src="../../../static/images/lingshi/ayi.png" class="icon" mode=""></image>
		
		<view class="submit">
			<view class="service">
				<image src="../../../static/images/index/service.png" class="service-icon" mode=""></image>
				<text class="fz10 h2">客服</text>
			</view>
			<view class="btn-wrap">
				<view class="btn">
					<navigator url="/pages/home/worker/reservation" class="fz14">立即预约</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
</script>

<style scoped lang="scss">
	.wrap{
		padding-bottom: 60px;
	}
	.icon{
		display: block;
		width: 100%;
		height: 5341rpx;
	}
	.submit{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		background-color: #fff;
		.service{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 55px;
			.service-icon{
				width: 17px;
				height: 16px;
				margin-bottom: 6px;
			}
		}
		.btn-wrap{
			display: flex;
			flex: 1;
			.btn{
				flex: 1;
				height: 50px;
				background-color: #ff6600;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #fff;
				&.ciyao{
					opacity: .8;
				}
			}
		}
	}
</style>
