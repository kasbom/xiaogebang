<template>
	<view class="">
		<!-- 轮播图 -->
		<view class="banner-wrap">
			<u-swiper :list="list" height="320"></u-swiper>
		</view>
		
		<!-- 商品相关 -->
		<view class="goods-detail">
			
			<view class="goods-desc">
				<view class="price-wrap">
					<view class="goods-name h1 fz16">{{infoDetail.name}}</view>
				</view>
				<view class="fz12 h3">已服务{{infoDetail.service_nums}}次</view>
			</view>
			
			<view class="label-wrap">
				<view class="label h3" v-if="tagsArr.length>0" v-for="item,index in tagsArr" 
				:key="index" style="margin: 0 2rpx;">{{item}}</view>
			</view>
		</view>
		
		<!-- 日期 -->
		<u-gap height="20"></u-gap>
		<m-time  @confirm="timeConfirm"></m-time>
		<u-gap height="20"></u-gap>
		<view class="tag-box" v-if="selectArr.length>0" >
		        <text class="tag-txt">维修服务</text>
				<u-radio-group v-model="params.cate_id" >
					<u-radio  
						v-for="(itemed, ind) in selectArr" :key="ind" 
						:name="itemed.cate_id"  inactive-color="#eeeeee"
						active-color="#ff5000"  label-size="28rpx"
					>
						{{itemed.name}}
					</u-radio>
				</u-radio-group>
			</view>
		<!-- 详情 -->
		<view class="dom-wrap">
			<view class="title">
				<u-section :show-line="false" title="详情" font-size="30" color="#333" :right="false"></u-section>
				<image  :src="infoDetail.img" class="list-icon"  mode="aspectFill"></image>
			</view>
		</view>
		
		<view class="btn-wrap">
			<m-button title="立即预约" size="max" @handleClick="createOrder(6,1,null)"></m-button>
		</view>
	</view>
</template>

<script>
	import {navTo,getToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				/**
				 * 轮播图相关
				 */
				list: [],
				tagsArr:[],
				selectArr:[],
				params:{
					id:0,
					cate_id:'',
					date:null,
					time:null,
				},
				infoDetail:{},
			}
		},
		onLoad(option){
			this.params.city_id=getToken('city_id')
			this.params.id=option.id
			this.getInfo()
		},
		methods: {
			
			timeConfirm(e){
				this.params.date=e[0].value.replace(/-/g,'')
				this.params.time=e[1].value
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
				if(!this.params.cate_id||this.params.cate_id==''){
					this.$toast('请选择维修服务')
					return
				}
				uni.navigateTo({
					url: `/pages/home/cleaning/createService?id=${this.params.id}&city_id=${this.params.city_id}&cate_id=${this.params.cate_id}&type=${type}&time_type=${time_type}&date=${this.params.date}&time=${this.params.time}&group_type=${group_type}`
				})
				
			},
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getCateDetail(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.infoDetail=data.data
					this.list=this.infoDetail.content
					this.tagsArr=this.infoDetail.tags
					this.selectArr=this.infoDetail.cates
					
				} else {
					this.$toast(data.msg||msg)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.label-wrap{
		display: flex;
		flex-wrap: wrap;
		font-size: 10px;
		margin: 6px 0;
		.label{
			border: 1px solid #b7b7b7;
			border-radius: 4px;
			line-height: 16px;
			padding: 0 2px;
		}
	}
	.banner-img{
		height: 340rpx;
		width: 750rpx;
	}
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
	// 轮播图
	.banner-wrap{
		padding: 10px 30rpx;
		margin: 0 auto;
		background-color: #fff;
	}
	.list-icon {
		width: 100%;
		margin-top: 20rpx;
	}
	.tag-box {
		display: flex;
		padding:0 30rpx;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		font-size:28rpx ;
		color: #666666;
		.tag-txt {
			width: 20%;
			margin-right: 10rpx;
		}
	}
</style>
