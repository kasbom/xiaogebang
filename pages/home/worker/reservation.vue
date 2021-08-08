<template>
	<view>
		<view class="wrap">
			<u-field
				v-model="params.name"
				label="姓名"
				required
				placeholder="请填写姓名"
			>
			</u-field>
			<u-field
				v-model="params.mobile"
				label="手机号"
				required
				placeholder="请填写手机号"
			>
			</u-field>
		</view>
		
		<view class="btn-wrap">
			<m-button @handleClick="getInfo" title="立即提交" size="max"></m-button>
		</view>
	</view>
</template>

<script>
	    import {navTo,getToken} from '@/utils/common.js'
		export default {
			data() {
				return {
					params:{
						mobile: '',
						name: '',
						type:0,
						store_id:0,
					},
					userInfoObj:{}
					
				}
			},
			onLoad(option){
				this.params.type= option.type
				this.params.city_id=getToken('city_id')
				this.params.store_id =uni.getStorageSync('store_id')
				this.getUserInfo()
			},
			methods:{
				async getUserInfo(){
					const { statusCode, data, message } = await this.$u.api.getUserInfo({})
					if (statusCode === 200 &&data.error==0) {
						this.userInfoObj=data.data
						this.params.mobile=this.userInfoObj.mobile
						this.params.name=this.userInfoObj.nickname||userInfoObj.user_type_text
					} else {
						this.$toast(data.msg)
					}
				},
				async getInfo(){
					if (!this.$u.test.mobile(this.params.mobile)) return this.$toast('请输入正确手机号')
					const { statusCode, data, message } =  await this.$u.api.subscribe(this.params,true)
					
					if (statusCode === 200&&data.error==0 ) {
						this.$toast('预约成功')
						uni.navigateTo({
							url:'/pages/order/yuesao/index?type='+this.params.type
						})
					} else {
						this.$toast(data.msg||msg)
					}
				},
				
			}
		}
</script>

<style scoped lang="scss">
	.wrap{
		background-color: #fff;
	}
	.btn-wrap{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
