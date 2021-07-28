<template>
	<view class="comment-wrap">
		<view class="title">
			<u-section :show-line="false" :title="`服务评价(${commentArr.length})`" font-size="30" color="#333" sub-title="更多评价"></u-section>
		</view>
		
		<view class="list-wrap">
			<view class="list" v-for="(item,i) in commentArr" :key='i'>
				<view class="list-main">
					<view class="list-main-left">
						<image :src="item.head_pic"  mode="aspectFill" class="list-icon"></image>
						<view class="">
							<view class="fz13 h1">{{item.mobile}}</view>
							<view class="fz12 h3">{{item.add_time}}</view>
						</view>
						
					</view>
					<view class="list-main-right">
						<u-rate v-model="item.rank" disabled></u-rate>
					</view>
				</view>
				<view class="fz13 h1 comment-context">
					{{item.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 5
			}
		},
		props:{
			commentArr:{
				type:Array,
			},
		}
	}
</script>

<style scoped lang="scss">
	.comment-wrap{
		padding: 10px 15px;
		background-color: #fff;
	}
	.title{
		padding: 10px 0 15px;
	}
	.list{
		padding: 15px 15px 10px;
		border-bottom: 1px solid #eaeaea;
		.list-main-left{
			display: flex;
			align-items: center;
		}
		.list-icon{
			width: 35px;
			height: 35px;
			border-radius: 50%;
			margin-right: 6px;
		}
		.list-main{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.comment-context {
			margin-top: 10px;
			color: rgb(144, 147, 153);
		}
	}
</style>
