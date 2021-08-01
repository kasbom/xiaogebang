<template>
	<view class="">
		<u-navbar
			title="支付订单"
			:background="{'background-color': '#ff6a00'}"
			back-icon-color="#fff"
			title-color="#fff"
			:border-bottom="false"
		></u-navbar>
		
		<view class="title-wrap">
			<image src="../../../static/images/order/c1.png" class="title-icon" mode=""></image>
			<view class="title-h1 fz21">{{show&&show==true?'签约成功':'订单已提交'}}</view>
			<view class="fz15" v-if="show&&show==true">需支付首笔阿姨薪酬以及服务费</view>
		</view>
		
		<!-- 支付方式 -->
		<view class="pay-type">
			<image src="../../../static/images/order/c2.png" class="type-bg" mode=""></image>
			<view class="pay-type-con">
				<u-cell-group :border="false">
					<u-cell-item title="微信" :arrow="false" @click="handleSelectType(1)">
						<!-- #ifdef MP-WEIXIN -->
						<view class="">
							<u-icon name="checkmark-circle-fill" color="#ff4b33" size="30" slot="right-icon" v-if="payType == 1"></u-icon>
							<u-icon name="checkmark-circle" color="#eaeaea" size="30" slot="right-icon" v-else></u-icon>
						</view>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS -->
						<u-icon name="checkmark-circle-fill" color="#ff4b33" size="30" slot="right-icon" v-if="payType == 1"></u-icon>
						<u-icon name="checkmark-circle" color="#eaeaea" size="30" slot="right-icon" v-else></u-icon>
						<!-- #endif -->
					</u-cell-item>
					<!-- #ifdef APP-PLUS -->
					<u-cell-item title="支付宝" :arrow="false" :border-bottom="false" @click="handleSelectType(2)">
						<!-- #ifdef MP-WEIXIN -->
						<!-- <view class="">
							<u-icon name="checkmark-circle-fill" color="#ff4b33" size="30" slot="right-icon" v-if="payType == 2"></u-icon>
							<u-icon name="checkmark-circle" color="#eaeaea" size="30" slot="right-icon" v-else></u-icon>
						</view> -->
						<!-- #endif -->
							<u-icon name="checkmark-circle-fill" color="#ff4b33" size="30" slot="right-icon" v-if="payType == 2"></u-icon>
							<u-icon name="checkmark-circle" color="#eaeaea" size="30" slot="right-icon" v-else></u-icon>
						
					</u-cell-item>
					<!-- #endif -->
				</u-cell-group>
			</view>
		</view>
		
		<view class="submit">
			<u-cell-group :border="false">
				<u-cell-item :title="orderDetail.type_text" :arrow="false" :value="orderDetail.goods_price"></u-cell-item>
				<u-cell-item title="服务费" :arrow="false":value="orderDetail.order_amount"></u-cell-item>
			</u-cell-group>
			
			<view class="submit-con">
				<view class="">
					<text class="fz14 h1">实付：</text>
					<text class="h99 fz18">￥{{orderDetail.price}}</text>
				</view>
				<view class="btn" @click="toPay">立即支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				type: 2,
				params:{
					order_id:0,
					pay_type:1,
					pay_method:1,
				},
				orderDetail:{},
				city_id:'',
				payType:1,
				show:false,
				typeUrl:0,
			}
		},
		onLoad(option){
			this.params.order_id=option.order_id
			this.params.id=option.id
			this.show=option.show
			this.typeUrl=Number(option.type)
			this.city_id=getToken('city_id')
			this.getInfo()
		},
		methods: {
			handleSelectType(type) {
				this.payType = type
				console.log(this.payType)
			},
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getPayOrder({order_id:this.params.order_id,city_id:this.city_id,id:this.params.id},true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.orderDetail=data.data
					
				} else {
					this.$toast(data.msg||msg)
				}
			},
			async toPay(){
				// #ifdef APP-PLUS
				 if(Number(this.payType)==1){
					 this.params.pay_method=1
				 }else{
					 this.params.pay_method=3
				 }
				// #endif
				// #ifdef MP-WEIXIN
				     if(Number(this.payType)==1){
				     	this.params.pay_method=2
				     }else{
				     	// this.params.pay_method=4
				     }
				// #endif
				console.log(this.params)
				const { statusCode, data, message } =  await this.$u.api.payPayment(this.params,true)
				let payTypeStr=Number(this.payType)==1?'wxpay':'alipay'
				console.log(payTypeStr)
				if (statusCode === 200&&data.error==0 ) {
					 let paymentData = data.data
					 // #ifdef APP-PLUS
					   console.log(paymentData)
						uni.requestPayment({
							provider: payTypeStr,//wxpay微信 alipay支付宝
							orderInfo:paymentData,  
							success: function(res) {
								uni.showToast({title: '支付成功'})
								setTimeout(() => {
									if(this.typeUrl==2){
										uni.navigateTo({
											url:'/pages/order/setMeal/index'
										})
									}else if(this.typeUrl==3){
										uni.navigateTo({
											url:'/pages/order/joinGroup/index'
										})
									}else{
										uni.switchTab({
											url:'/pages/order/index'
										})
									}
									
								}, 1500)
							},
							// 参数有问题则抛出错误
							fail: function(err) {
								console.log(err)
								uni.showToast({title: '请支付'})
							},
						})
					 // #endif
					 // #ifdef MP-WEIXIN
					        console.log('微信支付')
							console.log(paymentData)
							if(Number(this.payType)==1){
								uni.requestPayment({
									provider: payTypeStr,//wxpay微信 alipay支付宝
									timeStamp: paymentData.timeStamp,
									nonceStr: paymentData.nonceStr,
									package: paymentData.package,
									signType: paymentData.signType,
									paySign: paymentData.paySign,  
									success: function(res) {
										uni.showToast({title: '支付成功'})
										uni.switchTab({
											url:'/pages/order/index'
										})
									},
									// 参数有问题则抛出错误
									fail: function(err) {
										console.log(err)
										uni.showToast({title: '请支付'})
									},
								})
							}else{
								uni.requestPayment({
									provider: payTypeStr,//wxpay微信 alipay支付宝
									orderInfo:paymentData, 
									success: function(res) {
										uni.showToast({title: '支付成功'})
										uni.switchTab({
											url:'/pages/order/index'
										})
									},
									// 参数有问题则抛出错误
									fail: function(err) {
										console.log(err)
										uni.showToast({title: '请支付'})
									},
								})
							}
							
					 // #endif
					
					
				} else {
					this.$toast(data.msg||msg)
				}
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.submit{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		.submit-con{
			height: 50px;
			padding: 0 16px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.btn{
			width: 220rpx;
			height: 70rpx;
			background-color: #ff6a00;
			border-radius: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 15px;
		}
	}
	// 支付类型
	.pay-type{
		width: 720rpx;
		margin: 0 auto;
		position: relative;
		transform: translateY(-51px);
		.pay-type-con{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			padding: 36rpx 20rpx 0;
			.pay-icon{
				width: 15px;
				height: 15px;
				margin-right: 10px;
			}
		}
		.pay-type-title{
			padding: 10px 0 15px;
		}
		.type-bg{
			width: 100%;
			height: 240rpx;
		}
		/deep/ .u-cell-item-box{
			background-color: rgba(0,0,0,0);
			.u-cell{
				padding: 6px 16px;
			}
		}
	}
	
	.title-wrap{
		background-color: #ff6a00;
		text-align: center;
		padding: 40rpx 0 120rpx;
		color: #fff;
		.title-icon{
			width: 81px;
			height: 61px;
		}
		.title-h1{
			padding: 17px 0 10px;
		}
	}
</style>
