<template>
	<view class="wrap">
		<view class="list" v-for="item,index in couponData" :key="index">
			<view class="list-left">
				<view class="price h99">
					<text v-if="item.dw!=='折'" class="fz21">￥</text>
					<text class="fz30">{{item.money}}{{item.dw}}</text>
				</view>
				<view class="">
					<view class="name fz15 h1">{{item.name}}</view>
					<view class="fz12 h4">{{item.condition}}</view>
				</view>
			</view>
			<view class="btn">
				<text v-if="item.status==1" class="status_sty" @click="gotoIndex">去使用</text>
				<m-button v-else title="领取" @handleClick="getCouponOne(item.id)" :css="{height: '25px', 'font-size': '12px', 'background-color': '#ff4b34'}"></m-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timestamp: 886400,
				params:{
					city_id:null,
				},
				
				couponData:null
			}
		},
		components: {
		},
		onLoad(option){
			this.params.city_id=option.id
			this.getInfo()
		},
		methods:{
			async getInfo(){
				const { statusCode, data, message } =await this.$u.api.getCouponIndex(this.params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					this.couponData=data.data
				} else {
					this.$toast(data.msg||msg)
				}
			},
			async getCouponOne(id){
				
				const { statusCode, data, message } = await this.$u.api.getCoupon({id:id},true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					this.$toast('领取成功')
					this.getInfo()
				} else {
					this.$toast(data.msg||msg)
				}
			},
			gotoIndex(){
				uni.switchTab({
					url:'/pages/home/index'
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding-top: 10px;
	}
	.list{
		width: 690rpx;
		padding: 15px 15px;
		background-color: #fff;
		border-radius: 10px;
		margin: 0 auto 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.list-left{
			display: flex;
			align-items: center;
			.price{
				width: 220rpx;
				white-space: nowrap;
				font-size: 40rpx;
			}
		}
		.btn{
			width: 60px;
			
		}
	}
</style>
