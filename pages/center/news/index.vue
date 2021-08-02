<template>
	<view class="">
		<view class="wrap" v-for="item,index in newsArr" :key="index">
			<view class="icon">
				<image :src="item.img" class="icon-img" mode=""></image>
			</view>
			<view class="news-wrap">
				<view class="news-top">
					<view class="news-title fz15 h1">
						<text>{{item.category_name}}</text>
					</view>
				</view>
				
				<view class="news-bottom">
					<view class="wenti-name fz15 h1">{{item.content}}</view>
					<view class="wenti-desc fz12 h3">提醒时间: {{item.add_time}}</view>
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
				params:{
					cate_id:null
				},
				newsArr:[]
			}
		},
		onLoad(){
			this.getInfo()
			// #ifdef APP-PLUS
				uni.removeStorageSync('newCount')
				plus.runtime.setBadgeNumber(0)
			// #endif
		},
		
		methods:{
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getNoticeList(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.newsArr=data.data
				} else {
					this.$toast(data.msg||msg)
				}
			}
		}
	}
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
