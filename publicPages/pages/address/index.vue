<template>
	<view>
		<template v-if="adderssList.length">
			<view class="item"
				v-for="(item, index) in adderssList" :key="item.id"
				@click="handleClickAddrList(item)"
			>
				<view class="top">
					<view class="name">{{ item.name }}</view>
					<view class="phone">{{ item.mobile }}</view>
					<view class="tag">
						<text class="red" v-if="item.isDefault == 1">默认</text>
					</view>
				</view>
				<view class="bottom">
					
					<view class="">
						{{item.address}}
					</view>
					<view class="bottom-item">
						<view class="">
							<u-checkbox-group @change="checkboxGroupChange($event,item.id)">
								<u-checkbox v-model="item.checked" :name="item.isDefault">
									设为默认
								</u-checkbox>
							</u-checkbox-group>
						</view>
						<view>
							<u-icon name="trash" :size="40" color="#999999" style="margin-left: 10px;" @click="delAddress(item.id, index)"></u-icon>
							<u-icon name="edit-pen" :size="40" color="#999999" style="margin-left: 10px;" @click="edit(item.id)"></u-icon>
						</view>
					</view>
					
				</view>
			</view>
		</template>
		<m-none title="暂无" v-else/>
		<view class="addSite-box">
			<view class="addSite" @tap="toAddSite">
				<view class="add">
					<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			adderssList: [],
			isSelect: false,
		};
	},
	onLoad({ type }) {
		this.isSelect = type === 'select'
	},
	onShow() {
		this.getAddrlist()
	},
	methods: {
		// 获取收货地址
		async getAddrlist() {
			const { statusCode, data } = await this.$u.api.getAddressList()
			if (statusCode === 200&&data.error==0 ) {
				data.data.map(item=>{
					item.checked=item.isDefault==0?false:true
				})
				this.adderssList = data.data
			}
		},
		// 删除收货地址
		delAddress(addressId, index) {
			uni.showModal({
				title: '提示',
				content: '您确定要删除该地址吗?',
				success: res => {
					if (res.confirm) {
						this.$u.throttle(async () => {
							const { statusCode, data } = await this.$u.api.delAddress({ id:addressId })
							if (statusCode === 200&&data.error==0) {
								this.$toast('删除成功')
								this.adderssList.splice(index, 1)
							} else {
								this.$toast(data.msg)
							}
						}, 1500)
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
		},
		// 选择地址
		handleClickAddrList(item) {
			if (!this.isSelect) return
			console.log(item)
			uni.$emit('handleSelectAddr', item)
			uni.navigateBack()
		},
		toAddSite(){
			uni.navigateTo({
			  url: '/publicPages/pages/address/addSite'
			})
		},
		edit(id) {
			uni.navigateTo({
			  url: '/publicPages/pages/address/addSite?addressId=' + id
			})
		},
		
		async checkboxGroupChange(e,id) {
			const { statusCode, data } = await this.$u.api.setAddressDefault({id})
			if (statusCode === 200&&data.error==0 ) {
				this.$toast('操作成功')
				this.getAddrlist()
			}else {
				this.$toast(data.msg)
			}
		},
	},
	// 返回
	onBackPress(e) {
		const fromType = e.from
		if (fromType != 'navigateBack' && this.isSelect) {
			if (this.adderssList.length) {
				uni.$emit('handleDefaultSelectAddr', this.adderssList[0])
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	padding: 40rpx 20rpx;
	background-color: #fff;
	border-bottom: 1px solid #ececec;
	.top {
		display: flex;
		font-weight: bold;
		font-size: 34rpx;
		.phone {
			margin-left: 60rpx;
		}
		.tag {
			display: flex;
			font-weight: normal;
			align-items: center;
			text {
				display: block;
				width: 60rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 20rpx;
				border-radius: 6rpx;
				text-align: center;
				margin-left: 30rpx;
				background-color:rgb(49, 145, 253);
			}
			.red{
				background-color:red
			}
		}
	}
	.bottom {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
		font-size: 28rpx;
		justify-content: space-between;
		color: #999999;
		.bottom-item {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 100%;
	line-height: 100rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ff6a00;
	font-size: 30rpx;
	position: fixed;
	left: 50%;
	bottom: 50rpx;
	transform: translateX(-50%);
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		z-index: 999!important;
		.icon{
			margin-right: 10rpx;
		}
	}
	
}
.addSite-box {
	width:100%;
	height: 60px;
}
</style>
