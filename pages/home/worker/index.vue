<template>
	<view class="">
		<view class="search-box">
			<view class="search-wrap">
				<u-search @blur="searchChange" placeholder="请输入阿姨姓名" bg-color="#fff" :show-action="false" v-model="name"></u-search>
			</view>
			
			<!-- <view class="tab-wrap" :style="{'top': statusBarHeight + 'px'}"> -->
			<!-- <view class="tab-wrap" >
				<view
					class="tab-list"
					:class="{active: type === item.id}"
					v-for="item in tabLists"
					:key="item.id"
					@click="handleSort(item.id)"
				>
					<text>{{item.label}}</text>
					<view class="arr-wrap">
						<u-icon name="arrow-up" :color="type === item.id && sort === 1 ? '#ff4b34' : '#333'" size="14"></u-icon>
						<u-icon name="arrow-down" :color="type === item.id && sort === 2 ? '#ff4b34' : '#333'" size="14"></u-icon>
					</view>
				</view>
			</view> -->
		</view>
		
		<view class="list-wrap">
			<WorkerLists :listArr="listArr" :typeNum="paramsType"></WorkerLists>
		</view>
	</view>
</template>

<script>
	import WorkerLists from './components/WorkerLists.vue'
	export default {
		data() {
			return {
				name: '',
				tabLists: [{
					label: '年龄',
					id: 1
				}, {
					label: '类型',
					id: 2
				},{
					label: '服务',
					id: 3
				},],
				type: 1, // 1-最新 2-价格 3-销量 默认传1
				sort: 2, // 1-正序 2-倒叙 默认传2
				params:null,
				statusBarHeight:0,
				listArr:null,
				paramsType:0,
			}
		},
		created () {
		  // this.statusBarHeight = getApp().globalData.systemInfo.statusBarHeight
		},
		methods: {
			// 筛选
			handleSort(id) {
				if (this.type === id) {
					this.sort = this.sort === 1 ? 2 : 1
				} else {
					this.sort = 2
					this.type = id
				}
			},
			async getInfo(){
				this.paramsType =this.params.cate_id
				let paramsObj={type:this.paramsType,name:this.name,city_id:this.params.city_id}
				const { statusCode, data, message } =  await this.$u.api.getAgreementUsers(paramsObj,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.listArr=data.data
				} else {
					this.$toast(data.msg||msg)
				}
			},
			searchChange(data){
				console.log(data)
				this.getInfo()
			},
		},
		components: {
			WorkerLists
		},
		onLoad(option){
			this.params=JSON.parse(option.params)
			this.getInfo()
		},
		
	}
</script>

<style scoped lang="scss">
	// .search-box{
	// 	position: fixed;
	// 	top: 8rpx;
	// }
	.list-wrap{
		padding-top: 100rpx;
	}
	.search-box{
		padding: 15px;
		position: fixed;
		width: 100%;
		top: 0;
		/*  #ifdef H5 */
		top: 44px;
		/*  #endif  */
	}
	.tab-wrap{
		background-color: #fff;
		height: 35px;
		font-size: 13px;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 25px;
		position: fixed;
		z-index: 999;
		width: 100%;
		top: 106px;
		left: 0;
		.tab-list{
			&.active{
				color: #ff4b34;
			}
			display: flex;
			align-items: center;
			.arr-wrap{
				display: flex;
				flex-direction: column;
				margin-left: 2px;
			}
		}
	}
</style>
