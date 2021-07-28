<template>
	<view>
		<!-- 轮播图 -->
		<swipeContain :list="list"></swipeContain>
		<!-- 服务流 -->
		<view class="title">
			<u-section :show-line="false" title="服务流程" font-size="36" color="#333" :right="false"></u-section>
		</view>
		<view class="step-wrap">
			<image src="../../../static/images/index/step.png" class="step-img" mode="widthFix"></image>
		</view>
		<SetMeal :serviceListArr="yhTaocan" v-if="yhTaocan.length>0"/>
		<!-- 主推服务 -->
		<view class="title" v-if="listArr.length>0">
			<u-section :show-line="false" title="主推服务" font-size="36" color="#333" :right="false"></u-section>
		</view>
		<!-- <SetMeal :serviceListArr="taocan" v-if="taocan.length>0"/> -->
		<!-- <MainService :mainServiceObj="mainService"/> -->
		<swipeContain :list="listArr" v-if="listArr.length>0"></swipeContain>
	
		
		<!-- 拼团服务 -->
		<view class="item-wrap" v-if="group.length>0">
			<view class="title title1">
				<u-section :show-line="false" title="拼团服务" font-size="36" color="#333" :right="false"></u-section>
			</view>
			
			<JoinGroup :groupArr="group" typeService="groupStr"/>
		</view>
		<!-- 秒杀服务 -->
		<view class="item-wrap" v-if="ms.length>0">
			<view class="title title1">
				<u-section :show-line="false" title="限时秒杀" font-size="36" color="#333" :right="false"></u-section>
			</view>
			<JoinGroup :groupArr="ms" typeService="msStr"/>
		</view>
		<!-- <SpikeLists :msArr="ms"/> -->
		<!-- <SetMeal :serviceListArr="serviceList"  v-if="serviceList.length>0"/> -->
		<view class="item-wrap" v-if="serviceList.length>0">
			<view class="title title1">
				<u-section :show-line="false" title="普通服务" font-size="36" color="#333" :right="false"></u-section>
			</view>
			<SetMealArea :taocanArr="serviceList" typeService="service"/>
		</view>
		
		
		
		<view class="item-wrap" v-if="taocan.length>0">
			<view class="title title1">
				<u-section :show-line="false" title="套餐服务" font-size="36" color="#333" :right="false"></u-section>
			</view>
			<SetMealArea :taocanArr="taocan" typeService="taocan"/>
		</view>
		<view class="item-wrap" v-if="ysArr.length>0">
			<!-- <swipeContain :list="ysArr"></swipeContain> -->
			<view class="ys-box">
				<image @click="navToPage(item)"  v-for="item,i in ysArr" :key="i" :src="item.img" class="icon"  mode="widthFix"></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import SetMeal from './components/SetMeal.vue'
	import MainService from './components/MainService.vue'
	import SpikeLists from './components/SpikeLists.vue'
	import JoinGroup from './components/JoinGroup.vue'
	import SetMealArea from './components/SetMealArea.vue'
	import swipeContain from '../components/swipeContain.vue'
	import {goToPage} from '@/utils/common.js'
	export default {
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg', 
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
				],
				params:null,
				ms:[],
				group:[],
				serviceList:[],
				taocan:[],
				// mainService:{},
				listArr:[],
				yhTaocan:[],
				ysArr:[]
			}
		},
		components: {
			SetMeal,
			MainService,
			SpikeLists,
			JoinGroup,
			SetMealArea,
			swipeContain,
		},
		onLoad(option){
			this.params=JSON.parse(option.params)
			this.getInfo()
		},
		methods:{
			async getInfo(){
				let that=this
				const { statusCode, data, message } =  await this.$u.api.getCleaningIndex(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					uni.setNavigationBarTitle({
					　　title:data.data.name
					})
					that.ms=data.data.ms
					that.group=data.data.group
					that.serviceList=data.data.serviceList
					that.taocan=data.data.taocan
					if(data.data.mainService.length>0){
						data.data.mainService.map(item=>{
							item.image=item.img
						})
					}
					that.listArr=data.data.mainService
					that.yhTaocan=data.data.yhTaocan
					if(data.data.ys.length>0){
						data.data.ys.map(item=>{
							item.image=item.img
						})
						that.ysArr=data.data.ys
					}
					let imgArr=[]
					if(data.data.banner.length>0){
						data.data.banner.map(item=>{
							let imgObj={}
							imgObj.image=item.img
							imgArr.push(imgObj)
						})
					}
					that.list=imgArr
				} else {
					this.$toast(data.msg||msg)
				}
			},
			navToPage(item){
				goToPage(item,this.params.city_id)
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.item-wrap{
		background-color: #fff;
		padding: 0 10px;
		margin-bottom: 20rpx;
	}
	.item-wrap-1{
		padding: 0 13px;
		.img-item{
			width: 336rpx;
			height: 356rpx;
			margin-bottom: 10px;
		}
	}
	// 服务流程
	.step-wrap{
		width:100%;
		height: auto;
		background-color: #fff;
		border-radius: 10rpx ;
		display: flex;
		justify-content: center;
	}
	.title{
		padding: 10px 30rpx;
	}
	.title1{
		padding: 10px 0;
	}
	// 轮播图
	.banner-wrap{
		padding: 10px 30rpx;
		margin: 0 auto;
		background-color: #fff;
	}
	.head-wrap{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 12px;
		.right{
			opacity: 0;
		}
	}
	.ys-box {
		display: flex;
		justify-content: center;
		.icon{
			width: 100%;
		}
	}
</style>
