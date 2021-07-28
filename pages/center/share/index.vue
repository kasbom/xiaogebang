<template>
	<view class="wrap">
		<image
			src="../../../static/images/center/c1.png"
			mode="aspectFill"
			:style="{height: height + 'px', width: width + 'px'}"
		></image>
		
		<view class="content">
			<view class="title fz18">邀请好友记录</view>
			
			<view class="item-wrap" >
				<view class="item-title">
					<view class="item-title-list item-title-list-1">好友手机号</view>
					<view class="item-title-list item-title-list-2">注册时间</view>
				</view>
				
				<scroll-view scroll-y="true" class="scroll-view">
					<view>
						<view class="item" v-for="item,index in userArr" :key="index">
							<view class="item-list item-list-1">{{item.mobile}}</view>
							<view class="item-list item-list-2">{{item.reg_time}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="btn-wrap">
			<!-- #ifdef APP-PLUS -->
			<m-button class="wx-share"  title="邀请好友" size="max" @handleClick="toJoin"></m-button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button  size="default" class="wx-share" open-type="share">邀请好友</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import {shareWXChat,getToken} from '@/utils/common.js'
	import { shareMixins} from '@/mixins/share'
	export default {
		data() {
			return {
				height: '',
				width: '',
				userArr:[],
				shareData: {
				}
			}
		},
		onLoad() {
			const systemInfo = getApp().globalData.systemInfo
			this.height = systemInfo.screenHeight
			this.width = systemInfo.screenWidth
			this.getInfo()
		},
		methods:{
			async getInfo(){
				const { statusCode, data, message } = await this.$u.api.getSubordinateList({},true)
				if (statusCode === 200&&data.error==0 ) {
					this.userArr=data.data
				} else {
					this.$toast(data.msg||msg)
				}
			},
			async toJoinWx(){
				let inv_id=getToken('inv_id')
				const { statusCode, data, message } = await this.$u.api.wxShare({},true)
				if (statusCode === 200&&data.error==0 ) {
					let dataReq=data.data
					let obj={
							path:'/pages/login/getCode?inv_id'+inv_id,
							title: dataReq.title,
							imageUrl:dataReq.img,
							content:dataReq.content,
						}
						this.shareData=obj
						return this.shareData
					
				} else {
					this.$toast(data.msg||msg)
				}
				
			},
			onShareAppMessage(event) {
					let shareData=this.toJoinWx()
					return shareData
				},
			        
			async toJoin(){
				const { statusCode, data, message } = await this.$u.api.wxShare({},true)
				if (statusCode === 200&&data.error==0 ) {
					let dataReq=data.data
					let obj={}
					// #ifdef MP-WEIXIN
						obj={
							path:dataReq.url,
							title: dataReq.title,
							imageUrl:dataReq.img,
							webUrl:dataReq.url,
						}
					// #endif
					// #ifdef APP-PLUS
						obj={
							href: dataReq.url,
							title: dataReq.title,
							summary:dataReq.content,
							imageUrl:dataReq.img,
						}
					// #endif
					shareWXChat(obj).then(res=>{
									  console.log(res)
					})
				} else {
					this.$toast(data.msg||msg)
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn-wrap{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		/deep/ .m-button {
			
		}
	}
	.wx-share {
		background-color:#3975F7 ;
		border: none;
		border-radius: 0;
		color: #ffffff;
	}
	.wrap{
		position: relative;
		.scroll-view{
			height: 400rpx;
			background-color: #fff;
		}
		.content{
			position: absolute;
			top: 400rpx;
			left: 50%;
			transform: translateX(-50%);
			color: #fff;
			width: 690rpx;
		}
		.title{
			text-align: center;
			padding-bottom: 10px;
		}
		.item-wrap{
			border-radius: 20rpx;
			overflow: hidden;
		}
		.item{
			display: flex;
			margin-bottom: 2rpx;
			.item-list{
				width: 50%;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #535353;
				&.item-list-1{
					background-color: #ebedff;
				}
				&.item-list-2{
					background-color: #f2f3ff;
				}
			}
		}
		.item-title{
			display: flex;
			width: 100%;
			.item-title-list{
				width: 50%;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				&.item-title-list-1{
					background-color: #6d7bff;
				}
				&.item-title-list-2{
					background-color: #bac1ff;
				}
			}
		}
	}
</style>
