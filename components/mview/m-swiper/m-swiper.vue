<template>
	<!-- 轮播图 -->
	<view class="swiper-wrap">
		<swiper class="swiper" @change="handleSwiperChange" autoplay indicator-dots indicator-color="#eaeaea" indicator-active-color="#F3DF6D">
			<swiper-item
				v-for="(img, index) in bannerList"
				:key="index"
			>
				<image :src="img" class="banner-icon" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="num-wrap">{{activeIndex}}/{{bannerList.length}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			bannerList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				/**
				 * 轮播图相关
				 */
				activeIndex: 0,
			}
		},
		methods: {
			// 轮播图切换
			handleSwiperChange(e) {
				this.activeIndex = e.detail.current + 1
			},
		}
	}
</script>

<style scoped lang="scss">
	.swiper-wrap{
		position: relative;
		.swiper{
			width: 750rpx;
			height: 750rpx;
		}
		.banner-icon{
			width: 750rpx;
			height: 750rpx;
		}
		.num-wrap{
			position: absolute;
			background-color: rgba(0,0,0,.5);
			padding: 2px 10px;
			color: #fff;
			right: 10px;
			bottom: 20px;
			border-radius: 10px;
			font-size: 12px;
		}
	}
</style>
