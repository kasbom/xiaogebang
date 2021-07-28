<template>
	<view>
		<u-gap height="20"></u-gap>
		<view class="order-list">
			<view class="list-wrap">
				<image :src="infoDetail.main_pic" mode="aspectFill" class="list-icon"></image>
				<view class="list-con">
					<view class="list-con-top">
						<view class="">
							<view class="name fz14 h1">{{infoDetail.name}}</view>
							<view class="desc fz12 h3">{{infoDetail.guide}}</view>
						</view>
						<view class="status theme-c fz12">{{infoDetail.status_text}}</view>
					</view>
					<view class="price fz18 h99">￥{{infoDetail.goods_price}}</view>
				</view>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		
		<view class="list-wrap">
			<view class="tip fz14 h1">
				已有<text class="theme-c">{{infoDetail.order_num}}</text>人参团  还需<text class="theme-c">{{infoDetail.sy_nums}}</text>人参团，仅剩
				<u-count-down
					:timestamp="infoDetail.sy_time"
					:show-days="true"
					:show-minutes="true"
					:show-seconds="true"
					separator="zn"
					font-size="26"
					color="#ff4b34"
					separator-color="#ff4b34"
				></u-count-down>
			</view>
			<!-- <view class="tip tip-1">平团成功</view> -->
			
			<view class="image-wrap" v-if="usersArr.length>0"  v-for="item,index in usersArr" :key="index">
				<image :src="item.head_pic" mode="aspectFill" class="image"></image>
			</view>
			
			<view class="btn-wrap">
				<!-- #ifdef APP-PLUS -->
				<u-button type="primary" @click="toJoin(params)" >邀请好友参团</u-button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button  size="mini" class="wx-share" open-type="share">邀请好友参团</button>
				<!-- #endif -->
				<!-- <u-button type="primary">再次开团</u-button> -->
			</view>
		</view>
		
		<u-gap height="20"></u-gap>
		<view class="tip-wrap">
			<view class="tip-title fz15 h1">拼团流程</view>
			
			<view class="tip-list fz14 h2">1、开团或者参团</view>
			<view class="tip-list fz14 h2">2、邀请好友拼团</view>
			<view class="tip-list fz14 h2">3、人满成交订单</view>
			<view class="tip-list fz14 h2">4、到期自动退</view>
		</view>
	</view>
</template>

<script>
	import {shareWXChat,getToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				/**
				 * 轮播图相关
				 */
				list: [],
				tagsArr:[],
				selectArr:[],
				params:{
					id:0,
				},
				infoDetail:{},
				usersArr:[],
				shareData: {
				}
			}
		},
		onLoad(option){
			this.params.id=option.id
			this.getInfo()
		},
		methods: {
			
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getMyGroupDetail(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.infoDetail=data.data
					this.usersArr=this.infoDetail.users
					
				} else {
					this.$toast(data.msg||msg)
				}
			},
			async toJoinWx(){
				let inv_id = getToken('inv_id')
				const { statusCode, data, message } = await this.$u.api.wxShare({},true)
				if (statusCode === 200&&data.error==0 ) {
					let dataReq=data.data
					let obj={
							path:'/pages/login/getCode?inv_id='+inv_id,
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
	.tip-wrap{
		background-color: #fff;
		padding: 12px 15px;
		.tip-title{
			padding-bottom: 12px;
		}
	}
	.list-wrap{
		background-color: #fff;
		text-align: center;
		.tip{
			padding: 20px 0;
		}
		.tip-1{
			color: #57be6a;
		}
		.image-wrap{
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			padding: 0 30px;
			.image{
				width: 45px;
				height: 45px;
				border-radius: 50%;
				margin: 0 5px;
			}
		}
		.btn-wrap{
			padding: 20px 0;
		}
		/deep/ .u-btn{
			&.u-btn--primary{
				width: 300px;
				height: 40px;
				background-color: #ff6a00;
				border-radius: 40px;
			}
		}
	}
	
	.wx-share {
		display: inline-block;
		background: #ff6a00;
		color: #ffffff;
	}
	.order-list{
		padding: 15px;
		background-color: #fff;
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
	}
</style>
