<template>
	<view class="wrap" style="position: relative;">
		<kfBtn></kfBtn>
		<image @click="navToPage(item)"  v-for="item,i in urlArr" :key="i" :src="item.img" class="icon" mode=""></image>
		<view class="submit">
			<view class="service" @click="gotoKF">
				<image src="../../../static/images/index/service.png" class="service-icon" mode=""></image>
				<text class="fz10 h2">客服</text>
			</view>
			<view class="service" @click="navPage(1)">
				<image src="../../../static/images/index/aunt.png" class="service-icon" mode="scaleToFill"></image>
				<text class="fz10 h2">查看阿姨</text>
			</view>
			<view class="btn-wrap">
				<view class="btn">
					<view @click="navPage(2)" class="fz14">立即预约</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {navTo,goToPage} from '@/utils/common.js'
	import kfBtn from '../components/kfBtn.vue'
	export default {
		data() {
			return {
				urlArr:null,
				params:null,
			}
		},
		components: {
			kfBtn,
		},
		onLoad(option){
			this.params=JSON.parse(option.params)
			console.log(this.params)
			this.getInfo()
		},
		methods:{
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getAgreement(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.urlArr=data.data.content
				} else {
					this.$toast(data.msg||msg)
				}
			},
			navPage(type){
				if(type==1){
					uni.navigateTo({
						url: `/pages/home/worker/index?params=${JSON.stringify(this.params)}`
					})
				}else{
					uni.navigateTo({
						url: `/pages/home/worker/reservation?type=${this.params.cate_id}`
					})
				}
				
			},
			navToPage(item){
				goToPage(item,this.params.city_id)
				
			},
			gotoKF(){
				uni.navigateTo({
					url:"/publicPages/pages/help/webView"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding-bottom: 60px;
	}
	.icon{
		display: block;
		width: 100%;
		height: 5341rpx;
	}
	.submit{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		background-color: #fff;
		.service{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 55px;
			.service-icon{
				width: 17px;
				height: 16px;
				margin-bottom: 6px;
			}
		}
		.btn-wrap{
			display: flex;
			flex: 1;
			.btn{
				flex: 1;
				height: 50px;
				background-color: #ff6600;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				color: #fff;
				&.ciyao{
					opacity: .8;
				}
			}
		}
	}
</style>
