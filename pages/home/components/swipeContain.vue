<template>
	<view class="wrap">
		<view class="banner-wrap">
			 <video v-if="list.length==1&&list[0].video&&list[0].video!=''" style="width: 100%;" id="myVideo" :src="list[0].video"
				        @error="videoErrorCallback" controls></video>
			<u-swiper v-else :list="list" @click="swipeClick" img-mode="aspectFill" height="320"></u-swiper>
		</view>
	</view>
</template>

<script>
	import {navTo,getToken,goToPage} from '@/utils/common.js'
	export default {
		data() {
			return {
				city_id:null,
			}
		},
		created(){
			this.city_id=getToken('city_id')
		},
		props:{
			list:{
				type:Array,
				default () {
				  return []
				}
			},
		},
		methods:{
			swipeClick(index){
				// likeType: 链接类型：  1 普通购买服务  2 套餐 3 秒杀 4 套餐 5 文档
               // linkId :  连接ID ，在打开详情的时候，记得带上city_id
				let item=this.list[index]
				goToPage(item,this.city_id)
				
				
			},
			videoErrorCallback(err){
				console.log(err)
			},
		}
	}
</script>

<style scoped lang="scss">
	// 轮播图
	.banner-wrap{
		padding: 10px 30rpx;
		margin: 0 auto;
		background-color: #fff;
	}
</style>
