<template>
	<view class="">
		<!-- 轮播图 -->
		<view class="banner-wrap">
		  <u-swiper :list="list" img-mode="widthFix" border-radius="none" height="580"></u-swiper>
		</view>
		
		<!-- 商品相关 -->
		<view class="goods-detail">
			<view class="goods-name h1 fz16">{{info.name}}</view>
			<view class="goods-desc">
				<view class="price-wrap">
					<view class="">￥{{info.price}}</view>
					<view class="del-price fz10 h4">￥{{info.market_price}}</view>
				</view>
				<view class="fz12 h3">已服务{{info.salesSum}}次</view>
			</view>
		</view>
		
		<!-- 日期 -->
		<u-gap height="20"></u-gap>
		<m-time @confirm="timeConfirm"></m-time>
		<u-gap height="20"></u-gap>
		
		<!-- 评论 -->
		<view class="comment">
			<m-comment :commentArr="comment"></m-comment>
		</view>
		
		<!-- 详情 -->
		<view class="dom-wrap">
			<view class="title">
				<u-section :show-line="false" title="详情" font-size="30" color="#333" :right="false"></u-section>
				
			</view>
			<view class="img-box">
			 <image class="img-item"  v-for="item,i in urlArr" :key="i"  :src="item"  mode="widthFix"></image>
			</view>
		</view>
		
		<view class="btn-wrap">
			<m-button title="立即预约" size="max" @handleClick="createOrder(1,1)"></m-button>
		</view>
	</view>
</template>

<script>
	import { shareWXChat } from '@/utils/common.js'
	export default {
		data() {
			return {
				/**
				 * 轮播图相关
				 */
				bannerList: [],
				activeIndex: 0,
				params:{
					city_id:null,
					id:null,
					date:null,
					time:null,
					group_type:null
				},
				info:{
					img:[]
				},
				recomment:[],
				comment:[],
				list:[],
				urlArr:[],
				shareData: {
					title: '优惠套餐分享',
					href: '/pages/login/getCode',
				},
			}
		},
		onLoad(option){
			this.params.id=option.id
			this.params.city_id=option.city_id
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
			createOrder(type,time_type) {
				if(!this.params.date||this.params.date==null){
					this.$toast('请选择时间')
					return
				}
				if(!this.params.time||this.params.time==null){
					this.$toast('请选择正确时间')
					return
				}
				uni.navigateTo({
					url: `/pages/home/cleaning/create?id=${this.params.id}&city_id=${this.params.city_id}&type=${type}&time_type=${time_type}&date=${this.params.date}&time=${this.params.time}&group_type=${this.params.group_type}`
				})
			},
			async getInfo(){
				let that= this
				const { statusCode, data, message } = await this.$u.api.getServiceDetail(this.params)
				if (statusCode === 200&&data.error==0 ) {
					that.info=data.data.info
					that.list=data.data.info.imgs ||[]
					let imgArr=[]
					data.data.info.imgs.map(item=>{
						let obj={}
						obj.image=item
						imgArr.push(obj)
					})
					that.list=imgArr
					that.comment=data.data.comments
					that.urlArr=data.data.info.content
					
							
				} else {
					this.$toast(data.msg||msg)
				}
			},
			timeConfirm(e){
				this.params.date=e[0].value.replace(/-/g,'')
				this.params.time=e[1].value
			},
		}
	}
</script>

<style scoped lang="scss">
	.btn-wrap{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
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
		padding: 0 15px 10px;
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
	// 轮播图
	.banner-wrap{
		padding: 10px 30rpx;
		margin: 0 auto;
		background-color: #fff;
	}
</style>
