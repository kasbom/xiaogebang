<template>
	<view class="">
		<view class="form">
			<u-upload :action="action" :file-list="fileList" :form-data="{ type: 10 }" max-count="9" :header="header" :auto-upload="true" @on-success="onSuccess" @on-remove="onRemove"></u-upload>
			<u-field
				v-model="remark"
				label="内容"
				required
				input-align="right"
				placeholder="请输入"
			>
			</u-field>
			<u-cell-item title="打分" :arrow="false">
				<view slot="right-icon">
					<u-rate v-model="value"></u-rate>
				</view>
			</u-cell-item>
		</view>
		
		<view class="btn-wrap">
			<m-button title="提交评论" @handleClick="skillUploadCert"></m-button>
		</view>
	</view>
</template>

<script>
	import Config from '@/config'
	export default {
		data() {
			return {
				action: `${Config.apiURL}/User/upImg`,
				fileList: [],
				remark: '',
				header: {},
				imgList: [],
				value: 0
			}
		},
		onLoad({ id, type }) {
			this.id = id
			this.type = type
			if (this.$store.state.token) this.header.token = this.$store.state.token
		},
		methods: {
			// 上传凭证
			async skillUploadCert() {
				const commentData = await this.$u.api.commentOrder({id: this.id, content: this.remark, imgs: this.imgList.join(','), rank: this.value })
				const { error, data, msg } = commentData.data
				if (error == 0) {
					this.$toast('评论成功')
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/order/index`
						})
					}, 1500)
				} else {
					uni.showToast({
						title: msg,
						icon: 'none'
					})
				}
			},
			onRemove(index) {
				this.imgList.splice(index, 1)
			},
			onSuccess(data) {
				if (data.error === 0) {
					this.imgList.push(data.img)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn-wrap{
		margin: 30px 0;
		padding: 0 15px;
	}
	.form{
		background-color: #fff;
		margin: 10px 0;
		padding: 0 15px 15px;
		.images-wrap{
			display: flex;
			flex-wrap: wrap;
		}
		.image-list{
			width: 220rpx;
			height: 220rpx;
			margin-right: 14rpx;
			margin-bottom: 14rpx;
			position: relative;
			.del{
				position: absolute;
				right: 0;
				top: 0;
				transform: translateX(20%) translateY(-20%);
			}
			&.last-image-list{
				margin-right: 0;
			}
			.image-list-icon{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.upload-wrap{
			width: 690rpx;
			height: 174rpx;
			background-color: #f5f5f5;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.upload-btn-icon{
				width: 33px;
				height: 28px;
				margin-bottom: 8px;
			}
			.upload-btn{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}
		.form-title{
			display: flex;
			align-items: center;
			padding-top: 15px;
			.form-icon{
				width: 15px;
				height: 15px;
				margin-right: 10px;
			}
		}
		.textarea{
			display: block;
			width: 100%;
			height: 110px;
			font-size: 12px;
			color: #666;
			padding: 10px 0;
		}
	}
</style>
