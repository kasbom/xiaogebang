<template>
	<view class="order--wrap">
		<view class="order-list" v-for="item,i in orderList" :key="i">
			<view class="list-wrap">
				<image v-if="isBus=='1'" :src="item.main_pic"  class="list-icon"></image>
				<image v-else :src="item.imgs||item.img" mode="aspectFill" class="list-icon"></image>
				<view class="list-con">
					<view class="list-con-top">
						<view class="">
							<view class="name fz14 h1">{{isBus=='1'?item.cate_name:item.goods_name}}</view>
							<view class="desc fz12 h3">{{isBus=='1'?item.consignee:item.type_text}}</view>
						</view>
						<view v-if="isBus!='1'" class="status theme-c fz12">{{orderType==2?item.status_text:item.status_text}}</view>
						<view v-else class="status theme-c fz12">{{item.mobile}}</view>
					</view>
					<view v-if="isBus!='1'" class="price fz18 h99">￥{{orderType==2?item.price:item.goods_price}}</view>
					<view v-else class="">{{item.adress}}</view>
				</view>
			</view>
			<view class="btn-wrap">
				<m-button title="去支付" v-if="item.order_status==1" size="mini" hollow @handleClick="toPay(item)" :css="{'margin-left': '10px'}"></m-button>
				<m-button title="联系服务" size="mini" v-if="item.order_status==2" hollow :css="{'margin-left': '10px'}" @handleClick="gotoKF"></m-button>
				<m-button title="订单详情" size="mini" gray hollow :css="{'margin-left': '10px'}" @handleClick="toDetail(item)"></m-button>
				<m-button title="取消" size="mini" v-if="item.order_status==1" gray hollow :css="{'margin-left': '10px'}" @handleClick="cancelOrder(item.id)"></m-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
			
		},
		props:{
			orderList:{
				type:Array,
			},
			orderType:{
				type:Number,
			},
			isBus:{
				type:String,
			}
		},
		methods: {
			toDetail(item) {
				let id=0
				if(this.orderType==2){
					id=item.id
					uni.navigateTo({
						url: `/pages/order/service/serviceDetail?id=${id}&ordertype=${this.orderType}&isBus=${this.isBus}`
					})
				}else {
					id=item.order_id
					uni.navigateTo({
						url: `/pages/order/service/detail?id=${id}&ordertype=${this.orderType}`
					})
				}
				
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
					  				that.$emit('getList')
					  			} else {
					  				that.$toast(message)
					  			}
					  		} else if (res.cancel) {
					  			console.log('用户点击取消')
					  		}
					  	}
					  })
			},
			toContract(){
				
			},
			gotoKF(){
				uni.navigateTo({
					url:"/publicPages/pages/help/webView"
				})
			}
		},
		created(){
			console.log(this.isBus)
		},
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
	}
</style>
