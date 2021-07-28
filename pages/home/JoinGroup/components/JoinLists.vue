<template>
	<view class="wrap" >
		<view class="title">
			<u-section :show-line="false" :title="`${joinList.length}人在拼团, 可直接参与`" font-size="30" color="#333" :right="false"></u-section>
		</view>
		
		<view class="list-wrap" v-for="item,i in joinList" :key="i" @click="createOrder(item)">
			<view class="list">
				<view class="list-left">
					<image :src="item.head_pic" mode="aspectFill" class="list-icon"></image>
					<text class="fz13 h1">{{item.mobile}}</text>
				</view>
				
				<view class="list-right">
					<view class="fz12 right-time">
						<view class="">
							<text>还差</text>
							<text class="h99">{{item.is_send}}</text>
							<text>人拼成</text>
						</view>
						
						<view class="time-down">
							<text class="h3">剩余</text>
							<u-count-down
								:timestamp="item.time"
								:show-days="true"
								:show-minutes="true"
								:show-seconds="true"
								separator="zn"
								bg-color="rgba(0,0,0,0)"
								color="#7b7b7b"
								font-size="12px"
								separator-color="#7b7b7b"
							></u-count-down>
						</view>
					</view>
					
					<m-button @handleClick="createOrder(item)" title="去参团" size="mini" :css="{height: '25px', 'font-size': '12px', 'background-color': '#ff4b34'}"></m-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timestamp: 86400,
			}
		},
		props:{
			joinList:{
				type:Array
			},
			cityId:{
				type:String
			},
			params:{
				type:Object
			},
			
		},
		methods:{
			async createOrder(item){
				let that=this
				const { statusCode, data, message } = await this.$u.api.getJoinGroupDetail({id:item.id,city_id:this.params.city_id},true)
				if (statusCode === 200&&data.error==0 ) {
					console.log(data.data.info)
						uni.navigateTo({
							url: `/pages/home/JoinGroup/detail?id=${data.data.info.id}&city_id=${data.data.info.city_id}&group_type=2`
						})
				} else {
					that.$toast(data.msg||msg)
				}
			},
			// toOrder(item) {
			// 	if(!this.params.date||this.params.date==null){
			// 		this.$toast('请选择时间')
			// 		return
			// 	}
			// 	if(!this.params.time||this.params.time==null){
			// 		this.$toast('请选择正确时间')
			// 		return
			// 	}
				
			// 	uni.navigateTo({
			// 		url: `/pages/home/JoinGroup/detail?id=${item.id}&city_id=${item.city_id}`
			// 	})
			// },
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		background-color: #fff;
		padding: 10px 15px;
		.title{
			padding-bottom: 6px;
		}
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 8px 0;
		}
		.left{
			display: flex;
			align-items: center;
		}
		.list-right{
			display: flex;
			align-items: center;
			.right-time{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 6px;
			}
		}
		.list-icon{
			width: 35px;
			height: 35px;
			border-radius: 50%;
			margin-right: 10px;
		}
	}
</style>
