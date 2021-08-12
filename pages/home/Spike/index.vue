<template>
	<view class="" style="position: relative;">
		<swipeContain :list="listArr"></swipeContain>
		<kfBtn></kfBtn>
		<!-- 倒计时 -->
		<view class="time-down h99">
			<text class="time-down-text fz14">距结束还有:</text>
			<u-count-down
				:timestamp="msInfo&&msInfo.surplusTime"
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
		<SpikeLists :msArr="msInfoArr"/>
	</view>
</template>

<script>
	import SpikeLists from './components/SpikeLists.vue'
	import swipeContain from '../components/swipeContain.vue'
	import kfBtn from '../components/kfBtn.vue'
	export default {
		data() {
			return {
				timestamp: 886400,
				params:{
					city_id:null,
					
				},
				msInfo:null,
				msInfoArr:[],
				listArr:[],
			}
		},
		components: {
			SpikeLists,
			swipeContain,
			kfBtn,
		},
		onLoad(option){
			if(option.inv_id){
				uni.getStorageSync('inv_id',option.inv_id)  
			}
			this.params.city_id=option.id
			this.getInfo()
		},
		methods:{
			async getInfo(){
				const { statusCode, data, message } = await this.$u.api.getMsIndex(this.params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					 this.msInfo=data
					 this.msInfoArr=data.data
					 data.banner.map(item=>{
					 	item.image=item.img
					 })
					 this.listArr= data.banner
				} else {
					this.$toast(data.msg||msg)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.time-down{
		margin-top: 50rpx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		padding: 10px 0;
		.time-down-text{
			margin-right: 10px;
		}
	}
	.banner-icon{
		width: 750rpx;
		height: 270rpx;
	}
</style>
