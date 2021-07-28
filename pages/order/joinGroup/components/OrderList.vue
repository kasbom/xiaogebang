<template>
	<view class="order--wrap">
		<view class="order-list"  v-for="item,index in orderList" :key="index">
			<view class="" @click="toDetail(item.guid)">
				<view class="list-title" >
					<view class="fz14 h1">拼团ID号：{{typeStr=='1'?item.group_id:item.join_id}}</view>
					<view class="time-down">
						<text class="fz12 h3">剩余时间：</text>
						<u-count-down
							:timestamp="item.sy_time"
							:show-days="true"
							:show-minutes="true"
							:show-seconds="true"
							separator="zn"
							font-size="26"
							color="#ff4b34"
							separator-color="#ff4b34"
						></u-count-down>
					</view>
				</view>
				
				<view class="list-wrap">
					<image :src="item.main_pic" mode="aspectFill" class="list-icon"></image>
					<view class="list-con">
						<view class="list-con-top">
							<view class="">
								<view class="name fz14 h1">{{item.good_name}}</view>
								<view class="desc fz12 h3">{{item.guide}}</view>
							</view>
						</view>
						<view class="price fz18 h99">￥{{item.goods_price}}</view>
					</view>
					<view class="price fz12 h99">{{item.status_text}}</view>
				</view>
				
				<view class="tip fz14">
					已有<text class="theme-c">{{item.order_num}}</text>人参团   还需<text class="theme-c">{{item.sy_nums}}</text>人参团
					
				</view>
			</view>
			<view class="btn-wrap">
				<!-- #ifdef APP-PLUS -->
				<m-button title="邀请好友参团" size="mini" @handleClick="toJoin(item)"  :css="{'margin-left': '10px', width: '100px'}"></m-button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button  size="mini" class="wx-share" open-type="share">邀请好友参团</button>
				<!-- #endif -->
				<m-button  title="再次开团" @handleClick="againTo(item)" size="mini" hollow :css="{'margin-left': '10px'}"></m-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {shareWXChat,getToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				timestamp: 86400,
				shareData: {
				}
			}
		},
		props:{
			orderList:{
				type:Array
			},
			typeStr:{
				type:String,
			}
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/order/joinGroup/detail?id='+id
				})
			},
			againTo(item){
				let id=this.typeStr=='1'?item.group_id:item.join_id
				uni.navigateTo({
					url: '/pages/order/joinGroup/detail?id='+id
				})
			},
			async toJoinWx(){
				let inv_id=getToken('inv_id')
				const { statusCode, data, message } = await this.$u.api.wxShare({},true)
				if (statusCode === 200&&data.error==0 ) {
					let dataReq=data.data
					let obj={
							path:'/pages/login/getCode',
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
			      
		   async wxToShare(){
				const { statusCode, data, message } = await this.$u.api.wxShare({},true)
				if (statusCode === 200&&data.error==0 ) {
					
				} else {
					this.$toast(data.msg||msg)
				}
			},
			async toJoin(item){
				const { statusCode, data, message } = await this.$u.api.wxShare({},true)
				if (statusCode === 200&&data.error==0 ) {
					let dataReq=data.data
					console.log(dataReq)
					let obj={}
					// #ifdef MP-WEIXIN
						obj={
							path: `/pages/order/joinGroup/detail?id=${item.id}`,
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
	.order-list{
		padding: 15px;
		background-color: #fff;
		border-radius: 20rpx;
		.list-wrap{
			display: flex;
			.list-icon{
				width: 105px;
				height: 75px;
				flex-shrink: 0;
			}
		}
		.list-con{
			padding-left: 10px;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.list-con-top{
			flex: 1;
			display: flex;
			justify-content: space-between;
		}
		.btn-wrap{
			display: flex;
			justify-content: flex-end;
			padding-top: 10px;
		}
		
		.list-title{
			padding-bottom: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.tip{
			text-align: right;
			padding-top: 10px;
		}
		/* #ifdef MP-WEIXIN */
		/deep/.uni-input-input{padding: 0;margin: 0;}
		/deep/.uni-input-input::after{ border: none; }
		.wx-share {
			font-size: 13px;
			background: #ff6a00;
			color: #ffffff;
			line-height: 48rpx;
			padding: 0 10rpx;
			display: inline-block;
			margin-right: 20rpx;
			border-radius: 2px;
			
		}
		/* #endif */
		
	}
</style>
