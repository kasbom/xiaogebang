<template>
	<view class="">
		<view class="title">Hi，欢迎来到小哥帮</view>
<!-- 		<view class="mobile-wrap">
			<view class="mobile">本机号码：159****7113</view>
			<view class="change-mobile">切换号码</view>
		</view> -->
		
		<view class="btn-wrap">
			<button type="primary" class="wx-btn"  @click="toNext">手机号码登录</button>
		</view>
		
		<view class="login-foot">
			<view class="wx-login">
				<view class="wx-login-text">其它登录方式</view>
				<view class="wx-btn-v">
					<image src="../../static/images/wx.png" class="wx-icon" mode=""></image>
					<!-- #ifdef MP-WEIXIN -->
					<button type="primary" class="wx-btn-b" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx"></button>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					 <button type="primary" class="wx-btn-b"  @click="login"></button>
					<!-- #endif -->
				</view>
				
			</view>
			
			<view class="tip-wrap">
				<view>使用手机号码登录代表那您已同意<text class="tip-name" @click="navToFuc(1)">《小哥帮隐私政策》</text>和</view>
				<view><text class="tip-name"  @click="navToFuc(2)">《中国联通认证服务条款》</text>并使用本机号码登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {navTo,removeToken,getToken} from '@/utils/common.js'
	import Utils from '@/utils'
	export default {
		data() {
			return {
				inv_id:null
			}
		},
		onLoad(option) {
			if(option.inv_id)this.inv_id=option.inv_id
			removeToken('city_id')
			removeToken('store_id')
		},
		methods: {
			// 微信端获取手机号
			appLoginWx(){
				console.log('微信点击了')
				Utils.appLoginWxCommon().then(res=>{
					console.log('微信获取了'+res)
					if(this.inv_id!=null)res.inv_id=this.inv_id
					this.loginFun(res)
				})
				
			},
			
			login() {
				Utils.loginCommon().then(res=>{
					let data={code: res,type:1}
					this.appLoginFun(data)
				})
				
			},
			toNext() {
				uni.navigateTo({
					url: '/pages/login/getCode'
				})
			},
			toSelectId(){
				uni.login({
				    provider: 'univerify',
				    univerifyStyle: { 
				            fullScreen: true
				        }
				})
			},
			async appLoginFun(newParams){
				let that =this
				console.log('this is newParams' +newParams)
				const { statusCode, data, message } = await that.$u.api.wechat(newParams)
				console.log(statusCode, data)
				if (statusCode === 200&&data.error==0) {
					that.$toast('登录成功')
					const token = data.token
					console.log(token)
					that.$store.commit('SET_TOKEN', token)
					uni.setStorageSync('token', token)
					that.$store.commit('SET_USER_INFO', data.userInfo)
					that.pushIdFunc(data.userInfo)
					// await this.$store.dispatch('getUserInfo', this)
					
					// 根据选择身份跳转
					// const userInfo = this.$store.state.userInfo
					// switchId(data.userInfo)
				} else {
					console.log(data)
					this.$toast(data.msg)
				}
			},
			async loginFun(params){
				const { statusCode, data, message } = await this.$u.api.miniWechat(params)
				if (statusCode === 200&&data.error==0) {
					this.$toast('登录成功')
					const token = data.token
					console.log(token)
					this.$store.commit('SET_TOKEN', token)
					uni.setStorageSync('token', token)
					uni.setStorageSync('inv_id', data.userInfo.userId)
					this.$store.commit('SET_USER_INFO', data.userInfo)
					// #ifdef MP-WEIXIN
						if(data.userInfo.bindMobile==0){
							uni.navigateTo({
								url: '/pages/login/getCode?bindMobile='+data.userInfo.bindMobile
							})
						}else{
							uni.switchTab({
								url: '../home/index',
							})
						}
					// #endif
					// #ifdef APP-PLUS
					  this.pushIdFunc(data.userInfo)
					// #endif
					
					
					// await this.$store.dispatch('getUserInfo', this)
					
					// 根据选择身份跳转
					// const userInfo = this.$store.state.userInfo
					// switchId(data.userInfo)
				} else {
					this.$toast(data.msg)
				}
				
			},
			async pushIdFunc(userInfo){
				let clientid = getToken('clientid')
				console.log(clientid)
				const { statusCode, data, message } = await this.$u.api.pushId({clientid:clientid})
				console.log(statusCode)
				console.log(data)
				console.log(data.error)
				if (statusCode === 200&&data.error==0) {
					console.log(userInfo.bindMobile&&userInfo.bindMobile==0)
					if(userInfo.bindMobile&&userInfo.bindMobile==0){
						uni.navigateTo({
							url: '/pages/login/getCode?bindMobile='+userInfo.bindMobile
						})
					}else{
						console.log('进入了跳转页面')
						uni.switchTab({
							url: '../home/index',
						})
					}
				} else {
					this.$toast(data.msg)
				}
				
			},
			navToFuc(type){
				if(type==1){
					navTo('/publicPages/pages/news/webView?url=https://app.xiaogebang.com/index.php/Api/Article/detail/id/81')
				}else{
					navTo('')
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	// 微信端登录按钮
	.wx-btn{
		background: $theme-c;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		border-radius: 40px;
		font-size: 16px;
	}
	
	.tip-wrap{
		font-size: 12px;
		color: #8f8f8f;
		text-align: center;
		line-height: 19px;
		padding-bottom: 55px;
		.tip-name{
			color: #000;
		}
	}
	
	.login-foot{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		.wx-login{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 13px;
			color: #7b7b7b;
			padding-bottom: 67rpx;
			.wx-icon{
				width: 40px;
				height: 40px;
				margin-top: 10px;
				border: none;
			}
			.wx-btn-v{
				position: relative;
				/deep/ uni-button:after {
					border: none!important;
				}
				.wx-btn-b {
					width: 100rpx;
					height: 100rpx;
					background-color: transparent;
					border-radius: 50%;
					position: absolute;
					top: 10rpx;
					left: -10rpx;
					border: none!important;
					z-index: 333!important;
				}
			}
			
		}
	}
	
	.btn-wrap{
		padding: 56rpx 34px 0;
	}
	
	.mobile-wrap{
		padding: 0 34px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 15px;
		.change-mobile{
			color: $theme-c;
		}
	}
	.title{
		font-size: 24px;
		color: #333;
		padding: 220rpx 34px 110rpx;
	}
</style>

<style>
	page{
		background-color: #fff;
	}
</style>
