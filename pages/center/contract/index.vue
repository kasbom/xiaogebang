<template>
	<view class="content">
<!--    <view class="tab-content">
      <m-tab-u :tabItems="tabItems" v-model="activeIndex"></m-tab-u>
    </view> -->
		<scroll-view  class="scroll-h-l" :scroll-x="true" :show-scrollbar="false">
			<view v-for="(tab, index) in tabItems" :key="index" class="uni-tab-item" :id="tab.id||''" @click="ontabtap(index)">
				<text class="uni-tab-item-title" :class="activeIndex == index ? 'uni-tab-item-title-active' : ''">{{tab.title}}</text>
			</view>
		</scroll-view>
    
    <swiper :current="activeIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="swiperChange">
      <swiper-item v-for="(tab, indexs) in orderList" :key="indexs" class="swiper-item">
        <scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore(indexs)">
						<view class="order-wrap">
							<view class="list" v-for="(item,ind) in tab.data" :key="ind" @click="toDetail(item.id)">
								<u-cell-item
									:title="item.type"
									:label="item.add_time"
									:value="item.status_text"
									:value-style="{color:item.status==2? '#57be6a':'#ff4b34'}"
									:arrow="false"
								>
									<image :src="item.img" slot="icon" mode="aspectFill" class="list-icon"></image>
								</u-cell-item>
							</view>
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
	export default {
		data () {
      return {
        tabItems: [ {
          title: '待服务',
          id: '1'
        }, {
          title: '服务中',
          id: '2'
        }, {
          title: '已完成',
          id: '3'
        }],
        activeIndex: 2,
        refreshIcon: '',
        pulling: false,
        orderList: [], // 订单列表
        cancelViewShow: false, // 取消窗口显示
		alertShow: false,
		alertTitle: '', // 取消规则
		cancel_id: '', // 要被取消的id
		orderType:2
      }
    },
		onLoad(option) {
			
			this.activeIndex = option.status||''
			this.tabItems.forEach((tabBar, index) => {
				let tabBarId=tabBar.id?tabBar.id:''
			  this.orderList.push({
			    id: tabBarId,
			    data: [],
				page: 1,
			    status: 'loadmore',
			  })
			})
			this.getList()
		},
    methods: {
		   reGetList(){
			   this.getList()
		   },
			async getList () {
				let i=!this.activeIndex||this.activeIndex==''?0:this.activeIndex
				const tab = this.orderList[i]
				let newStatus=tab.id
				const page_size = 10
				const { statusCode, data } =await this.$u.api.getContractList({ status:newStatus, page: tab.page ,type:'',page_size}) 
				
				if (statusCode === 200&&data.error==0 ) {
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
		  let i=!this.activeIndex||this.activeIndex==''?0:this.activeIndex
        let tab = this.orderList[i]
				this.getList(index, tab.page)
      },
      toDetail(id) {
      	uni.navigateTo({
      		url: '/pages/center/contract/detail?id='+id
      	})
      }
	  
    },
	}
</script>

<style scoped lang="scss">
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
		width: 33.3%;
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
  
  /* .content{
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
  } */
  .wrap{
  	padding: 10px 0 0;
  	/deep/ .u-cell{
  		align-items: center;
  	}
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
</style>
