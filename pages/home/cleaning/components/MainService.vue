<template>
	<view class="">
		<view class="item">
			<image :src="mainServiceObj.img" class="item-icon" mode="aspectFill"></image>
			<view class="item-con">
				<view class="left">
					<!-- <view class="name fz15 h1">{{mainServiceObj.serviceName}}</view>
					<view class="price-wrap">
						<view class="">￥{{mainServiceObj.price}}</view>
						<view class="del-price fz10 h4">￥{{mainServiceObj.price}}</view>
					</view> -->
				</view>
				
				<view class="btn">
					<m-button title="立即预约" @handleClick="navToPage(mainServiceObj)" size="mini" :css="{'border-radius': '27px', height: '27px'}"></m-button>
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
			mainServiceObj:{
				type:Object,
			}
		},
		created(){
			this.city_id=getToken('city_id')
		},
		methods:{
			navToPage(obj){
				let url=''
				if(obj.linkType==3){
					url=`/pages/home/JoinGroup/detail?id=${obj.linkId}&city_id=${this.city_id}`
				}else if(obj.linkType==4){
					url=`/pages/home/Spike/detail?id=${obj.linkId}&city_id=${this.city_id}`
				}else if(obj.linkType==1){
					url=`/pages/home/cleaning/detail?id=${obj.linkId}&city_id=${this.city_id}`
				}else if(obj.linkType==2){
					url=`/pages/home/SetMeal/detail?id=${obj.linkId}&city_id=${this.city_id}`
				}
				navTo(url)
			}
		}
	}
</script>

<style scoped lang="scss">
	.item{
		width: 690rpx;
		border-radius: 10rpx;
		background-color: #fff;
		margin: 0 auto 10px;
		.item-con{
			padding: 10px 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.item-icon{
			width: 100%;
			height: 290rpx;
		}
		.price-wrap{
			color: #ff4b34;
			display: flex;
		}
	}
</style>
