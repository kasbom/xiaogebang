<template>
	<view class="wrap">
		<view class="list">
			<u-input v-model="formData.name" height="88" type="text" placeholder="请输入银行卡姓名"/>
		</view>
		
		<view class="list ">
			<u-input v-model="formData.account" height="88" type="number" placeholder="请输入银行卡卡号"/>
		</view>
		
		
		<view class="list last-list" >
			<u-input v-model="bankName" height="88" disabled type="text" placeholder="请选择银行类型"/>
			<view class="icon-wrap">
				<u-icon name="arrow-right" color="#858585"></u-icon>
			</view>
			
			<view class="mask" @click="show = true"></view>
		</view>
		
		<view class="btn-wrap">
			<m-button title="保存银行卡" @handleClick="saveAccount"></m-button>
		</view>
		
		<!-- 银行选择 -->
		<u-select v-model="show" :list="bankLists" @confirm="handleSelectBank"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				show: false,
				bankLists: [],
				bankName: '', // 已选银行卡名字
				formData: {
					name: '',//户名
					account: '',//账号
					bank_id: '',//银行ID
					id:'',
				},
				params:null,
			}
		},
		onLoad(option) {
			this.params=JSON.parse(option.params)
			this.formData.name=this.params.name
			this.formData.account=this.params.bank_account
			this.formData.id=this.params.id
			this.formData.bank_id=this.params.bank_id
			this.bankName=this.params.bank_name
			this.getBankList()
		},
		methods: {
			// 添加银行卡
			async saveAccount() {
					const params = {
						...this.formData
					}
					const { statusCode, data } = await this.$u.api.saveAccount(params)
					if (statusCode === 200&&data.error==0 ){
						this.$toast('添加成功')
						setTimeout(() => {
							uni.navigateBack()
						}, 1000)
					} else {
						this.$toast(data.msg)
					}
			},
			// 获取可选银行列表
			async getBankList() {
				const { statusCode, data } = await this.$u.api.getBankList()
				if (statusCode === 200&&data.error==0 ) {
					this.bankLists = data.data.map(item => ({
						label: item.bank_name,
						value: item.id
					}))
				}
			},
			// 选择银行卡
			handleSelectBank(e) {
				const item = e[0]
				this.bankName = item.label
				this.formData.bank_id = item.value
			},
		},
	}
</script>

<style scoped lang="scss">
	/deep/ .uni-scroll-view{
		background-color: #fff;
	}
	.wrap{
		margin: 10px auto;
		.btn-wrap{
			width: 120px;
			margin: 60px auto 0;
		}
		.list{
			border-bottom: 1px solid #eaeaea;
			background-color: #fff;
			padding: 0 12px;
			position: relative;
			.icon-wrap{
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%);
			}
			.mask{
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				top: 0;
				z-index: 9;
			}
			&.last-list{
				border-bottom: 0;
			}
		}
	}
</style>
