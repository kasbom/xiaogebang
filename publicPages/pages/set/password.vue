<template>
	<view>
		<view class="form">
			<view class="" v-if="!nextShow">
				<u-field
					v-model="mobileStr"
					label="手机号"
					placeholder="请填写手机号"
					
				>
				</u-field>
				<u-field
					v-model="smscode"
					label="验证码"
					placeholder="请填写验证码"
					@blur="smscodeBlur"
				>
					<m-button size="mini" slot="right" :title="codeText" @handleClick="getCodePrev(1)"></m-button>
				</u-field>
			</view>
			<view class="" v-else>
					<u-field
						v-model="mobileStrNew"
						label="新手机号"
						placeholder="请填写手机号"
					>
					</u-field>
					<u-field
						v-model="code"
						label="验证码"
						placeholder="请填写验证码"
					>
						<m-button size="mini" slot="right" :title="codeText" @handleClick="getCodePrev(2)"></m-button>
					</u-field>
					
					<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
				</view>
				
				<view class="btn-wrap">
					<m-button title="设置" @handleClick="setMobile"></m-button>
				</view>
			</view>
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5"
	export default {
		data() {
			return {
				form: {
					mobile: '',
					sendType: 2,//类型 1 登录注册 2 修改手机 3 修改密码
					type: 1,// 1 客户端APP 2 服务端APP
				},
				smscode: '',
				code:'',
				mobileStr: '',
				mobileStrNew: '',
				password: '',
				codeText: '获取验证码',
				randStr:'',
				nextShow:false
				
			}
		},
		onLoad() {
			// const userInfo = this.$store.state.userInfo
			// this.mobile = userInfo.mobile
			// this.mobileStr = `${userInfo.mobile.substr(0, 3)} **** ${userInfo.mobile.substr(7, 4)}`
			
			uni.$on('handleTicketChange', res => {
				this.getCode(res)
			})
		},
		onUnload() {
			uni.$off('handleTicketChange')
		},
		methods: {
			smscodeBlur(){
				if(this.mobileStr!=''){
					this.nextShow=true
				}
			},
			codeChange(text) {
				this.codeText = text;
			},
			
			
			// 登录
			async getCodePrev(type) {
				
				const params = JSON.parse(JSON.stringify(this.form))
				if(type==1){
					if (!this.$u.test.mobile(this.mobileStr)) return this.$toast('请输入正确手机号')
					params.mobile=this.mobileStr
					const { statusCode, data } = await this.$u.api.sendLoginCode(params,true,{'content-type': 'application/x-www-form-urlencoded'})
					if (statusCode === 200&&data.error==0) {
						this.$toast('发送成功')
						
					} else {
						this.$toast(data.msg)
					}
				}else{
					if(this.smscode=='') return this.$toast('请输入正确验证码')
					if (!this.$u.test.mobile(this.mobileStrNew)) return this.$toast('请输入正确手机号')
					params.mobile=this.mobileStrNew
					const { statusCode, data } = await this.$u.api.sendLoginCode(params,true,{'content-type': 'application/x-www-form-urlencoded'})
					if (statusCode === 200&&data.error==0) {
						this.$toast('发送成功')
						this.randStr=data.randStr
					} else {
						this.$toast(data.msg)
					}
				}
				
			},
			async setMobile(){
				let params={
					mobile:this.form.mobile,
					code:this.code,
					randStr:this.randStr
				}
				const { statusCode, data, message } = await this.$u.api.setMobile(params)
				if (statusCode === 200 &&data.error==0) {
					this.$toast('设置成功')
				} else {
					this.$toast(data.msg)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.form{
		background-color: #fff;
		padding: 0 12px;
		margin: 10px 0 40px;
	}
	.btn-wrap{
		padding: 0 12px;
	}
</style>
