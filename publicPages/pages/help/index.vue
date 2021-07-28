<template>
	<view>
		
		<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y @scrolltolower="loadMore(ind)">
						<u-cell-group v-for="item,index in helpList" :key="index">
							<u-cell-item  :title="item.title" @click="toDetail(item.id)"></u-cell-item>
						</u-cell-group>
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
					page:1,
					page_size:10,
				},
				refreshIcon: '',
				pulling: false,
				helpList: [], // 订单列表
				statusMore:'',
			}
		},
		onLoad(option){
			this.getInfo()
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '/publicPages/pages/help/detail?id='+id
				})
			},
			async getInfo(){
				let that=this
				const page_size = 10
				const { statusCode, data, message } =  await that.$u.api.getHelpList(that.params,true)
				
				if (statusCode === 200&&data.error==0) {
					that.helpList = [...that.helpList, ...data.data]
					that.statusMore= data.data.length <= page_size ? 'nomore' : 'loadmore'
					this.params.page++
				} else {
					that.statusMore = 'nomore'
				}
				
				
			},
			loadMore(index) {
			 this.getInfo(index, this.params.page)
			},
		}
	}
</script>

<style>
</style>
