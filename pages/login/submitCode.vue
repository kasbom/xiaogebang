<template>
	<view>
		<view class="title">
			<view class="title-text">登录/注册</view>
			<view class="title-tip">验证码已发送至 +{{form.mobile}}</view>
		</view>
		
		<view class="form-wrap">
			<u-message-input mode="bottomLine" :focus="true" :value="form.code" :maxlength="6" :breathe="true" @change="codeChange" @finish="handleLogin"></u-message-input>
		</view>
		
	<!-- 	<view class="login-foot">
			<view class="tip-wrap">
				<u-checkbox-group>
					<u-checkbox v-model="agreeFlag" name="1" inactive-color="#eeeeee"
						active-color="#ff5000"  label-size="24rpx">
						请阅读并同意
					</u-checkbox>
				</u-checkbox-group>
				<view><text class="tip-name" @click="navToFuc(1)">《小哥帮隐私政策》</text></view>
			</view>
		</view> -->
		
		<!-- 获取验证码 -->
		<!-- <u-verification-code ref="uCode" @change="codeChange"></u-verification-code> -->
	</view>
</template>

<script>
	import switchId from '@/utils/switchId.js'
	import {randomString,getToken,setToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				form: {
					mobile: '',
					code: '',
					type:1,
					randStr:null,
				},
				mobile: '',
				code: '',
				codeText: '',
				loginType:'',
				bindMobile:null,
				agreeFlag:false,
			}
		},
		onLoad(option) {
			this.form.mobile=option.phoneNum
			this.form.randStr=option.str
			this.loginType=option.type
			this.bindMobile=option.bindMobile
		},
		methods: {
			codeChange(e){
				// if (!this.agreeFlag) return this.$toast('请阅读并同意小哥帮隐私政策')
				this.form.code=e
			},
			// 登录
			async handleLogin(code) {
				const params = JSON.parse(JSON.stringify(this.form))
				params.code = code
					const { statusCode, data, message } =this.bindMobile==null||this.bindMobile=="null"? await this.$u.api.login(params):await this.$u.api.bindMobile(params)
					if (statusCode === 200&&data.error==0) {
						this.$toast('登录成功')
						const token = data.token
						console.log(token)
						this.$store.commit('SET_TOKEN', token)
						uni.setStorageSync('token', token)
						this.$store.commit('SET_USER_INFO', data.userInfo)
						// #ifdef APP-PLUS
						   this.pushIdFunc()
						// #endif
						// #ifdef MP-WEIXIN
							uni.switchTab({
								url: '../home/index',
							})
						// #endif
						// await this.$store.dispatch('getUserInfo', this)
						
						// 根据选择身份跳转
						// const userInfo = this.$store.state.userInfo
						// switchId(data.userInfo)
					} else {
						this.$toast(data.msg)
					}
			},
			async pushIdFunc(){
				let clientid = getToken('clientid')
				const { statusCode, data, message } = await this.$u.api.pushId({clientid:clientid})
				if (statusCode === 200&&data.error==0) {
					uni.switchTab({
						url: '../home/index',
					})
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
