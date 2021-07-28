<template>
	<view>
		<u-navbar :is-back="false" title="个人中心" :border-bottom="false">
			<view class="nav-wrap" @click="toPage('/publicPages/pages/set/index')">
				<u-icon name="setting" size="40"></u-icon>
			</view>
		</u-navbar>
			
		
		<view class="addr">
			<view class="addr-left">
				<image @click="uploadImg" :src="headerImg" class="addr-icon" mode=""></image>
				<view class="">
					<view class="fz16 h1">{{userInfoObj.nickname||userInfoObj.user_type_text}}</view>
					<u-gap height="20"></u-gap>
					<view class="fz13 h2">{{userInfoObj.mobile}}</view>
				</view>
			</view>
			<view class="more">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		
		<u-gap height="20"></u-gap>
		
		<u-cell-group>
			<u-cell-item title="我的合同" @click="toPage('/pages/center/contract/index')">
				<image src="../../static/images/center/b1.png" class="list-icon" slot="icon" mode=""></image>
			</u-cell-item>
			<u-cell-item title="申请团长"  @click="toPage('/pages/center/share/index')">
				<image src="../../static/images/center/b2.png" class="list-icon" slot="icon" mode=""></image>
			</u-cell-item>
			<u-cell-item title="分销订单" @click="toPage('/pages/center/distribution/index')">
				<image src="../../static/images/center/b3.png" class="list-icon" slot="icon" mode=""></image>
			</u-cell-item>
			<u-cell-item title="我的优惠券" @click="toPage('/pages/center/coupon/receiveMy')">
				<image src="../../static/images/center/b4.png" class="list-icon" slot="icon" mode=""></image>
			</u-cell-item>
			<u-cell-item title="我的地址" @click="toPage('/publicPages/pages/address/index')">
				<image src="../../static/images/center/b5.png" class="list-icon" slot="icon" mode=""></image>
			</u-cell-item>
			<u-cell-item title="邀请有礼" @click="toPage('/pages/center/share/index')">
				<image src="../../static/images/center/b6.png" class="list-icon" slot="icon" mode=""></image>
			</u-cell-item>
			<u-cell-item title="我的消息" @click="toPage('/pages/center/news/index')">
				<image src="../../static/images/center/a1.png" class="list-icon" slot="icon" mode=""></image>
			</u-cell-item>
			<u-cell-item title="常见问题" @click="toPage('/publicPages/pages/help/index')">
				<image src="../../static/images/center/b7.png" class="list-icon" slot="icon" mode=""></image>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import config from '@/config'
	import {getToken} from '@/utils/common.js'
	export default {
		data(){
			return {
				token:'',
				userInfo:{},
				city_id:'',
				userInfoObj:{},
				headerImg:''
			}
		},
		onLoad() {
			this.userInfo=this.$store.state.userInfo
			this.token=getToken('token')
			this.city_id=getToken('city_id')
			this.getUserInfo()
		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			uploadImg(){
				let that=this
				let header = {}
				if (that.$store.state.token) header.token = that.$store.state.token
				uni.chooseImage({
				    count: 1, //默认9
				    success: function (res) {
						 uni.uploadFile({
							url: `${config.apiURL}/User/upImg`, //仅为示例，非真实的接口地址
							filePath:  res.tempFilePaths[0],
							name: 'file',
							header,
							formData: { type: 6 },
							success: (uploadFileRes) => {
								let newObj=JSON.parse(uploadFileRes.data)
								that.setImg({img:newObj.img})
							},
							fail(err){
								console.log(err)
							}
						});
				    }
				});
			},
			
			async setImg(params){
				const { statusCode, data, message } = await this.$u.api.setHeadPic(params)
				if (statusCode === 200 &&data.error==0) {
					this.getUserInfo()
					this.$toast('上传成功')
				} else {
					this.$toast(data.msg)
				}
			},
			async getUserInfo(){
				const { statusCode, data, message } = await this.$u.api.getUserInfo({})
				if (statusCode === 200 &&data.error==0) {
					this.userInfoObj=data.data
					this.headerImg=this.userInfoObj.head_pic
				} else {
					this.$toast(data.msg)
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-icon{
		width: 17px;
		height: 17px;
		margin-right: 12px;
	}
	.nav-wrap{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 12px;
		.nav-icon{
			width: 18px;
			height: 18px;
		}
	}
	.addr{
		background-color: #fff;
		padding: 40px 15px 25px ;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.more{
			flex-shrink: 0;
		}
		.addr-left{
			display: flex;
			align-items: center;
			.addr-icon{
				width: 60px;
				height: 60px;
				margin-right: 10px;
			}
		}
	}
</style>
