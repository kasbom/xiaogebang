<template>
	<view class="" style="position: relative;">
		<!-- 轮播图 -->
		<kfBtn></kfBtn>

		<u-swiper :list="bannerList" img-mode="widthFix" border-radius="none" height="750"></u-swiper>
		<!-- 商品相关 -->
		<view class="goods-detail">
			<view class="goods-name h1 fz16">{{setMealDetail.info.name}}</view>
			<view class="goods-desc">
				<view class="price-wrap">
					<view class="">
						<text class="h1 fz14">套餐价</text>
						<text class="fz24">￥{{setMealDetail.info.price}}</text>
					</view>
				</view>
				<view class="fz12 h3">销量: {{setMealDetail.info.sales}}</view>
			</view>
		</view>
		
		<!-- 日期 -->
		<u-gap height="20"></u-gap>
		<view class="time-box" @click="changeStyle">
			<text>方式  {{timeStr}}</text>
			 <u-icon name="arrow-right" class="right-icon" color="#858585" size="24" ></u-icon>
		</view>
		<u-gap height="20"></u-gap>
		
		<!-- 评论 -->
		<view class="comment">
			<m-comment
			   :commentArr="setMealDetail&&setMealDetail!=null?setMealDetail.comment:[]"
			></m-comment>
		</view>
		
		<!-- 详情 -->
		<view class="dom-wrap">
			<view class="title">
				<u-section :show-line="false" title="详情" font-size="30" color="#333" :right="false"></u-section>
			</view>
			<view class="img-box">
			  <image class="img-item" v-for="(item,index) in contentArr" :key="index" :src="item" mode="widthFix"></image>
			</view>
		</view>
		
		<view class="submit">
			<view class="service" @click="gotoKF">
				<image src="../../../static/images/index/service.png" class="service-icon" mode=""></image>
				<text class="fz10 h2">客服</text>
			</view>
			<view class="btn-wrap" @click="createOrder(2,null)">
				<view class="btn">
					<view class="fz14">立即预约</view>
				</view>
			</view>
		</view>
		
		<u-popup v-model="show" mode="bottom">
			<view class="time-wrap">
				<view class="fz16 h1 time-title">请选择服务周期与时间</view>
				
				<view class="time-cell-wrap">
					<!-- <view class="time-cell" @click="$refs.mTimeW.open()"> -->
					<view class="time-cell" @click="showType=true">
						<view class="h1 fz13">周期</view>
						<view class="time-cell-right h3 fz14">
							<view class="">{{timeObj.timeTypeStr}}</view>
							<u-icon name="arrow-right" color="#7b7b7b"></u-icon>
						</view>
					</view>
					<view class="time-cell" v-if="params.time_type==1" >
						<view class="h1 fz13">时间</view>
						<view class="time-cell-right h3 fz14">
							<view class="">{{timeObj.timeDateStr}}</view>
							<u-icon name="arrow-right" color="#7b7b7b"></u-icon>
						</view>
					</view>
					<view class="time-cell" v-else @click="$refs.mTimeW.open()">
						<view class="h1 fz13">时间</view>
						<view class="time-cell-right h3 fz14">
							<view class="">{{timeObj.timeDateStr}}</view>
							<u-icon name="arrow-right" color="#7b7b7b"></u-icon>
						</view>
					</view>
				</view>
				
				<!-- <view class="submit submit1">
					<view class="service">
						<image src="../../../static/images/index/service.png" class="service-icon" mode=""></image>
						<text class="fz10 h2">客服</text>
					</view>
					<view class="btn-wrap" @click="createOrder(2,null)">
						<view class="btn">
							<view class="fz14">立即预约</view>
						</view>
					</view>
				</view> -->
			</view>
		</u-popup>
		<!-- <m-time ref="mTime" :cellShow="false" @confirm="changeTime"></m-time> -->
		<u-select v-model="showType" :list="listArr" @confirm="confirmType"></u-select>
		<m-time ref="mTimeW" :cellShow="false" :weekShow="true" @confirm="changeWeek"></m-time>
	</view>
</template>

<script>
	import { shareWXChat } from '@/utils/common.js'
	import kfBtn from '../components/kfBtn.vue'
	export default {
		components: {
			kfBtn,
		},
		data() {
			return {
				/**
				 * 轮播图相关
				 */
				bannerList: [],
				activeIndex: 0,
				/**
				 * 时间相关
				 */
				show: false,
				activeIndex: 0,
				params:{
					city_id:null,
					id:null,
					date:null,
					time:null,
				},
				timeStr:'',
				setMealDetail:{
					info:{},
					comment:[]
				},
				contentArr:[],
				showType:false,
				listArr:[{ label: '固定时间', value: '2' }, { label: '自由时间', value: '1 '}],
				timeObj:{
					timeTypeStr:'固定周期',
					timeDateStr:'请选择'
				},
				shareData: {
				},
				
			}
		},
		onLoad(option){
			this.params.city_id=option.city_id
			this.params.id=option.id
			this.getInfo()
		},
		onNavigationBarButtonTap() {
				let shareData=this.toJoin()
				return shareData
		},
		methods: {
			async toJoin(){
				const { statusCode, data, message } = await this.$u.api.wxShare({},true)
				if (statusCode === 200&&data.error==0 ) {
					let dataReq=data.data
					let obj={}
					// #ifdef APP-PLUS
						obj={
							href: dataReq.url,
							title: dataReq.title,
							summary:dataReq.content,
							imageUrl:dataReq.img,
						}
					// #endif
					shareWXChat(obj).then(res=>{
									  console.log(res)
					})
				} else {
					this.$toast(data.msg||msg)
				}
				
			},
			async getInfo(){
				let that=this
				const { statusCode, data, message } = await this.$u.api.taocanDetail(this.params,true)
				if (statusCode === 200&&data.error==0 ) {
					that.setMealDetail=data.data
					that.contentArr=that.setMealDetail.info.content

					that.bannerList.push({image:that.setMealDetail.info.main_pic})
				} else {
					that.$toast(data.msg||msg)
				}
			},
			
           confirmType(data){
			   this.params.time_type=Number(data[0].value)
			   this.timeObj.timeTypeStr=data[0].label
			   if(this.params.time_type==1){
				   this.timeStr=`自由时间`
				   this.timeObj.timeDateStr='自由时间'
				   this.params.time=0
				   this.params.date=0
			   }else{
				   this.timeObj.timeDateStr='请选择'
				   this.timeStr=`请选择`
				   this.params.time=null
				   this.params.date=null
			   }
			   
		   },
			changeTime(){
				this.params.time_type=1
				this.params.time=0
				this.params.date=0
				this.timeStr=`自由时间`
				this.show=false
			},
			changeWeek(e){
				console.log(e)
				this.params.time_type=2
				this.params.time=e[1].value
				this.params.date=e[0].value
				this.timeStr=`${e[0].label} ${e[1].label}`
				this.show=false
			},
			changeStyle(){
				this.show=true
			},
			createOrder(type,group_type) {
				if(this.params.time==null){
					this.$toast('请选择正确时间')
					return
				}
				uni.navigateTo({
					url: `/pages/home/cleaning/create?id=${this.params.id}&city_id=${this.params.city_id}&type=${type}&time_type=${this.params.time_type}&date=${this.params.date}&time=${this.params.time}&group_type=${group_type}`
				})
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
	.time-box {
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fff;
		padding: 0 36rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.time-wrap{
		background-color: #fff;
		height: 100%;
		.time-title{
			padding: 10px 15px;
		}
		.time-cell-wrap{
			padding: 10px 15px;
		}
		.time-cell{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 690rpx;
			height: 45px;
			padding: 0 10px;
			background-color: #f5f5f5;
			margin-bottom: 10px;
		}
		.time-cell-right{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.submit{
			position: relative;
		}
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
	.dom-wrap{
		padding: 0 15px 60px;
		background-color: #fff;
		margin-top: 10px;
		.title{
			padding: 15px 0;
		}
	}
	.goods-detail{
		background-color: #fff;
		padding: 10px 15px;
		.goods-desc{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 4px;
		}
		.price-wrap{
			color: #ff4b34;
			display: flex;
			align-items: flex-end;
		}
	}
</style>
