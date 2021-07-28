<template>
	<view class="">
		<!-- 轮播图 -->
		<swipeContain :list="listArr"></swipeContain>
		
		<!-- 倒计时 -->
		<view class="time-down h99">
			<text class="time-down-text fz14">距结束还有:</text>
			<u-count-down
				:timestamp="timestamp"
				:show-days="true"
				:show-minutes="true"
				:show-seconds="true"
				separator="zn"
				bg-color="#ff4b34"
				color="#fff"
				separator-color="#ff4b34"
			></u-count-down>
		</view>
		
		<!-- 商品列表 -->
		<JoinGroupLists :joinList="joinList" />
	</view>
</template>

<script>
	import JoinGroupLists from './components/JoinGroupLists.vue'
	import swipeContain from '../components/swipeContain.vue'
	export default {
		data() {
			return {
				timestamp: 886400,
				params:{
					city_id:null,
				},
				joinList:null,
				listArr:[],
			}
		},
		components: {
			JoinGroupLists,
			swipeContain
		},
		onLoad(option){
			this.params.city_id=option.id
			this.getInfo()
		},
		methods:{
			async getInfo(){
				let that=this
				const { statusCode, data, message } = await that.$u.api.getActivityIndex(this.params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					data.banner.map(item=>{
						item.image=item.img
						
					})
					that.listArr=data.banner
					that.joinList=data.data
					that.timestamp=data.surplusTime
					
				} else {
					that.$toast(data.msg||msg)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.time-down{
		background-color: #fff;
		display: flex;
		justify-content: center;
		padding: 10px 0;
		.time-down-text{
			margin-right: 10px;
		}
	}
	// 轮播图
	.banner-wrap{
		padding: 10px 30rpx;
		margin: 0 auto;
		background-color: #fff;
	}
	.banner-icon{
		width: 750rpx;
		// height: 270rpx;
		height: 300rpx;
	}
	
</style>
