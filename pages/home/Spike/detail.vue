<template>
	<view class="">
		<!-- 轮播图 -->
		<u-swiper   :list='list' img-mode="widthFix" border-radius="none" height="750"></u-swiper>
		
		<!-- 倒计时 -->
		<TimeDown 
		  :infoObj="groupDetail"
		  :typeMs="true"
		/>
		
		<!-- 商品相关 -->
		<view class="goods-detail">
			<view class="goods-name h1 fz16">专业清洁服务</view>
		</view>
		
		<!-- 日期 -->
		<m-time @confirm="timeConfirm"></m-time>
		<u-gap height="20"></u-gap>
		
		<!-- 评论 -->
		<view class="comment">
			<m-comment
			:commentArr="commentArr"
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
			<view class="btn-wrap" @click="createOrder(3,1,null)">
				<view class="btn">
					<view class="fz14">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TimeDown from '../components/TimeDown.vue'
	import { shareWXChat } from '@/utils/common.js'
	export default {
		data() {
			return {
				/**
				 * 轮播图相关
				 */
				list:[],
				activeIndex: 0,
				groupDetail:{},
				commentArr:[],
				contentArr:[],
				params:{
					city_id:null,
					id:null,
					date:null,
					time:null,
				},
				shareData: {
				}
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
				const { statusCode, data, message } = await this.$u.api.msDetail(this.params,true)
				if (statusCode === 200&&data.error==0 ) {
					that.groupDetail=data.data
					that.commentArr=data.comment
					that.contentArr=that.groupDetail.content
					let imgArr=[],imgObj={};
					imgObj.image=that.groupDetail.main_pic
					imgArr.push(imgObj)
					that.list=imgArr
				} else {
					that.$toast(data.msg||msg)
				}
			},
			createOrder(type,time_type,group_type) {
				if(!this.params.date||this.params.date==null){
					this.$toast('请选择时间')
					return
				}
				if(!this.params.time||this.params.time==null){
					this.$toast('请选择正确时间')
					return
				}
				this.params.type=type
				this.params.group_type=group_type
				this.params.time_type=time_type
				this.checkAllot()
			},
			async checkAllot(){
				let that=this
				const { statusCode, data, message } = await this.$u.api.checkAllot(this.params,true)
				if (statusCode === 200&&data.error==0 ) {
					uni.navigateTo({
						url: `/pages/home/cleaning/create?id=${this.params.id}&city_id=${this.params.city_id}&type=${this.params.type}&time_type=${this.params.time_type}&date=${this.params.date}&time=${this.params.time}&group_type=${this.params.group_type}`
					})
				} else {
					that.$toast(data.msg||msg)
				}
			},
			
			timeConfirm(e){
				this.params.date=e[0].value.replace(/-/g,'')
				this.params.time=e[1].value
			},
			gotoKF(){
				uni.navigateTo({
					url:"/publicPages/pages/help/webView"
				})
			}
		},
		components: {
			TimeDown
		}
	}
</script>

<style scoped lang="scss">
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
				background-color: #ff4b34;
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
			justify-content: space-between;
			margin-top: 4px;
		}
		.price-wrap{
			color: #ff4b34;
			display: flex;
		}
	}
</style>
