<template>
	<view class="">
		<u-gap height="20"></u-gap>
		<view class="addr" @click="navToPage(1)">
			<view class="addr-left" >
				<image src="../../../static/images/index/addr.png" class="addr-icon" mode=""></image>
				<view class="">
					<view class="fz16 h1">{{addressInfo.address}}</view>
					<view class="fz13 h2">{{addressInfo.name}}  {{addressInfo.mobile}}</view>
				</view>
			</view>
			<view class="more">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		
		<u-cell-group>
			<u-cell-item :title="infoObj.name" :arrow="false"></u-cell-item>
			<u-cell-item title="服务时间" :value="infoDetail.serviceTimeText" :arrow="false"></u-cell-item>
			<u-field
				v-model="text"
				label="备注"
				placeholder="请填写备注"
			>
			</u-field>
		</u-cell-group>
		
		<view class="submit">
			<view class="price fz14">
			</view>
			
			<m-button title="提交订单" @handleClick="submitOrder" size="mini" :css="{'border-radius': '27px', height: '27px'}"></m-button>
		</view>
	</view>
</template>

<script>
	import {navTo,getToken,setToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				text: '',
				params:{
					city_id:null,
					cate_id:null,
					id:null,
					date:null,
					type:null,
					time_type:null,
					group_type:null,
					coupon_id:null,
					address_id:null,
					remark:null,
				},
				addressInfo:{
					address: '',
					name: '',
					mobile: ''
				},
				couponArr:[],
				infoObj:{},
				infoDetail:{},
				
			}
		},
		onLoad(option){
			this.params.city_id=option.city_id
			this.params.cate_id=option.cate_id
			this.params.id=option.id
			this.params.type=option.type
			this.params.time_type=option.time_type
			this.params.date=option.date
			this.params.time=option.time
			this.params.store_id=getToken('store_id')
			this.getInfo()
		},
		onShow(){
		     uni.$on('handleSelectAddr', (res) => {
				 this.$set(this.addressInfo, res)
				 this.params.address_id=res.id
		     				
		     })
			 // let handleSelectCoup= getToken('handleSelectCoup')
			 // console.log(handleSelectCoup)
			 // if(handleSelectCoup&&handleSelectCoup!=null){
				//  this.params.coupon_id=handleSelectCoup.id
				//  this.$set(this.groupDetail.coupon[0],'name',handleSelectCoup.name)
				//  this.getPrice()
				 
			 // }
			
		},
        methods:{
			navToPage(type){
				let url=''
				if(type==1){
					url='/publicPages/pages/address/index?type=select'
				}
				uni.navigateTo({
					url
				})
			},
			async getInfo(){
				let that=this
				const { statusCode, data, message } = await this.$u.api.getOrderCreate(this.params,true)
				if (statusCode === 200&&data.error==0 ) {
					that.infoDetail=data.data
					that.addressInfo=that.infoDetail.address
					that.couponArr=that.infoDetail.coupon
					that.infoObj=that.infoDetail.info
					that.params.coupon_id=that.couponArr[0].id||null
					that.params.address_id=that.addressInfo.id
				} else {
					that.$toast(data.msg||msg)
				}
			},
			async submitOrder(){
				let that=this
				const { statusCode, data, message } = await this.$u.api.getOrderSubmit(this.params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					that.$toast('预约成功')
					navTo('/pages/order/service/serviceIndex?status=0&isBus=1')
					
				} else {
					that.$toast(data.msg||msg)
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.submit{
		padding: 10px 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.addr{
		background-color: #fff;
		padding: 15px;
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
				width: 25px;
				height: 25px;
				margin-right: 10px;
			}
		}
	}
</style>
