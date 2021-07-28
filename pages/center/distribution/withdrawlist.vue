<template>
	<view class="wrap">
		<view class="list" v-for="item,index in moneyData" :key="index" >
			<view class="list-left">
				<view class="price h99">
					<view class="price-box">
						<view class="">
							<text class="fz-money mr-10">金额</text>
							<text class="fz-money">：{{item.money}}元</text>
						</view>
						
						<view class="fz14 ">{{item.status_text}}</view>
					</view>
					<view class="fz-money">
					     <text class="mr-10">户名</text>
						 <text>：{{item.account_name}}</text>
						
					</view>
					<view class="fz-money">
						<text class="mr-10">账号</text>
						<text>：{{item.account_bank}}</text>
					</view>
					<view class="fz-money">
						<text class="mr-10">账号类型</text>
						<text>：{{item.bank_name}}</text>
					</view>
					<view class="fz-money">
						<text class="mr-10">提现时间</text>
						<text>：{{item.create_time}}</text>
					</view>
				</view>
				
			</view>
			<!-- <u-cell-group>
				<u-cell-item title="金额" :value="item.money" :arrow="false"></u-cell-item>
				<u-cell-item title="状态" :value="item.status_text" :arrow="false"></u-cell-item>
				<u-cell-item title="户名" :value="item.account_name" :arrow="false"></u-cell-item>
				<u-cell-item title="账号" :value="account_bank" :arrow="false"></u-cell-item>
				<u-cell-item title="账号类型" :value="item.bank_name" :arrow="false"></u-cell-item>
				<u-cell-item title="提现时间" :value="create_time" :arrow="false"></u-cell-item>
			</u-cell-group> -->
		</view>
	</view>
</template>

<script>
	import {navTo,setToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				moneyData:null,
			}
		},
		components: {
		},
		onLoad(){
			this.getInfo()
		},
		
		methods:{
			async getInfo(){
				const { statusCode, data, message } = await this.$u.api.getWithdrawalList({},true)
				if (statusCode === 200&&data.error==0 ) {
					this.moneyData=data.data
				} else {
					this.$toast(data.msg||msg)
				}
			},
			
			
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
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.price{
				width: 100%;
				white-space: nowrap;
				font-size: 40rpx;
				.price-box {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
		.fz-money{
			color: #000000;
			font-size: 28rpx;
		}
		.mr-10{
			display: inline-block;
			min-width: 100rpx;
			text-align: justify;
			text-align-last: justify;
			width: 120rpx;
			margin-right: 10rpx;
		}
	}
</style>
