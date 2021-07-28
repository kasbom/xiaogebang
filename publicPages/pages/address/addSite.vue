<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" v-model="formData.name" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" v-model="formData.mobile" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="selectAddrShow = true">
				<view class="left">所在地区</view>
				<input disabled :value="formData.areaStr" type="text" placeholder-class="line" placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" v-model="formData.address" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<!-- <view class="bottom">
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right">
					<u-switch active-color="red" inactive-color="#eee" v-model="formData.isDefault" />
				</view>
			</view>
		</view> -->
		
		<view class="btn-wrap">
			<m-button title="保存" @handleClick="setDeliverie"></m-button>
		</view>
		
		<!-- 地址选择 -->
		<m-city-select v-model="selectAddrShow" @city-change="cityChange" :areaCode="areaCode"></m-city-select>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				name: '', //	文本	必填	联系人名字
				mobile: '', //	文本	必填	手机号
				address: '', //	文本	必填	收货人具体地址
				province: '', //	文本	必填	地区ID集合，省,市,区
				city: '', //	文本	必填	地区ID集合，省,市,区
				district: '', //	文本	必填	地区ID集合，省,市,区
				twon: '', //	文本	必填	地区ID集合，省,市,区
				areaStr:'',
				isDefault: false, //	文本	必填	1-默认 2-非默认地址
			},
			// 街道选择
			selectAddrShow: false,
			areaCode: ["1", "2", "3","4"],
			defaultRegion:["北京市", "市辖区", "东城区","东华门街道"],
			// 编辑
			addressId: '',
		};
	},
	onLoad({ addressId }) {
		this.addressId = addressId
	},
	onReady() {
		if (this.addressId) this.deliverieDetail()
	},
	methods: {
		// 选择城市
		cityChange(e) {
			this.formData.province = `${e.province.id}`
			this.formData.city = `${e.city.id}`
			this.formData.district = `${e.area.id}`
			this.formData.twon = `${e.twon?e.twon.id:''}`
			this.formData.areaStr = `${e.province.name}${e.city.name}${e.area.name}${e.twon?e.twon.name:''}`
		},
		// 选择街道
		handleSelectStreet(e) {
			this.street = e[0]
		},
		// 获取地址详情
		async deliverieDetail() {
			const { code, data } = await this.$u.api.getAddressList({ addressId: this.addressId })
			let dataObj=data.data[0]
			this.formData = {
				name: dataObj.name, //	文本	必填	联系人名字
				mobile: dataObj.mobile,
				areaStr: dataObj.address, //	文本	必填	地区ID集合，省,市,区
				district: dataObj.district,//	文本	必填	手机号
				address: dataObj.address, //	文本	必填	收货人具体地址
				province: dataObj.province, //	文本	必填	地区ID集合，省,市,区
				district: dataObj.district, //	文本	必填	地区字符串 广东省深圳市龙华区
				city: dataObj.city, //	文本	必填	地区字符串 广东省深圳市龙华区
				twon: dataObj.twon, //	文本	必填	地区字符串 广东省深圳市龙华区
				isDefault: dataObj.isDefault == 1, //	文本	必填	1-默认 2-非默认地址
			}
			
			this.areaCode = data.area_id
		},
		// 设置收货地址
		async setDeliverie() {
			if (!/^1\d{10}$/.test(this.formData.mobile)) {
				this.$toast('请输入正确的电话号码')
				return ''
			}
			
			const params = JSON.parse(JSON.stringify(this.formData))
			params.isDefault = params.isDefault ? 1 : 0
			
			// 编辑
			if (this.addressId) params.id = this.addressId
			
			const { statusCode, data } = await this.$u.api.saveAddress(params)
			
			if (statusCode === 200&&data.error==0 ) {
				this.$toast('操作成功')
				
				uni.navigateBack()
			} else {
				this.$toast(data.msg)
			}
		},
	}
};
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}

.btn-wrap{
	padding: 40rpx 24rpx;
}
.wrap {
	background-color: #f2f2f2;
	/deep/ .uni-scroll-view-content{
    background: #fff;
  }
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		// padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
</style>

