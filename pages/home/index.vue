<template>
	<view style="z-index: 999!important;position: relative;">
		<u-navbar :is-back="false" back-text="" title="小哥帮">
			<view class="head-wrap">
				<view class="left">
					<u-dropdown ref="uDropdown" @open="open" @close="close">
						<u-dropdown-item v-model="cityObj.city_id" :title="cityObj.name" :options="cityArr" @change="change"></u-dropdown-item>
					</u-dropdown>
				</view>
				
				<view class="left right">
					<text>{{cityObj.name}}</text>
					<u-icon name="arrow-down"></u-icon>
				</view>
			</view>
		</u-navbar>
		<kfBtn></kfBtn>
		<!-- 轮播图 -->
		<swipeContain :list="list"></swipeContain>
		<!-- 分类 -->
		<view class="classification">
			<u-row gutter="16">
				<u-col span="3" @click="navToPage('/pages/home/JoinGroup/JoinGroup?id='+city_id)">
					<view class="classification-list">
						<image src="../../static/images/index/a1.png" class="list-img" mode=""></image>
						<view class="list-text">拼团</view>
					</view>
				</u-col>
				<u-col span="3" @click="navToPage('/pages/home/Spike/index?id='+city_id)">
					<view class="classification-list">
						<image src="../../static/images/index/a2.png" class="list-img" mode=""></image>
						<view class="list-text">秒杀</view>
					</view>
				</u-col>
				<u-col span="3" @click="navToPage('/pages/home/SetMeal/index?id='+city_id)">
					<view class="classification-list">
						<image src="../../static/images/index/a3.png" class="list-img" mode=""></image>
						<view class="list-text">套餐</view>
					</view>
				</u-col>
				<u-col span="3" @click="navToPage('/pages/center/coupon/receive?id='+city_id)">
					<view class="classification-list">
						<image src="../../static/images/index/a4.png" class="list-img" mode=""></image>
						<view class="list-text">优惠券</view>
					</view>
				</u-col>
			</u-row>
		</view>
		
		<!-- 邀请 -->
		<view class="share-wrap" @click="toJoinFunc">
			<image class="join-img" src="../../static/images/index/join.png"  mode="widthFix"></image>
		</view>
		
		<!-- 列表 -->
		<ShopLists ref="shopList" :itemObj="storeList" ></ShopLists>
		<u-popup mode="center" closeable :mask-close-able="false" :close-icon-color="closeColor" :close-icon-pos="closePup" width="80%" border-radius="10" v-model="show">
			<view class="content">
				 <swipeContain class="new-style" :list="adArr"></swipeContain>
			</view>
		</u-popup>
		<u-popup mode="center"  :mask-close-able="false"  width="80%"  v-model="showUp">
			<view class="content">
				<image src="../../static/images/index/up.png" mode="widthFix"></image>
				<view class="up-con">
					<view class="up-tit">
						<text class="title-h1">发现新版本</text>
					</view>
					<view class="tit-con">
						<text>V.{{upInfo.version}}</text>
						<text class="tit-sub">优化初始化流程;</text>
						<text class="tit-sub">修复一些小bug;</text>
					</view>
					<view class="tit-foot">
						<button class="up-btn"  @click="uploadNow">马上升级</button>
						<text class="up-cancel" @click="closeUpload">以后再说</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Utils from '@/utils'
	import ShopLists from './components/ShopLists.vue'
	import swipeContain from './components/swipeContain.vue'
	import kfBtn from './components/kfBtn.vue'
	
	import {navTo,setToken,getToken,todayNum} from '@/utils/common.js'
	import amap from '@/utils/amap-wx.js';
	var flagNew=true
	export default {
		data() {
			return {
				list: [],
				storeList:[],
				localInfo:{
					city_id:null,
					// latitude:'114.067427,22.547655',
					latitude:'',
				},
				city_id:null,
				cityObj:{
					name:'',
					city_id:'',
				},
				cityArr:[],
				amapPlugin: null,
				key: 'dd2d9528e54edde57d781fa219f7e920'  ,
				show:true,
				activeIndex:0,
				adArr:[],
				closePup:'bottom-right',
				closeColor:'#ffffff',
				upInfo:{},
				showUp:false,
			}
		},
		onLoad(){
			this.amapPlugin = new amap.AMapWX({
				key: this.key  
			});
			let cityIdFlag=getToken('city_id') 
			let cityObjSet=getToken('cityObjSet') 
			let localInfoSet=getToken('localInfoSet') 
			if(localInfoSet)this.localInfo=localInfoSet
			if(cityObjSet)this.cityObj=cityObjSet
			if(!cityIdFlag){
				this.city_id=cityIdFlag
				this.getCitys(true)
				this.getLocaltion()
			}else{
				this.getCitys(true)
				this.getLocaltion()
			}
			// #ifdef APP-PLUS
			let upInfo=getToken('upinfo')
			 this.upInfo=upInfo.data
			 console.log(this.upInfo)
			 if(Number(this.upInfo.version)>Number(this.upInfo.curVersion)){
				 this.showUp=true
			 }
			// #endif
		},
		
		components: {
			ShopLists,
			swipeContain,
			kfBtn,
		},
		onShow(){
			flagNew=true
			
		},
		onHide(){
			flagNew=false
		},
		methods:{
			navToPage(url){
				navTo(url)
			},
			async getCitys(flag){
				let that=this
				const resData= await that.$u.api.getCitys({})
				const { error, data, msg } = resData.data
				if (error === 0) {
					let newArr=[]
					that.cityObj=data[0]
					data.map(item=>{
						let newObj={}
						newObj.label=item.name
						newObj.value=item.city_id
						newArr.push(newObj)
					})
					that.cityArr=newArr
					if(!flag){
						that.city_id=that.cityObj.city_id
						that.localInfo.city_id=that.city_id
						that.getIndexInfo()
					}
					
					
				} else {
					that.$toast(msg)
				}
			},
			async getIndexInfo(type){
				let that=this
				if(type==0){
					that.localInfo.city_id=""
				}
				const { statusCode, data, message } = await that.$u.api.getHomeIndex(that.localInfo)
				if (statusCode === 200 &&data.error==0) {
					flagNew=false
					data.data.banners.map(item=>{
						item.image=item.img
					})
					let adObj={}
					if(data.data.ad){
						that.adArr=data.data.ad
						console.log(that.adArr)
					}
					let oldToken=getToken('today')
					let today=todayNum(),curTime=Date.parse(new Date())
					if(!oldToken||((curTime-oldToken)>(24*60*60*1000))){
						this.show=true
						setToken('today',today)
					}
					that.list=data.data.banners
					
					if(data.data.stores.length>0){
						that.city_id=data.city_id
						that.localInfo.city_id=data.city_id
						that.cityObj.city_id=data.city_id
						if(type==0){
							that.cityArr.map(item=>{
								if(item.value==that.localInfo.city_id){
									that.cityObj.name = item.label 
								}
							})
						}
						setToken('store_id',data.data.stores[0].info.id)
						for(let i=0;i<data.data.stores.length;i++){
							let newItem=data.data.stores[i]
							if(i==0){
								newItem.hide=0
							}else{
								newItem.hide=1
							}
						}
						that.storeList=data.data.stores
						that.$nextTick(()=>{
							that.$refs.shopList.setActive()
						})
					}else{
						that.storeList=data.data.stores
					}
					setToken('city_id',that.localInfo.city_id)
				} else {
					// if(flagNew==true){
						uni.showToast({
						  title: data.msg,
						  icon: 'none',
						  mask: true,
						  duration:3000,
						  success: () => {
						  	setTimeout(()=>{
								that.getCitys()
								flagNew=false
							},3000)
						  }
						})
						
					// }
				}
			},
			getLocaltion(){
				let that=this
				uni.showLoading({
							title: '加载中...',
							mask: true
				})
				
				Utils.getLocation().then(({ latitude, longitude }) => {
					uni.hideLoading()
					that.localInfo.latitude=longitude+','+latitude
					that.getIndexInfo(0)
				}).catch(function (err) {
					console.log(err)
					uni.showToast({
					  title:'关闭定位后某些服务无效，请开启',
					  icon: 'none',
					  mask: true,
					  duration:3000,
					  success: () => {
						  setTimeout(()=>{
							  that.getCitys()
						  },3000)
					  }
					})
				})
			},
			
			getRegeo(longitude, latitude) { 
				let that=this
				uni.showLoading({  
					title: '获取信息中'  
				});  
				that.amapPlugin.getRegeo({ 
					location:`${longitude},${latitude}`,
					success: (data) => {  
						console.log(data)  
						 
						
						that.getIndexInfo(0)
					},
					fail: function(info){
					  //失败回调
					  uni.showToast({
					    title:'定位失败',
					    icon: 'none',
						duration:3000,
					    mask: true,
					    success: () => {
					    	that.getCitys()
							setTimeout(()=>{
								that.getCitys()
							},3000)
					    }
					  })
					  
					}
				});  
			}  ,
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			change(item) {
				this.cityObj.name=item.label
				this.cityObj.city_id=item.value
				this.city_id=item.value
				this.localInfo.city_id=item.value
				setToken('city_id',item.value)
				let cityObjSet={'city_id':item.value,'name':item.label}
				let localInfoSet ={'city_id':item.value,'latitude':this.localInfo.latitude}
				setToken('localInfoSet',localInfoSet)
				setToken('cityObjSet',cityObjSet) 
				this.getIndexInfo(2)
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				// this.$refs.uDropdown.highlight(xxx);
			},
			toJoinFunc(){
				navTo('/pages/center/share/index')
				
			},
			uploadNow(){
				this.showUp=false
				plus.runtime.openURL(this.upInfo.url)
			},
			closeUpload(){
				this.showUp=false
			},
		}
	}
</script>

<style scoped lang="scss">
	.kf{
		position: fixed;
		z-index: 2;
		right: 5px;
		top: 70%;
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		
	}
	.content {
		.new-style {
			/deep/.banner-wrap {
				padding: 0!important;
				max-height: 190px;
				
			}
		}
		.up-con {
				padding: 0 40rpx;
				box-sizing: border-box;
			.up-tit {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				display: flex;
				justify-content: center;
				.title-h1 {
					font-size: 36rpx;
					font-weight: 600;
				}
			}
			.tit-con {
				display: flex;
				flex-direction: column;
				padding: 0 20rpx;
				.tit-sub{
					position: relative;
					margin-top: 20rpx;
					&:before{
						content: '.';
						top:-6rpx;
						left:-10rpx;
						position: absolute;
						font-size: 28rpx;
					}
				}
				
			}
			 .tit-foot{
				 margin-top: 20rpx;
				 display: flex;
				 flex-direction: column;
				 justify-content: center;
				 .up-btn {
				 	border-radius: 10rpx!important;
					font-size: 16px;
					background-color: $theme-c ;
					width: 100%;
					color: #ffffff;
				 }
				 .up-cancel{
					 width: 100%;
					 height: 80rpx;
					 line-height: 80rpx;
					 color: #666666;
					 text-align: center;
					 font-size: 16px;
				 }
			 }
			 
			
		}
	}
	// 分享
	.share-wrap{
		padding: 16px 30rpx 6px;
		.join-img {
			width: 100%;
			height: 120rpx;
		}
		
	}
	// 分类
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
	
	.head-wrap{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 12px;
		.right{
			opacity: 0;
		}
		/deep/ .u-dropdown__content,.u-dropdown__content__popup {
			width:96vw!important;
			box-sizing: border-box!important;
		}
	}
	.test {
		display: inline-block;
		margin:4px 2px;
	}
</style>
