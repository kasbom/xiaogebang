<template>
	<u-popup
		v-model="show"
		mode="bottom"
	>
		<view class="con">
			<view class="title">分享至</view>
			<!-- 关闭按钮 -->
			<view class="close-btn" @click="show = false">
				<u-icon
					name="close-circle"
					color="#999"
					size="30"
				></u-icon>
			</view>
			<view class="list-wrap">
				<view
					class="con-list"
					@click="handleShare('WXSceneSession')"
				>
					<u-icon
						name="weixin-circle-fill"
						color="#59dd75"
						size="100"
					></u-icon>
					<view class="list-text">微信好友</view>
				</view>
				<view
					class="con-list"
					@click="handleShare('WXSenceTimeline')"
				>
					<u-icon
						name="moments-circel-fill"
						color="#59dd75"
						size="100"
					></u-icon>
					<view class="list-text">朋友圈</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import config from '@/config'
	export default {
		props: {
			href: {
				type: String,
				default: config.baseURL
			},
			title: {
				type: String,
				default: '众机会订单'
			},
			summary: {
				type: String,
				default: '众机会邀请您接单了'
			},
			imageUrl: {
				type: String,
				default: `${config.baseURL}/logo.png`
			}
		},
		data() {
			return {
				show: false
			}
		},
		methods: {
			handleShare(scene) {
				uni.share({
					provider: 'weixin',
					scene,
					type: 0,
					href: this.href,
					title: this.title,
					summary: this.summary,
					imageUrl: this.imageUrl,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				})
			},
			open() {
				this.show = true
			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style scoped lang="scss">
	.con{
		position: relative;
	}
	.close-btn{
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}
	.title{
		text-align: center;
		font-size: 32rpx;
		padding: 30rpx 0 0rpx;
	}
	.list-wrap{
		display: flex;
		justify-content: center;
	}
	.con-list{
		margin: 0 60rpx;
		padding: 110rpx 0 90rpx;
		.list-text{
			padding-top: 20rpx;
		}
	}
</style>
