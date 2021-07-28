<template>
	<u-popup
		v-model="show"
		mode="center"
		closeable
		border-radius="14"
		negative-top="160"
		@close="handleClose"
	>
		<view class="wrap">
			<view class="title">{{$t('passwordModal.' + type)}}</view>
			<input type="password" class="input input-text" :placeholder="$t('passwordModal.' + type + 'pl')" v-model="password" focus>
			<view class="btn" @click="handleConfirm">{{$t('common.submit')}}</view>
		</view>
	</u-popup>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5"
	export default {
		props: {
			type: {
				type: String,
				default: 'pay'
			}
		},
		data() {
			return {
				show: false,
				password: ''
			}
		},
		methods: {
			handleConfirm() {
				this.$u.throttle(() => {
					if (!this.$u.test.isPassword(this.password)) {
						this.$toast(this.$t('errorMsg.tradePassword'))
						return
					}
					this.$emit('confirm', { password: md5Libs.md5(this.password) })
				}, 1500)
			},
			open() {
				this.show = true
			},
			close() {
				this.password = ''
				this.show = false
			},
			handleClose() {
				this.password = ''
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding: 50rpx 24rpx 30rpx;
		background-color: #333;
	}
	.title{
		text-align: center;
	}
	.input-text{
		width: 400rpx;
		height: 60rpx;
		border-bottom: 1px solid #222;
		padding: 0 20rpx;
		font-size: 14px;
		margin: 60rpx 0 40rpx;
	}
	.btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 160rpx;
		height: 60rpx;
		border-radius: 10rpx;
		margin: 0 auto;
		background-image: linear-gradient(0deg,
			#4a4a4a 0%, 
			#787878 100%), 
		linear-gradient(
			#d14101, 
			#d14101);
		background-blend-mode: normal, 
			normal;
		box-shadow: 0px 15.75rpx 2px 1px 
			rgba(0, 0, 0, 0.24);
		color: #fff;
	}
</style>
