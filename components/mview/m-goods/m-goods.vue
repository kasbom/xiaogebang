<template>
	<view class="list-wrap">
		<view
			class="list"
			v-for="item in goodsLists"
			:key="item.good_id"
			@click="toDetail"
		>
			<image :src="item.good_pics[0]" class="list-icon" mode="aspectFill"></image>
			
			<view class="list-con">
				<view class="list-name fz14 h1 over2">{{item.good_name}}</view>
				
				<view class="money-btn">
					<view class="money theme-c">
						<text class="fz12">￥</text>
						<text class="fz18">{{item.goods_price}}</text>
					</view>
					<view class="btn">加入购物车</view>
				</view>
				
				<!--  -->
				<view class="desc fz11 h4">
					<view class="desc-list">销量{{item.good_Initial_sales}}</view>
					<view>好评率99.88%</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsLists: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			toDetail() {
				this.$mRouter.push({
					path: '/pages/shop/detail'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.list{
		display: flex;
		margin-bottom: 10px;
		background-color: #fff;
		.list-icon{
			width: 90px;
			height: 90px;
			flex-shrink: 0;
			border: solid 1px #e9e9e9;
			border-radius: 10px;
		}
		.list-con{
			flex-grow: 1;
			padding-left: 20px;
		}
		.list-name{
			height: 38px;
		}
		.money-btn{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.btn{
				width: 70px;
				height: 23px;
				border-radius: 23px;
				border: solid 1px $theme-c;
				color: $theme-c;
				font-size: 10px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.desc{
			display: flex;
			.desc-list{
				margin-right: 20px;
			}
		}
	}
</style>
