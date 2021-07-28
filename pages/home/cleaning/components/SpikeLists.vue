<template>
	<view class="">
		<view class="item" v-for="item,i in msArr" :key="i" @click="navToPage(`/pages/home/Spike/detail?id=${item.id}&city_id=${city_id}`)">
			<image :src="item.thumb" class="icon" mode="aspectFill"></image>
			<view class="item-con">
				<view class="tiem-down f99 ">
					<text class="fz14">限时秒杀</text>
					<u-count-down :timestamp="item.surplusTime" :show-days="true"
				:show-minutes="true"
				:show-seconds="true"
				separator="zn" bg-color="#ff4b34" color="#fff"></u-count-down>
				</view>
				<view class="item-name">
					<view class="fz16 h1">{{item.serviceName}}</view>
					<view class="desc fz14 h3">{{item.cateName}}</view>
				</view>
				
				<view class="pri-btn">
					<view class="fz16 h99">￥{{item.price}}</view>
					<m-button title="马上抢>" @handleClick="navToPage(`/pages/home/Spike/detail?id=${item.id}&city_id=${city_id}`)" size="mini"></m-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {navTo,getToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				timestamp: 86400,
				city_id:0
			}
		},
		props:{
			msArr:{
				type:Array,
			}
		},
		created(){
			this.city_id=getToken('city_id')
		},
		methods:{
			navToPage(url){
				navTo(url)
			}
		}
	}
</script>

<style scoped lang="scss">
	.item{
		display: flex;
		background-color: #fff;
		margin-bottom: 10px;
		.icon{
			width: 125px;
			height: 125px;
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
