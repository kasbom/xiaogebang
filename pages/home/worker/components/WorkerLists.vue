<template>
	<view class="">
		<view @click="navToPage(item.userId)" class="list" v-for="item,i in listArr" :key="i">
			<view class="left">
				<image :src="item.headPic" mode="aspectFill" class="icon"></image>
				<view class="con">
					<view class="name">
						<text class="fz15 h1 name">{{item.realName}}</text>
						<text class="fz12 h3">{{item.age}}岁</text>
					</view>
					<view class="label-wrap">
						<view class="label">{{item.tags}}</view>
					</view>
				</view>
			</view>
			
			<view class="right">
				<u-icon name="arrow-right" color="#888888"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	let systemInfo = uni.getSystemInfoSync();
	export default {
		data() {
			return {
				statusBarHeight: systemInfo.statusBarHeight + 44
			}
		},
		props:{
			listArr:{
				type:Array
			},
			typeNum:{
				type:Number
			}
			
			
		},
		methods:{
			navToPage(user_id){
				uni.navigateTo({
					url:`/pages/home/worker/detail?type=${this.typeNum}&user_id=${user_id} `
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.list{
		padding: 10px 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		position: relative;
		&::after{
			content: '';
			position: absolute;
			bottom: 0;
			right: 0;
			height: 1px;
			width: 600rpx;
			background-color: #eaeaea;
		}
		.left{
			display: flex;
			align-items: center;
			.name{
				margin-right: 6px;
			}
			.label-wrap{
				display: flex;
				.label{
					height: 15px;
					border-radius: 4px;
					border: solid 1px #dcdcdc;
					font-size: 10px;
					color: #7b7b7b;
				}
			}
		}
		.icon{
			width: 45px;
			height: 45px;
			margin-right: 10px;
		}
	}
</style>
