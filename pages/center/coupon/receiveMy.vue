<template>
	<view class="wrap">
		<view class="list" v-for="item,index in couponData" :key="index" @click="handleClickCoupList(item)">
			<view class="list-left">
				<view class="price h99">
					<text class="fz21" v-if="item.type==1">￥</text>
					<text class="fz30">{{item.money}}</text>
				</view>
				<view class="">
					<view class="name fz15 h1">{{item.name}}</view>
					<view class="fz12 h4">{{item.start_time}}~{{item.end_time}}</view>
				</view>
			</view>
			<view class="btn">
				
				<view v-if="item.status==2"  class="name fz15 h1 status_sty coup_sty" @click="gotoIndex">{{item.status==2?'去使用':item.statusText}}</view>
				<m-button v-if="item.status==1" class="coup_sty" title="去使用" @handleClick="getCouponOne(item.id)" :css="{height: '25px', 'font-size': '12px', 'background-color': '#ff4b34'}"></m-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {navTo,setToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				timestamp: 886400,
				params:{
					city_id:null,
				},
				paramsInfo:{
					status:1,
				},
				couponData:null,
				isSelect:false
			}
		},
		components: {
		},
		onLoad(option){
			this.params.city_id=option.id
			this.isSelect=option.type=== 'select'?true:false
			this.getInfo()
		},
		
		methods:{
			async getInfo(){
				const { statusCode, data, message } =this.params.city_id&&this.params.city_id!=null?
				     await this.$u.api.getCouponIndex(this.params,true,{'content-type': 'application/x-www-form-urlencoded'}):
					 await this.$u.api.getCouponList(this.paramsInfo,true)
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
				} else {
					this.$toast(data.msg||msg)
				}
			},
			// 选择地址
			handleClickCoupList(item) {
				if (!this.isSelect) return
				setToken('handleSelectCoup',item)
				uni.navigateBack()
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
		z-index: 999;
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
		.coup_sty {
			margin-left: 4rpx;
		}
	}
</style>
