<template>
	<view class="">
		<view class="form">
			<view class="title">
				<view class="title-label fz15 h1">提现至</view>
				
				<view class="bank-wrap" @click="toCheckBank">
					<view class="fz15 h1 bank-name">{{name}}</view>
					<u-icon name="arrow-right" color="#666"></u-icon>
				</view>
			</view>
			
			<view class="input-wrap">
				<view class="input-title fz14 h1">转出金额</view>
				
				<view class="input-con">
					<view class="danwei">￥</view>
					<u-input :custom-style="{
						'font-size': '36px'
					}"
						placeholder=" "
						type="number"
						v-model="params.money"
					></u-input>
					<view class="input-btn theme-c fz14" @click="params.money = infoMoney.user_money">全部转出</view>
				</view>
			</view>
		</view>
		
		<view class="tip fz12 h3">可提现金额￥{{infoMoney.user_money}}</view>
		
		<view class="btn-wrap">
			<m-button title="确认提现" @handleClick="withdrawal"></m-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				infoMoney: {},
				name:'',
				params:{
					account_id:'',
					money:'',
				}
			}
		},
		methods: {
			// 发起提现
			async withdrawal() {
				if(this.params.account_id==''){
					this.$toast('请选择提现账户')
					return
				}
				debugger
				if(this.params.money<100||this.params.money==''){
					this.$toast('现金额至少100起')
					return
				}
				const { statusCode, data } = await this.$u.api.withdrawal(this.params)
				if (statusCode === 200&&data.error==0 ) {
					this.$toast('提现成功')
					this.$store.dispatch('getUserInfo', this)
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				} else {
					this.$toast(data.data)
				}
			},
			async distribution(){
				const { statusCode, data, message } = await this.$u.api.distribution({},true)
				if (statusCode === 200&&data.error==0 ) {
					this.infoMoney=data.data.info
				} else {
					this.$toast(data.msg||msg)
				}
			},
			toCheckBank(){
				uni.navigateTo({
					url:'/publicPages/pages/bank/index?type=select'
				})
			}
		},
		onShow(){
			uni.$on('handleSelectBank', (res) => {
				 this.name=res.bank_name
				 this.params.account_id=res.id
							
			})
		},
		onLoad(){
			this.distribution()
		},
	}
</script>

<style scoped lang="scss">
	.tip{
		padding: 0 15px;
	}
	
	.btn-wrap{
		padding: 30px 15px;
	}
	
	.form{
		background-color: #fff;
		margin: 10px 0 20px;
		
		.input-wrap{
			padding: 20px 15px;
			.input-con{
				display: flex;
				align-items: center;
				padding: 15px 0 0;
			}
			.danwei{
				font-size: 36px;
			}
		}
		
		.title{
			display: flex;
			padding: 0 15px;
			height: 55px;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1px #e6e6e6;
			.title-label{
				padding-right: 20px;
			}
			.bank-wrap{
				display: flex;
				align-items: center;
			}
			.bank-icon{
				width: 28px;
				height: 28px;
				border-radius: 50%;
			}
			.bank-name{
				margin: 0 25px 0 6px;
			}
		}
	}
</style>
