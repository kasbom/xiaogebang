<template>
	<view class="content">
<!--    <view class="tab-content">
      <m-tab-u :tabItems="tabItems" v-model="activeIndex"></m-tab-u>
    </view> -->
		<scroll-view  class="scroll-h-l" :scroll-x="true" :show-scrollbar="false">
			<view v-for="(tab, index) in tabItems" :key="tab.id" class="uni-tab-item" :id="tab.id" @click="ontabtap(index)">
				<text class="uni-tab-item-title" :class="activeIndex == index ? 'uni-tab-item-title-active' : ''">{{tab.title}}</text>
			</view>
		</scroll-view>
    
    <swiper :current="activeIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="swiperChange">
      <swiper-item v-for="(tab, index) in orderList" :key="index" class="swiper-item">
        <scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore(index)">
						<view class="order-wrap">
							<OrderList :typeStr="tab.id" :orderList="tab.data" />
						</view>
						<view class="loadmore-wrap">
							<u-loadmore :status="tab.status" />
						</view>
        </scroll-view>
      </swiper-item>
    </swiper>
    
		<m-alert v-model="alertShow" :title="alertTitle" :buttons="[{text: '关闭'}]" @click-button="alertShow = false"></m-alert>
  </view>
</template>

<script>
  import config from '@/config/index.js'
	import OrderList from './components/OrderList.vue'
	export default {
		data () {
		  return {
			tabItems: [{
			  title: '我发起的拼团',
			  id: '1'
			}, {
			  title: '我参与的拼团',
			  id: '2'
			}],
			activeIndex: 0,
			refreshIcon: '',
			pulling: false,
			orderList: [], // 订单列表
			cancelViewShow: false, // 取消窗口显示
			alertShow: false,
			alertTitle: '', // 取消规则
			cancel_id: '', // 要被取消的id
		  }
    },
		onLoad({ activeIndex = 0 }) {
			this.activeIndex = activeIndex
			setTimeout(()=>{
			  this.tabItems.forEach((tabBar, index) => {
			    this.orderList.push({
			      id: tabBar.id,
			      data: [],
						page: 1,
			      status: 'loadmore',
			    })
			  })
				this.getList()
			},350)
		},
    methods: {
			async getList () {
				const tab = this.orderList[this.activeIndex]
				const page_size = 10
				const {  statusCode, data,  } = await this.$u.api.getMyGroupList({ type: tab.id, page: tab.page, page_size })
				
				if (statusCode === 200&&data.error==0) {
					if (tab.page === 1) tab.data = []
					tab.data = [...tab.data, ...data.data]
					tab.status = data.data.length <= page_size ? 'nomore' : 'loadmore'
					tab.page++
				} else {
					tab.status = 'nomore'
				}
			},
			switchTab(index) {
				if (this.orderList[index].page === 1) {
					this.getList();
				}
			},
			ontabtap (index) {
				if (this.activeIndex === index) {
						return;
				}
				this.activeIndex = index;
			},
			swiperChange (e) {
				let index = e.detail.current
				this.activeIndex = index;
				this.switchTab(index)
			},
      loadMore(index) {
        let tab = this.orderList[this.activeIndex]
				this.getList(index, tab.page)
      },
      handleClickItem (id) {
        this.$mRouter.push({
          path: '/pages/demand/order/order_detail',
          query: {
            id
          }
        })
      },
    },
		components: {
			OrderList
		}
	}
</script>

<style scoped>
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
  
  .content{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
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
