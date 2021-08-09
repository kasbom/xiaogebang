<template>
	<view>
		<view class="title">
			<view class="title-text">登录/注册</view>
			<view class="title-tip">hi，欢迎来到小哥帮</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="form-wrap">
			<u-form :model="form" ref="uForm">
				<u-form-item label="手机号" prop="mobile" label-width="120">
					<u-input :focus="true" v-model="form.mobile" placeholder="请输入手机号"  @input="phoneChange"/>
				</u-form-item>
			</u-form>
		</view>
		<!-- #endif -->
		
		<view class="btn-wrap">
			<!-- #ifdef APP-PLUS -->
			<m-button title="获取验证码" :css="{'border-radius': '40px'}" :style="{'background':isPhone?'#ffc576':'#ff6a00' }"  :disabled="isPhone" @handleClick="handleLogin"></m-button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button style="border-radius: 40px;background:#ff6a00;color:#FFFFFF" open-type="getPhoneNumber"  @getphonenumber="getPhoneNumberClick">手机号码一键登录</button>
			<!-- #endif -->
		</view>
		
		<view class="login-foot">
			<view class="wx-login">
				<view class="wx-login-text">其它登录方式</view>
				<view class="wx-btn-v">
					<view class="wx-btn-box">
						<view class="">
							<image src="../../static/images/wx.png" class="wx-icon" mode=""></image>
							<!-- #ifdef MP-WEIXIN -->
							<button type="primary" class="wx-btn-b" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx"></button>
							<!-- #endif -->
							<!-- #ifdef APP-PLUS -->
							 <button type="primary" class="wx-btn-b"  @click="login"></button>
							<!-- #endif -->
						</view>
						
						<!-- ios 13以上的系统才支持 apple 授权登录 -->
						<view class="c-apple-login-btn" v-if="system"  @click="appleAuth">
							<image style="width: 300rpx; background-color: #eeeeee;margin: 30rpx 0 0 40rpx"  src="/static/images/appleLogin.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
				
			</view>
			<view class="tip-wrap">
				
				<u-checkbox-group>
					<u-checkbox v-model="agreeFlag" name="1" inactive-color="#eeeeee"
						active-color="#ff5000"  label-size="24rpx">
						请阅读并同意
					</u-checkbox>
				</u-checkbox-group>
				<view><text class="tip-name" @click="navToFuc(1)">《小哥帮隐私政策》</text></view>
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
				system: false, // 系统版本
				platform: '', // 平台
				identityToken: '',
				agreeFlag:false,
				code:'',
			}
		},
		onLoad(option){
			if(option.bindMobile){
				this.bindMobile=option.bindMobile
				this.form.sendType=4
			}
			
			if(option.inv_id)this.inv_id=option.inv_id
			uni.getProvider({
				service:"oauth",
				success: (res) => {
					if(res.provider.includes('apple')){
						this.system=true
					}
				},
				fail: (err) => {},
				complete: () => {}
			})
			// #ifdef MP-WEIXIN
			uni.login({
			  provider: 'weixin',
			  success: async (loginRes) => {
				  this.code=loginRes.code
			  }
			});
			// #endif
		},
		onShow() {
			removeToken('city_id')
			removeToken('store_id')
			removeToken('token')
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
				
                if (!this.agreeFlag) return this.$toast('请阅读并同意小哥帮隐私政策')
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
			getPhoneNumberClick(e){
				if (!this.agreeFlag) return this.$toast('请阅读并同意小哥帮隐私政策')
				let params={
				  data:e.detail.encryptedData,
				  iv:e.detail.iv,
				  code:this.code,
				  type:1,
			    }
			    this.loginFunWx(params)
				// uni.login({
				//   provider: 'weixin',
				//   success: async (loginRes) => {
				// 	  let params={
				// 		  data:e.detail.encryptedData,
				// 		  iv:e.detail.iv,
				// 		  code:loginRes.code,
				// 		  type:1,
				// 	  }
				//     console.log(params);
				// 	uni.showToast({
				// 		  title: '这是手机号码登录',
				// 		  icon: 'none',
				// 		  mask: true,
				// 		  duration:3000,
				// 		  success: () => {
				// 			  setTimeout(()=>{
				// 				  this.loginFunWx(params)
				// 			  },3000)
				// 		  },
				// 	  })
				//     // 获取用户信息
				//   }
				// });
				  
			},
			// 微信端获取手机号
			appLoginWx(){
				if (!this.agreeFlag) return this.$toast('请阅读并同意小哥帮隐私政策')
				console.log('微信点击了')
				Utils.appLoginWxCommon().then(res=>{
					console.log('微信获取了'+res)
					if(this.inv_id!=null)res.inv_id=this.inv_id
					this.loginFun(res)
				})
				
			},
			
			login() {
				if (!this.agreeFlag) return this.$toast('请阅读并同意小哥帮隐私政策')
				Utils.loginCommon().then(res=>{
					let data={code: res,type:1}
					this.appLoginFun(data)
				})
				
			},
			async appLoginFun(newParams){
				let that =this
				console.log(newParams)
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
			async loginFunWx(params){
				
				const { statusCode, data, message } =await this.$u.api.wechatPhone(params)
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
							uni.showToast({
							  title: '请绑定手机号',
							  icon: 'none',
							  mask: true,
							  duration:3000,
							  success: () => {
							  	setTimeout(()=>{
									uni.navigateTo({
										url: '/pages/login/getCode?bindMobile='+data.userInfo.bindMobile
									})
								},3000)
							  }
							})
							
							
						}else{
							uni.switchTab({
								url: '../home/index',
							})
						}
					// #endif
					// await this.$store.dispatch('getUserInfo', this)
					
					// 根据选择身份跳转
					// const userInfo = this.$store.state.userInfo
					// switchId(data.userInfo)
				} else {
					this.$toast(data.msg)
				}
				
			},
			async loginFun(params,type){
				const { statusCode, data, message } =this.system&&type?await this.$u.api.appleLogin(params):await this.$u.api.miniWechat(params)
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
							uni.showToast({
							  title: '请绑定手机号',
							  icon: 'none',
							  mask: true,
							  duration:3000,
							})
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
					  this.pushIdFunc(data.userInfo,type||false)
					// #endif
					
					
					// await this.$store.dispatch('getUserInfo', this)
					
					// 根据选择身份跳转
					// const userInfo = this.$store.state.userInfo
					// switchId(data.userInfo)
				} else {
					this.$toast(data.msg)
				}
				
			},
			async pushIdFunc(userInfo,type){
				let clientid = getToken('clientid')
				console.log(clientid)
				const { statusCode, data, message } = await this.$u.api.pushId({clientid:clientid})
				console.log(statusCode)
				console.log(data)
				console.log(data.error)
				if (statusCode === 200&&data.error==0) {
					console.log(userInfo.bindMobile&&userInfo.bindMobile==0&&(!type))
					if(userInfo.bindMobile&&userInfo.bindMobile==0&&(!type)){
						uni.showToast({
						  title: '请绑定手机号',
						  icon: 'none',
						  mask: true,
						  duration:3000,
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
				let that=this
			    if (!that.agreeFlag) return this.$toast('请阅读并同意小哥帮隐私政策')
				uni.login({
					provider: 'apple',
					success: loginRes => {
						uni.getUserInfo({
							provider: 'apple',
							success: (userInfoRes) => {
				                // 获取 identityToken
								if (userInfoRes.userInfo && userInfoRes.userInfo.identityToken) {
									// 请求后台
									that.loginFun({identityToken:userInfoRes.userInfo.identityToken,type:1},true)
								}
							},
							fail: (err) => {
								that.$ShowToast('登录失败')
							}
						})
					},
					fail: (err) => {
						that.$ShowToast('登录失败')
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
			display: flex;
			justify-content: center;
			align-items: center;
			.tip-name{
				color:rgb(255, 197, 118);
			}
		}
		.wx-login{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 13px;
			color: #7b7b7b;
			padding-bottom: 90rpx;
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
				.wx-btn-box {
					display: flex;
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
				.c-apple-login-btn {
					width: calc(100%-100rpx);	
				}
				/deep/button::after { border: none }
			}
			
		}
	}
	.btn-wrap{
		padding: 56rpx 34px 0;
	}
	
</style>

<style>
	page{
		background-color: #fff;
	}
</style>
