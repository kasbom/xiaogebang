<template>
	<view>
		<view class="title">
			<view class="title-text">登录/注册</view>
			<view class="title-tip">hi，欢迎来到小哥帮</view>
		</view>
		
		<view class="form-wrap">
			<u-form :model="form" ref="uForm">
				<u-form-item label="手机号" prop="mobile" label-width="120">
					<u-input :focus="true" v-model="form.mobile" placeholder="请输入手机号"  @input="phoneChange"/>
				</u-form-item>
			</u-form>
		</view>
		
		<view class="btn-wrap">
			<m-button title="获取验证码" :css="{'border-radius': '40px'}" :style="{'background':isPhone?'#ffc576':'#ff6a00' }"  :disabled="isPhone" @handleClick="handleLogin"></m-button>
		</view>
		<!-- ios 13以上的系统才支持 apple 授权登录 -->
		<view class="c-apple-login-btn" v-if="system >= 13 && platform=='ios'" @click="appleAuth">
			<!-- <image class="icon" src="/static/images/icon/User/apple.png" mode=""></image> -->
			<text>通过</text>
			<text class="Apple">Apple</text>
			<text>登录</text>
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
				<view>未注册的手机号验证后将自动创建小哥帮账号登录即代表您</view>
				<view>已同意<text class="tip-name" @click="navToFuc(1)">《小哥帮隐私政策》</text></view>
			</view>
		</view>
		
		<!-- 获取验证码 -->
		<!-- <u-verification-code ref="uCode" @change="codeChange"></u-verification-code> -->
	</view>
</template>

<script>
	import config from '../../config'
	console.log(config)
	import switchId from '@/utils/switchId.js'
	import {navTo,removeToken,getToken,setToken} from '@/utils/common.js'
	import Utils from '@/utils'
	export default {
		data() {
			return {
				form: {
					mobile: '',
					sendType: 1,//类型 1 登录注册 2 修改手机 3 修改密码
					type: 1,// 1 客户端APP 2 服务端APP
				},
				mobile: '',
				code: '',
				codeText: '',
				isPhone:true,
				bindMobile:null,
				inv_id:null,
				system: '', // 系统版本
				platform: '', // 平台
				identityToken: ''
			}
		},
		onLoad(option){
			if(option.bindMobile){
				this.bindMobile=option.bindMobile
				this.form.sendType=4
			}
			removeToken('city_id')
			removeToken('store_id')
			removeToken('token')
			if(option.inv_id)this.inv_id=option.inv_id
			uni.getSystemInfo({
				success: (res) => {
					this.system = res.system || ''
					this.platform = res.platform || ''
				},
				fail: (err) => {},
				complete: () => {}
			})
		},
		methods: {
			phoneChange(){
				if (!this.$u.test.mobile(this.form.mobile)){
					this.isPhone=true
				}else{
					this.isPhone=false
				}
			},
			// 获取验证码
			codeChange(text) {
				this.codeText = text;
			},
			async getCode() {
				if(this.$refs.uCode.canGetCode) {
					if (!this.$u.test.mobile(this.form.mobile)) return this.$toast('请输入正确手机号')
					
					uni.showLoading({
						title: '正在获取验证码'
					})
					
					
				} else {
					this.$toast('倒计时结束后再发送');
				}
			},
			// 登录
			async handleLogin() {
				
				
				
				const params = JSON.parse(JSON.stringify(this.form))
				if (!this.$u.test.mobile(params.mobile)) return this.$toast('请输入正确手机号')
				
				const { statusCode, data } = await this.$u.api.sendLoginCode(params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0) {
					this.$toast('发送成功')
					uni.navigateTo({
						url: '/pages/login/submitCode?phoneNum='+params.mobile+'&str='+data.randStr+'&bindMobile='+this.bindMobile
					})
					return
				} else {
					this.$toast(data.msg)
				}
			},
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
			},
			// 苹果授权登录
			appleAuth() {
				uni.login({
					provider: 'apple',
					success: loginRes => {
						uni.getUserInfo({
							provider: 'apple',
							success: (userInfoRes) => {
				// 获取 identityToken
								if (userInfoRes.userInfo && userInfoRes.userInfo.identityToken) {
									// 请求后台
									uni.request({
										url: config.baseURL+'/Login/appleLogin', //仅为示例，并非真实接口地址。
										data: {
											identityToken
										},
										success: (res) => {}
									});
								}
							},
							fail: (err) => {
								this.$ShowToast('登录失败')
							}
						})
					},
					fail: (err) => {
						this.$ShowToast('登录失败')
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.form-wrap{
		padding: 0 34px;
		.get-code{
			font-size: 13px;
			color: $theme-c;
		}
	}
	.title{
		padding: 38px 34px 44px;
		.title-text{
			font-size: 24px;
			color: #333;
		}
		.title-tip{
			font-size: 15px;
			color: #7b7b7b;
			padding-top: 12px;
		}
	}
	.login-foot{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
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
		.wx-login{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 13px;
			color: #7b7b7b;
			padding-bottom: 20rpx;
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
	.c-apple-login-btn {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			margin: 30upx auto;
			width: 360upx;
			height: 80upx;
			line-height: 80upx;
			border-radius: 12upx;
			background-color: #000000;
	
			.icon {
				position: relative;
				top: -2upx;
				margin-right: 15upx;
				width: 26upx;
				height: 26upx;
			}
	
			text {
				color: #ffffff;
				font-size: 32upx;
				font-weight: bold;
			}
	
			.Apple {
				margin: 0 6upx;
			}
		}
</style>

<style>
	page{
		background-color: #fff;
	}
</style>
