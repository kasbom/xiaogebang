<template>
	<view class="wrap" >
		<navigator :url="`/pages/home/SetMeal/detail?id=${item.id}&city_id=${item.city_id}`" class="item" v-for="(item,i) in mealLists" :key="i">
			<image :src="item.main_pic" class="icon" mode="aspectFill"></image>
			<view class="item-con">
				<view class="item-name">
					<view class="fz16 h1">{{item.name}}</view>
				</view>
				
				<view class="fz15 h2">
					<text>套餐价</text>
					<text class="h99">￥{{item.price}}</text>
				</view>
				
				<view class="pri-btn">
					<view class="fz12 h2">销量: {{item.sales}}</view>
					<m-button @handleClick="navToPage(`/pages/home/SetMeal/detail?id=${item.id}&city_id=${item.city_id}`)" title="立即购买" size="mini"></m-button>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	import {navTo,getToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				timestamp: 86400,
			}
		},
		props:{
			mealLists:{
				type:Array
			},
			
		},
		methods:{
			navToPage(url){
				navTo(url)
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
		border-radius: 10prx;
		.icon{
			width: 100px;
			height: 100px;
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
