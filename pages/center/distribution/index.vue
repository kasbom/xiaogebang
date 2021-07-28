<template>
	<view class="">
		<u-navbar  :border-bottom="false" :background="background" title-color="#fff"
			back-icon-color="#fff">
			<view  slot="right">
				<view class="nav-right" @click="toBank">
					银行卡管理
				</view>
			</view>
		</u-navbar>

		<view class="user-info">
			<view class="box">
				<view class="home_top"></view>
			</view>
			<view class="money-wrap">
				<image src="../../../static/images/center/user-bg.png" class="money-bg" mode=""></image>
				<view class="money-con">
					<view class="money-con-list">
						<view class="money-con-list-text">
							<view>
								<text class="fz19">￥</text>
								<text>{{infoMoney.user_money||0}}</text>
							</view>
							<view class="label" @click="toWithdraw(1)">提现</view>
						</view>
						<view class="fz14 h2">当前佣金收入</view>
					</view>
					 
					<view class="money-con-list" @click="toWithdraw(2)">
						<view class="money-con-list-text">
							<view>
								<text class="fz19">￥</text>
								<text>{{infoMoney.cumulative||0}}</text>
							</view>
						</view>
						<view class="fz14 h2">累计提现佣金</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="list-wrap">
			<view class="list" v-for="item,index in logs">
				<view class="list-left">
					<image :src="item.img" class="list-icon" mode=""></image>
					<view class="">
						<view class="fz15 h1">{{item.goods_name}}</view>
						<u-gap height="10"></u-gap>
						<view class="fz12 h3">{{item.mobile}}</view>
					</view>
				</view>
				<view>
					<view class="fz13 h99">赚￥{{item.number}}</view>
					<u-gap height="10"></u-gap>
					<view class="fz12 h3">{{item.add_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					background: 'linear-gradient(to right, #ff9200 , #ff7200)'
				},
				infoMoney:{},
				logs:[]
			}
		},
		onLoad(){
			this.distribution()
		},
		methods: {
			toWithdraw(type) {
				if(type==1){
					uni.navigateTo({
						url: '/pages/center/distribution/withdraw'
					})
				}else{
					uni.navigateTo({
						url: '/pages/center/distribution/withdrawlist'
					})
				}
				
			},
			
			async distribution(){
				const { statusCode, data, message } = await this.$u.api.distribution({},true)
				if (statusCode === 200&&data.error==0 ) {
					this.infoMoney=data.data.info
					let  userInfo = this.$store.state.userInfo
					this.logs=data.data.logs
				} else {
					this.$toast(data.msg||msg)
				}
			},
			toBank(){
				uni.navigateTo({
					url:'/publicPages/pages/bank/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-wrap{
		padding: 70px 15px 20px;
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 15px 15px;
			border-radius: 6px;
		}
		.list-left{
			display: flex;
			align-items: center;
		}
		.list-icon{
			width: 77px;
			height: 50px;
			border-radius: 5px;
			margin-right: 10px;
		}
	}
	
	.money-wrap{
		width: 722rpx;
		height: 252rpx;
		margin: 0 auto;
		position: absolute;
		left: 50%;
		top: 120rpx;
		transform: translateX(-50%);
		.money-bg{
			width: 100%;
			height: 100%;
		}
		.money-con{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			display: flex;
			.money-con-list{
				width: 50%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.money-con-list-text{
				font-size: 28px;
				display: flex;
				align-items: center;
			}
			.label{
				width: 40px;
				height: 19px;
				background-color: #ff6a00;
				border-radius: 19px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 11px;
				color: #fff;
				margin-left: 10px;
			}
		}
	}
	
	.box {
		width: 100%;
		margin: auto;
		overflow: hidden;
	}

	.home_top {
		position: relative;
		width: 100%;
		height: 100px;
		text-align: center;
		line-height: 50px;
	}

	.home_top:after {
		width: 140%;
		height: 100px;
		position: absolute;
		left: -20%;
		top: 0;
		content: '';
		border-radius: 0 0 50% 50%;
		background: linear-gradient(to right, #ff9200 , #ff7200);
	}
	.nav-right {
		margin-right: 20px;
		color: rgb(255, 255, 255);
		font-size: 30rpx;
	}
</style>
