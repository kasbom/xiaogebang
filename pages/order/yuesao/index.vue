<template>
	
	<view class="wrap">
		<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore(ind)">
						<view class="order-wrap"> 
							<view class="list" v-for="(item,i) in  orderList" :key="i" @click="toDetail(item.id)">
								<u-cell-item
									:title="item.typeText"
									:label="item.add_time"
									:value="item.status_text"
									:value-style="{color:item.status==2? '#57be6a':'#ff4b34'}"
								>
									<image :src="item.img" slot="icon" mode="aspectFill" class="list-icon"></image>
								</u-cell-item>
							</view>
						</view>
						<view class="loadmore-wrap">
							<u-loadmore :status="statusMore" />
						</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					status: '',
					type:'',
					page:1,
					page_size:10,
				},
				activeIndex: 0,
				refreshIcon: '',
				pulling: false,
				orderList: [], // 订单列表
				statusMore:'',
				cancelViewShow: false, // 取消窗口显示
				alertShow: false,
				alertTitle: '', // 取消规则
				cancel_id: '', // 要被取消的id
			}
		},
		onLoad(option){
			this.params.type=option.type
			this.params.status=this.activeIndex
			this.getInfo()
		},
		methods: {
			async getInfo(){
				let that=this
				const tab = that.orderList[that.activeIndex]
				const page_size = 10
				that.params.status=that.activeIndex
				const { statusCode, data, message } =  await that.$u.api.getContractList(that.params,true)
				
				if (statusCode === 200&&data.error==0) {
					that.orderList = [...that.orderList, ...data.data]
					that.statusMore= data.data.length <= page_size ? 'nomore' : 'loadmore'
					this.params.page++
				} else {
					that.statusMore = 'nomore'
				}
				
				
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/order/yuesao/detail?id='+id+'&type='+this.params.type
				})
			},
			loadMore(index) {
			 this.getInfo(index, this.params.page)
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding: 10px 0 0;
		/deep/ .u-cell{
			align-items: center;
		}
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: #f7f7f7;
		display: flex;
		flex-direction: column;
		
	}
	.list{
		background-color: #fff;
		margin-bottom: 10px;
		.list-icon{
			width: 77px;
			height: 50px;
			border-radius: 5px;
			margin-right: 10px;
		}
	}
	.scroll-h-l{
			/* #ifndef APP-PLUS */
			white-space: nowrap;
			display: flex;
			/* #endif */
			flex-direction: row;
			background-color: #fff;
	/* 		border-bottom-color: #E5E5E5;
			border-bottom-width: 1px; */
	    width: 750rpx;
	    height: 84upx;
	    /* background-color: #00C000; */
		}
		.uni-tab-item{
			width: 50%;
	    height: 88rpx;
			/* #ifndef APP-PLUS-NVUE */
			display: inline-block;
			/* #endif */
			text-align: center;
		}
		.uni-tab-item-title{
			text-align: center;
			font-size: 14px;
			color: #333;
			line-height: 88rpx;
		}
		.uni-tab-item-title-active{
			color: #FF6600;
		}
	  .tab-content{
	    background-color: #fff;
	  }
	  
	  .order-wrap{
	    padding-top: 20rpx;
	  }
	  
	  .history-order-link{
	    text-align: center;
	    padding-top: 30rpx;
	  }
		.scroll-v{
			height: 100%;
		}
	  .swiper-box{
	    height: calc(100% - 88rpx);
	  }
</style>
