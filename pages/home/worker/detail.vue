<template>
	<view class="" style="position: relative;">
		<kfBtn></kfBtn>
		<view class="list">
			<view class="left">
				<image :src="info&&info.headPic" mode="aspectFill" class="icon"></image>
				<view class="con">
					<view class="name">
						<text class="fz15 h1 name">{{info.realName}}</text>
						<text class="fz12 h3">{{info.age}}</text>
					</view>
					<view class="label-wrap">
						<view class="label">{{info.tags}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<u-gap height="20"></u-gap>
		<!-- 认证信息 -->
		<view class="certification">
			<view class="title">认证信息</view>
			
			<view class="classification">
				<u-row gutter="16">
					<u-col span="3">
						<view class="classification-list">
							<image src="../../../static/images/index/worker/a1.png" class="list-img" mode=""></image>
							<view class="list-text">背调合格</view>
						</view>
					</u-col>
					<u-col span="3">
						<view class="classification-list">
							<image src="../../../static/images/index/worker/a2.png" class="list-img" mode=""></image>
							<view class="list-text">身份证</view>
						</view>
					</u-col>
					<u-col span="3">
						<view class="classification-list">
							<image src="../../../static/images/index/worker/a3.png" class="list-img" mode=""></image>
							<view class="list-text">体检报告</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		
		<u-gap height="20"></u-gap>
		<view class="desc-wrap">
			<view class="title">个人资料</view>
			<view class="desc-list-wrap">
				<view class="desc-list-list">
					<view class="list-label fz14 h3">学历：</view>
					<view class="list-value fz14 h3">{{info.ext.education}}</view>
				</view>
				<view class="desc-list-list">
					<view class="list-label fz14 h3">生肖：</view>
					<view class="list-value fz14 h3">{{info.ext.zodiac}}</view>
				</view>
				<view class="desc-list-list">
					<view class="list-label fz14 h3">民族：</view>
					<view class="list-value fz14 h3">{{info.ext.nation}}</view>
				</view>
				<view class="desc-list-list">
					<view class="list-label fz14 h3">籍贯：</view>
					<view class="list-value fz14 h3">{{info.ext.place}}</view>
				</view>
				<view class="desc-list-list">
					<view class="list-label fz14 h3">工作经验：</view>
					<view class="list-value fz14 h3">{{info.ext.years}}</view>
				</view>
				<view class="desc-list-list">
					<view class="list-label fz14 h3">烹饪水平：</view>
					<view class="list-value fz14 h3">{{info.ext.cooking}}</view>
				</view>
				<view class="desc-list-list">
					<view class="list-label fz14 h3">照顾小孩：</view>
					<view class="list-value fz14 h3">{{info.ext.childs}}</view>
				</view>
				<view class="desc-list-list">
					<view class="list-label fz14 h3">意向城市：</view>
					<view class="list-value fz14 h3">{{info.ext.city_name}}</view>
				</view>
				<view class="desc-list-list">
					<view class="list-label fz14 h3">每周休息：</view>
					<view class="list-value fz14 h3">{{info.ext.rest}}</view>
				</view>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view class="work-title">阿姨相册</view>
		<view class="work-box">
			<view class="work-img-wrap" v-for="item,index in imgData" :key="index">
				<image class="work-img" @click="imgPreview(index)" :src="item" mode="aspectFill" ></image>
			</view>
		</view>
		<view class="submit">
			<view class="service" @click="gotoKF">
				<image src="../../../static/images/index/service.png" class="service-icon" mode=""></image>
				<text class="fz10 h2">客服</text>
			</view>
			<view class="btn-wrap">
				<view class="btn">
					<navigator :url="`/pages/home/worker/reservation?type=${params.type}`" class="fz14">立即预约</navigator>
				</view>
			</view>
		</view>
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
				info:{
					ext:{},
				},
				params:{
					type:null,
					user_id:null,
				},
				imgData:[],
				shareData: {
					
				},
			}
		},
		
		onLoad(option){
			if(option.inv_id){
				uni.getStorageSync('inv_id',option.inv_id)  
			}
			this.params.type=option.type
			this.params.user_id=option.user_id
			this.getInfo()
		},
		onNavigationBarButtonTap() {
				let shareData=this.toJoin()
				return shareData
		},
		methods:{
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
				const { statusCode, data, message } =  await this.$u.api.getAgreementUserInfo(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.info=data.data
					this.imgData=this.info.aunt_imgs
				} else {
					this.$toast(data.msg||msg)
				}
			},
			gotoKF(){
				uni.navigateTo({
					url:"/publicPages/pages/help/webView"
				})
			},
			imgPreview(current){
				uni.previewImage({
					urls: this.imgData,
					current
				});
			}
			
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
	.title{
		padding: 10px 15px;
		background-color: #fff;
	}
	.desc-list-wrap{
		background-color: #fff;
		padding: 10px 15px;
	}
	.desc-list-list{
		display: flex;
		padding: 4px;
		.list-label{
			width: 70px;
		}
	}
	.classification{
		background-color: #fff;
		padding: 10px 12px;
		.classification-list{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.list-img{
			width: 45px;
			height: 45px;
			margin-bottom: 6px;
		}
	}
	.list{
		padding: 10px 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		position: relative;
		.left{
			display: flex;
			align-items: center;
			.name{
				margin-right: 6px;
			}
			.label-wrap{
				display: flex;
				.label{
					height: 15px;
					border-radius: 4px;
					border: solid 1px #dcdcdc;
					font-size: 10px;
					color: #7b7b7b;
				}
			}
		}
		.icon{
			width: 45px;
			height: 45px;
			margin-right: 10px;
		}
	}
	.work-box {
		display: flex;
		justify-content: space-around;
		margin-bottom: 140rpx;
	}
	.work-img-wrap {
		position: relative;
		width: 31%;
		padding-bottom: 31%;
		.work-img {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}
	}
	.work-title {
		padding: 10px 15px;
		background-color: #fff;
	}
</style>
