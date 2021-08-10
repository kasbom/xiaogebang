<template>
	<view class="">
		<view class="item" v-for="item,i in groupArr" :key="i" @click="navToPage(typeService=='groupStr'?`/pages/home/JoinGroup/detail?id=${item.id}&city_id=${city_id}`:`/pages/home/Spike/detail?id=${item.id}&city_id=${city_id}`)">
			<image :src="item.thumb" class="icon" mode="aspectFill"></image>
			<view class="item-con">
				<view class="item-name">
					<view class="fz16 h1">{{item.serviceName}}</view>
					<view class="fz16 h1">{{item.cateName}}</view>
				</view>
				
				<view class="fz12 h99 price">￥{{item.price}}</view>
				<view class="pri-btn">
					<view class="fz16 h3 del">￥{{item.yprice}}</view>
					<m-button :title="typeService=='groupStr'?'去拼团':'去抢购'" @handleClick="navToPage(typeService=='groupStr'?`/pages/home/JoinGroup/detail?id=${item.id}&city_id=${city_id}`:`/pages/home/Spike/detail?id=${item.id}&city_id=${city_id}`)" size="mini"></m-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {navTo,getToken,getQueryVariable} from '@/utils/common.js'
	export default {
		data() {
			return {
				timestamp: 86400,
				city_id:0
			}
		},
		props:{
			groupArr:{
				type:Array,
			},
			typeService:{
				type:String,
			}
		},
		created(){
			this.city_id=getToken('city_id')
		},
		methods:{
			navToPage(url){
				let newObj= getQueryVariable(url)
				let id=newObj["id"]
				let cityid= newObj["city_id"]
				if(id==''||cityid==''||!id||!cityid){
					this.$toast('未选择城市，请重新选择!')
					return 
				}
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
			width: 240rpx;
			height: 240rpx;
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
		.price{
			 margin-top: 36rpx;
		}
	}
</style>
