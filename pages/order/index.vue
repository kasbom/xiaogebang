<template>
	<view class="" style="position: relative;">
		<kfBtn></kfBtn>
		<u-gap height="20"></u-gap>

		<view class="classification">
			<view class="title">
				<u-section title="我的订单" :show-line="false" sub-title="全部订单" @click="toServiceOrder(0)"></u-section>
			</view>
			<u-grid :col="5" :border="false">
				<u-grid-item class="classification-list-box">
					<view class="classification-list"  @click="toServiceOrder(1)">
						<image src="../../static/images/order/a1.png" class="list-img list-img-1" mode=""></image>
						<view class="list-text">待支付</view>
					</view>
					<text class="tips-num" v-if="numObj.nopay>0">{{numObj.nopay}}</text>
				</u-grid-item>
				<u-grid-item class="classification-list-box">
					<view class="classification-list"  @click="toServiceOrder(2)">
						<image src="../../static/images/order/a4.png" class="list-img list-img-1" mode=""></image>
						<view class="list-text">已支付</view>
					</view>
					<text class="tips-num" v-if="numObj.ispay>0">{{numObj.ispay}}</text>
				</u-grid-item>
				<u-grid-item class="classification-list-box">
					<view class="classification-list"  @click="toServiceOrder(99)">
						<image src="../../static/images/order/a2.png" class="list-img list-img-1" mode=""></image>
						<view class="list-text">待服务</view>
					</view>
					<text class="tips-num" v-if="numObj.d_service>0">{{numObj.d_service}}</text>
				</u-grid-item>
				<u-grid-item class="classification-list-box">
					<view class="classification-list"  @click="toServiceOrder(3)">
						<image src="../../static/images/order/a3.png" class="list-img list-img-1" mode=""></image>
						<view class="list-text">已取消</view>
					</view>
					<text class="tips-num" v-if="numObj.cancel>0">{{numObj.cancel}}</text>
				</u-grid-item>
				
				<u-grid-item class="classification-list-box">
					<view class="classification-list"  @click="toServiceOrder(4)">
						<image src="../../static/images/order/a5.png" class="list-img list-img-1" mode=""></image>
						<view class="list-text">已完成</view>
					</view>
					<text class="tips-num" v-if="numObj.finsh>0">{{numObj.finsh}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		
		<view class="classification classification-box">
			<view class="title">
				<u-section title="工具与服务" :show-line="false" :right="false"></u-section>
			</view>
			<u-grid :col="5" :border="false">
				<u-grid-item>
					<view class="classification-list" @click="toPage('/pages/order/setMeal/index')">
						<image src="../../static/images/order/b1.png" class="list-img" mode=""></image>
						<view class="list-text">套餐订单</view>
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="classification-list" @click="toPage('/pages/order/joinGroup/index')">
						<image src="../../static/images/order/b2.png" class="list-img" mode=""></image>
						<view class="list-text">拼团订单</view>
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="classification-list" @click="toPage('/pages/order/yuesao/index?type=1')">
						<image src="../../static/images/order/b3.png" class="list-img" mode=""></image>
						<view class="list-text">保姆订单</view>
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="classification-list" @click="toPage('/pages/order/yuesao/index?type=2')">
						<image src="../../static/images/order/b4.png" class="list-img" mode=""></image>
						<view class="list-text">月嫂订单</view>
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="classification-list" @click="toServiceOrder(99)">
						<image src="../../static/images/order/b5.png" class="list-img" mode=""></image>
						<view class="list-text">预约订单</view>
					</view>
				</u-grid-item>
				<u-grid-item>
					<view class="classification-list" @click="toServiceOrder(99,1)">
						<image src="../../static/images/order/b6.png" class="list-img" mode=""></image>
						<view class="list-text">商家订单</view>
					</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	import kfBtn from '../home/components/kfBtn.vue'
	export default {
		components: {
			kfBtn,
		},
		data() {
			return {
              numObj:{}
			}
		},
		onLoad(){
			this.getInfo()
		},
		methods: {
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getOrderTJ({},true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.numObj=data.data
					console.log(this.numObj)
					
				} else {
					this.$toast(data.msg||msg)
				}
			},
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			toServiceOrder(status,type) {
				if(status==99){
					let isBus=0
					if(type&&type==1)isBus=1
					uni.navigateTo({
						url: '/pages/order/service/serviceIndex?status=0&isBus='+isBus
					})
				}else{
					uni.navigateTo({
						url: '/pages/order/service/index?status='+status
					})
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	// 分类
	.classification{
		background-color: #fff;
		padding: 15px 15px 0;
		width: 690rpx;
		margin: 0 auto 10px;
		border-radius: 10px;
		.classification-list-box {
			
			.classification-list{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.tips-num {
				padding: 0px 6px;
				border-radius: 50%;
				color: #fff;
				position: absolute;
				top: 5px;
				right: 10px;
				background-color: red;
			}
		}
		.list-img{
			width: 30px;
			height: 30px;
			margin-bottom: 10px;
		}
		.list-img-1{
			width: 24px;
			height: 24px;
		}
		.list-text{
			color: #333;
			font-size: 12px;
		}
		
	}
	.classification-box {
		/deep/.u-grid-item {
			width: 33.3%!important;
		}
	}
</style>
