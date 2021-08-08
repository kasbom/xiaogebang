<template>
   <movable-area style="width:60rpx;height:100%;position:fixed;z-index:2;right:0 ;">
		<movable-view :x="x" :y="y" direction="all" >
			<!-- #ifdef APP-PLUS -->
			<view class="kf" @click="gotoKF">
				<image style="width: 100rpx;height: 100rpx;" src="../../../static/images/index/kf.png" mode="aspectFill"></image>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="contact" style="border-radius: 0;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view class="kf">
					<image style="width: 100rpx;height: 100rpx;" src="../../../static/images/index/kf.png" mode="aspectFill"></image>
				</view>
			</button>
			<!-- #endif -->
		</movable-view>
	</movable-area>
	
</template>

<script>
	import {navTo,getToken,goToPage} from '@/utils/common.js'
	export default {
		data() {
			return {
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0
				 }
			}
		},
		created(){
			
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
			gotoKF(){
				uni.navigateTo({
					url:"/publicPages/pages/help/webView"
				})
			},
			
		}
	}
</script>

<style scoped lang="scss">
	// 轮播图
	.kf{
		position: fixed;
		z-index:99999999;
		right: 5px;
		top: 70%!important;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		
	}
</style>
