<template>
	<view class="" style="position: relative;">
		<!-- banner -->
		
		<swipeContain :list="listArr"></swipeContain>
		<kfBtn></kfBtn>
		<!-- 商品列表 -->
		<SetMealLists :mealLists="mealLists" />
	</view>
</template>

<script>
	import SetMealLists from './components/SetMealLists.vue'
	import swipeContain from '../components/swipeContain.vue'
	import kfBtn from '../components/kfBtn.vue'
	export default {
		data() {
			return {
				params:{
					city_id:null,
				},
				
				mealLists:null,
				listArr:[],
			}
		},
		components: {
			SetMealLists,
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
				
				const { statusCode, data, message } = await this.$u.api.getTaocanIndex(this.params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					this.mealLists=data.data
					let imgArr=[]
					data.banner.map(item=>{
						item.image=item.img
					})
					this.listArr=data.banner
				} else {
					this.$toast(data.msg||msg)
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
	.banner-icon{
		width: 750rpx;
		height:300rpx;
	}
</style>
