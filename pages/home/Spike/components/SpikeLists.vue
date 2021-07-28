<template>
	<view class="wrap">
		<navigator :url="`/pages/home/Spike/detail?id=${item.id}&city_id=${item.city_id}`" class="item" v-for="item,i in msArr" :key="i">
			<image :src="item.main_pic" class="icon" mode="aspectFill"></image>
			<view class="item-con">
				<view class="item-name">
					<view class="fz16 h1">{{item.goods_name}}</view>
					<view class="label">立省￥{{item.sheng}}</view>
				</view>
				
				<view class="fz12 h3 del">￥{{item.goods_price}}</view>
				
				<view class="pri-btn">
					<view class="fz16 h99">￥{{item.price}}</view>
					<m-button title="去抢购" @handleClick="navToPage(`/pages/home/Spike/detail?id=${item.id}&city_id=${item.city_id}`)"  size="mini" :css="{height: '25px', 'font-size': '12px', 'background-color': '#ff4b34'}" ></m-button>
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
			msArr:{
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
	}
	.item{
		display: flex;
		background-color: #fff;
		margin-bottom: 10px;
		padding: 10px;
		.icon{
			width: 100px;
			height: 100px;
		}
		.label{
			display: inline-block;
			padding: 0 4px;
			height: 18px;
			line-height: 18px;
			text-align: center;
			border-radius: 2px;
			font-size: 12px;
			color: #ff4b34;
			border: solid 1px #ff4b34;
			margin-top: 6px;
		}
		.item-con{
			flex: 1;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.pri-btn{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
 