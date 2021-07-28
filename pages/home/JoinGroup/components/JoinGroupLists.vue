<template>
	<view class="wrap">
		<navigator :url="`/pages/home/JoinGroup/detail?id=${item.id}&city_id=${item.city_id}`" class="item" v-for="(item,i) in joinList" :key="i">
			<view class="img-wrap">
				<image :src="item.main_pic" class="icon" mode="aspectFill"></image>
				<view class="label">{{item.buy_num}}人成团</view>
			</view>
			<view class="item-con">
				<view class="item-name">
					<view class="fz16 h1">{{item.goods_name}}</view>
				</view>
				
				<view class="pri-btn">
					<view class="fz16 h99">￥{{item.price}}</view>
					<view class="del fz12 h4">￥{{item.goods_price}}</view>
				</view>
				
				<view class="btn-wrap">
					<m-button title="预约" @handleClick="navToPage(`/pages/home/JoinGroup/detail?id=${item.id}&city_id=${item.city_id}`)" :css="{height: '25px', 'font-size': '12px', 'background-color': '#ff4b34'}"></m-button>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timestamp: 86400,
			}
		},
		props:{
			joinList:{
				type:Array
			},
			
		},
		methods:{
			navToPage(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding: 10px 15px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.item{
		background-color: #fff;
		margin-bottom: 10px;
		width: 336rpx;
		.icon{
			width: 336rpx;
			height: 336rpx;
		}
		.img-wrap{
			position: relative;
			.label{
				font-size: 11px;
				color: #fff;
				width: 65px;
				height: 20px;
				background-color: #ff4b34;
				border-top-right-radius: 20px;
				border-bottom-right-radius: 20px;
				position: absolute;
				top: 10px;
				left: 0;
				text-align: center;
				line-height: 20px;
			}
		}
		.item-con{
			flex: 1;
			padding: 6px 10px 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.pri-btn{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 4px 0;
		}
	}
</style>
