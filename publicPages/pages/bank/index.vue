<template>
	<view class="wrap">
		<u-cell-group>
			<u-cell-item
				:title="bank.bank_name"
				:label="bank.bank_account"
				:arrow="false"
				v-for="bank in accountList"
				:key="bank.id"
				@click="checkBank(bank)"
			>
				<image src="../../static/images/bank.png" class="icon" slot="icon" mode=""></image>
				<view class="more-btn" slot="right-icon" @click.stop="handleMore(bank)">
					<u-icon name="more-dot-fill"></u-icon>
				</view>
			</u-cell-item>
		</u-cell-group>
		
		<m-none title="暂无银行卡" v-if="!accountList.length"/>
		
		<view class="btn-wrap" >
			<m-button @handleClick="toAddBank" title="添加银行卡" size="max"></m-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountList: [],
				isSelect: false,
			}
		},
		onLoad({type}){
			this.isSelect = type === 'select'
		},
		onShow() {
			this.getAccountList()
		},
		methods: {
			// 获取可用账户列表
			async getAccountList() {
				const { statusCode, data } = await this.$u.api.getAccountList()
				if (statusCode === 200&&data.error==0 ){
					this.accountList = data.data
				}
			},
			// 删除账户
			async deleteAccount(id, index) {
				const { statusCode, data } = await this.$u.api.deleteAccount({ id })
				if (statusCode === 200 && data.error==0) {
					this.$toast('删除成功')
					this.accountList.splice(index, 1)
				} else {
					this.$toast(data.msg)
				}
			},
			handleMore(bank) {
				uni.navigateTo({
				  url: '/publicPages/pages/bank/addBankCard?params=' + JSON.stringify(bank)
				})
			},
			// 去添加银行卡
			toAddBank() {
				uni.navigateTo({
					url: '/publicPages/pages/bank/addBankCard'
				})
			},
			checkBank(item){
				console.log(item)
				if (!this.isSelect) return
				console.log(item)
				uni.$emit('handleSelectBank', item)
				uni.navigateBack()
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding-top: 10px;
	}
	.icon{
		width: 40px;
		height: 40px;
		margin-right: 12px;
	}
	.btn-wrap{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
