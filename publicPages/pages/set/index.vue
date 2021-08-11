<template>
	<view class="">
		<view class="list">
			<u-cell-group>
				<u-cell-item title="更换手机号" :value="userInfoObj.mobile" @click="changePhone"></u-cell-item>
				<u-cell-item
					title="绑定微信"
					:arrow="false"
				>
					<view slot="right-icon">
						<text v-if="userInfoObj.bind_wechat==1">已绑定</text>
						<u-switch v-else v-model="checkedWx.checked" size="40"  @change="setWechatApp" active-color="#57be6a"></u-switch>
						
					</view>
				</u-cell-item>
				<u-cell-item
					title="消息通知"
					:arrow="false"
				>
					<view slot="right-icon">
						<u-switch v-model="checkedNews.checked" @change="setNotice" size="40" active-color="#57be6a"></u-switch>
					</view>
				</u-cell-item>
				<u-cell-item title="版本更新" :value="userInfoObj.unionid"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="btn fz15 h1" @click="loginOut">退出登录</view>
	</view>
</template>

<script>
	import Utils from '@/utils'
	export default {
		data() {
			return {
				checkedWx: {
					checked:false
				},
				checkedNews:{
					checked:false
				},
				userInfoObj:{},
			}
		},
		onLoad(){
			this.getUserInfo()
		},
		methods: {
			changePhone() {
				uni.navigateTo({
					url: '/publicPages/pages/set/password'
				})
			},
			handleSelectId() {
				uni.reLaunch({
					url: '/pages/login/selectId'
				})
			},
			async loginOut(){
				uni.removeStorageSync('inv_id')
				const { statusCode, data, message } = await this.$u.api.loginOut({})
				if (statusCode === 200 &&data.error==0) {
					uni.reLaunch({
						url:'/pages/login/getCode'
					})
				} else {
					this.$toast(data.msg)
				}
			},
			async getUserInfo(){
				const { statusCode, data, message } = await this.$u.api.getUserInfo({})
				if (statusCode === 200 &&data.error==0) {
					this.userInfoObj=data.data
					this.checkedWx.checked=this.userInfoObj.bind_wechat==0?false:true
					this.checkedNews.checked=this.userInfoObj.is_notice==0?false:true
				} else {
					this.$toast(data.msg)
				}
			},
			async setNotice(value){
				let status=value?1:0
				console.log(status)
				const { statusCode, data, message } = await this.$u.api.setNotice({status:status })
				console.log(value)
				if (statusCode === 200 &&data.error==0) {
					this.$toast(value?'已开启':'已关闭')
				} else {
					this.$toast(data.msg)
				}
			},
			setWechatApp(){
				// #ifdef APP-PLUS
				  Utils.loginCommon().then(res=>{
				  	let params={code:res,type:1}
				  	this.wechatApp(params)
				  })
				// #endif
				// #ifdef MP-WEIXIN
				Utils.appLoginWxCommon().then(res=>{
					this.miniWechat(res)
				})
				// #endif
			},
			async miniWechat(params){
				const { statusCode, data, message } = await this.$u.api.miniWechat(params)
				if (statusCode === 200&&data.error==0) {
					this.$toast('已绑定')
				} else {
					this.$toast(data.msg)
				}
				
			},
			async wechatApp(params){
				console.log(params)
				const { statusCode, data, message } = await this.$u.api.wechat(params)
					if (statusCode === 200 &&data.error==0) {
						this.$toast('已绑定')
					} else {
						this.$toast(data.msg)
					}
			}
		}
	}
</script>

<style scoped lang="scss">
	.list{
		margin-top: 10px;
	}
	.btn{
		width: 750rpx;
		height: 50px;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
	}
</style>
