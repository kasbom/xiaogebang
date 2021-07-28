<template>
	<view class="wrap">
		<u-gap height="20"></u-gap>
		<view class="order-list">
			<view class="list-wrap">
				<image :src="orderDetail.img" mode="aspectFill" class="list-icon"></image>
				<view class="list-con">
					<view class="list-con-top">
						<view class="">
							<view class="name fz14 h1">{{orderDetail.goods_name}}</view>
							<view class="desc fz12 h3">{{orderDetail.type_text}}</view>
						</view>
						<view class="status theme-c fz12">{{orderDetail.status_text}}</view>
					</view>
					<view class="price fz18 h99">￥{{orderDetail.goods_price}}</view>
				</view>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		
		<view class="addr">
			<view class="addr-left">
				<image src="../../../static/images/index/addr.png" class="addr-icon" mode=""></image>
				<view class="">
					<view class="fz16 h1">{{orderDetail.address}}</view>
					<view class="fz13 h2">{{orderDetail.consignee}}  {{orderDetail.mobile}}</view>
				</view>
			</view>
			<!-- <view class="more">
				<u-icon name="arrow-right"></u-icon>
			</view> -->
		</view>
		
		<u-gap height="20"></u-gap>
		<view v-if="orderDetail.order_type==1||orderDetail.order_type==3||orderDetail.order_type==4">
			<u-cell-group>
				<u-cell-item title="服务时间" :value="orderDetail.service_date" :arrow="false"></u-cell-item>
				<u-cell-item title="服务人员" :value="orderDetail.service_name" :arrow="false"></u-cell-item>
				<u-cell-item title="联系电话" :value="orderDetail.service_mobile" @click="toPhone(orderDetail.service_mobile)"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="order-info">
			<view class="order-info-list">
				<view class="order-info-list-label h3 h13">订单编号：</view>
				<view class="fz13 h1">{{orderDetail.order_sn}}</view>
			</view>
			<view class="order-info-list">
				<view class="order-info-list-label h3 h13">下单时间：</view>
				<view class="fz13 h1">{{orderDetail.add_time}}</view>
			</view>
			<view class="order-info-list">
				<view class="order-info-list-label h3 h13">支付方式：</view>
				<view class="fz13 h1">{{orderDetail.pay_name}}</view>
			</view>
			<view class="order-info-list">
				<view class="order-info-list-label h3 h13">支付时间：</view>
				<view class="fz13 h1">{{orderDetail.create_time}}</view>
			</view>
		</view>

		<!-- 费用详情 -->
		<view class="money-wrap">
			<view class="money-list-wrap">
				<view class="money-list">
					<view class="money-list-label fz13 h3">商品总额</view>
					<view class="money-list-value fz13 h1">￥{{orderDetail.goods_price}}</view>
				</view>
				<view class="money-list">
					<view class="money-list-label fz13 h3">优惠</view>
					<view class="money-list-value fz13 h99">-￥{{orderDetail.discount}}</view>
				</view>
				
				<view class="heji-money">
					<view class="fz14 h1">实付款</view>
					<view class="fz15 h99">￥{{orderDetail.total_amount}}</view>
				</view>
			</view>
		</view>
		
		<view class="btn-wrap">
			  <view class="btn" v-if="orderDetail.order_status==1"  @click="toPay(orderDetail)">去支付</view>
			 <view class="btn gray" v-if="orderDetail.order_status==1" @click="cancelOrder(orderDetail.id)">取消</view>
			<!-- <view class="btn gray">确认订单</view> -->
			 <view class="btn"  v-if="orderDetail.order_status==2" @click="gotoKF">联系服务</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					id:null,
				},
				
				orderDetail:{},
			}
		},
		
		onLoad(option){
			this.params.id=option.id
			this.getInfo()
		},
		methods:{
			async getInfo(){
				
				const { statusCode, data, message } = await this.$u.api.getOrderDetail(this.params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					this.orderDetail=data.data
				} else {
					this.$toast(data.msg||msg)
				}
			},
			toPhone(service_mobile){
				uni.makePhoneCall({
				    phoneNumber: service_mobile
				});
			},
			toPay(item){
				uni.navigateTo({
					url: `/pages/order/yuesao/pay?order_id=${item.order_id}&id=${item.id}`
				})
			},
			 cancelOrder(id){
				     let that=this
					  uni.showModal({
					  	title: '提示',
					  	content: '您确定要取消订单吗?',
					  	async success(res){
					  		if (res.confirm) {
					  			const { statusCode, data } = await that.$u.api.cancelOrder({ id:id })
					  			if (statusCode === 200&&data.error==0) {
					  				that.$toast('取消成功')
					  				that.getInfo()
					  			} else {
					  				that.$toast(message)
					  			}
					  		} else if (res.cancel) {
					  			console.log('用户点击取消')
					  		}
					  	}
					  })
			},
			gotoKF(){
				uni.navigateTo({
					url:"/publicPages/pages/help/webView"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding-bottom: 60px;
	}
	.btn-wrap{
		display: flex;
		justify-content: flex-end;
		padding: 10px 15px;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 9;
	}
	.btn{
		height: 30px;
		padding: 0 16px;
		border-radius: 15px;
		border: solid 1px #ff4b34;
		font-size: 13px;
		color: #ff4b34;
		display: flex;
		align-items: center;
		margin-left: 10px;
		&.gray{
			color: #666;
			border: solid 1px #666;
		}
	}
	// 费用相关
	.money-wrap{
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 15px 15px;
		margin-top: 10px;
		.money-list{
			display: flex;
			justify-content: space-between;
			padding: 5px 0;
		}
		.heji-money{
			display: flex;
			justify-content: space-between;
			padding-top: 15px;
		}
	}
	// 订单详情
	.order-info{
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 15px 15px;
		margin-top: 10px;
		.order-info-list{
			display: flex;
			padding: 5px 0;
			.order-info-list-label{
				margin-right: 20px;
			}
		}
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
	
	.addr{
		background-color: #fff;
		padding: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.more{
			flex-shrink: 0;
		}
		.addr-left{
			display: flex;
			align-items: center;
			.addr-icon{
				width: 25px;
				height: 25px;
				margin-right: 10px;
			}
		}
	}
</style>
