<template>
		<view class="wrap" >
			<view class="title">
				<u-section :show-line="false" title="优惠套餐" font-size="36" color="#333" :right="false"></u-section>
			</view>
			
			<view>
				<swiper class="swiper" next-margin="170rpx">
					<swiper-item v-for="item,i in serviceListArr" :key="i" @click="navToPageFunc(item)">
						<view class="item yh-item">
							<image :src="item.img" class="item-img" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
</template>

<script>
	import {navTo,getToken,goToPage} from '@/utils/common.js'
	export default {
		data() {
			return {
				timestamp: 86400,
				city_id:0
			}
		},
		props:{
			serviceListArr:{
				type:Array,
			},
		},
		created(){
			this.city_id=getToken('city_id')
		},
		methods:{
			navToPageFunc(item){
				goToPage(item,this.city_id)
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		background-color: #fff;
		padding: 0 30rpx;
		.title{
			padding: 10px 0;
		}
		.yh-item{
			.item-img{
				width: 100%;
				height: 100%;
			}
		}
		.item{
			width: 500rpx;
	        /* #ifdef APP-PLUS */
			height: 240rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			height: 280rpx;
			/* #endif */
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;
			background-color: #f5f5f5;
			.item-con{
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				padding: 32rpx;
			}
			.item-desc{
				margin: 2px 0;
			}
			.price-wrap{
				color: #ff4b34;
				display: flex;
			}
			.btn{
				margin-top: 4px;
			}
		}
	}
</style>
