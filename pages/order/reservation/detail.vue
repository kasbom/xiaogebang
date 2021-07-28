<template>
	<view class="">
		<u-gap height="20"></u-gap>
		<view class="addr">
			<view class="addr-left"  @click="navToPage">
				<image src="../../../static/images/index/addr.png" class="addr-icon" mode=""></image>
				<view class="">
					<view class="fz16 h1">{{recordingDetail.address}}</view>
					<view class="fz13 h2">{{recordingDetail.kf_name}}  {{recordingDetail.kf_mobile}}</view>
				</view>
			</view>
			<view class="more">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		
		<u-cell-group>
			<u-cell-item :title="recordingDetail.type_text" :arrow="false"></u-cell-item>
			<u-cell-item title="服务时间" :value="recordingDetail.service_date" :arrow="false"></u-cell-item>
			<u-field
				v-model="params.remark"
				label="备注"
				placeholder="请填写备注"
			>
			</u-field>
		</u-cell-group>
		
		<u-gap height="20"></u-gap>
		<u-cell-group>
			<u-cell-item title="服务状态" :value="recordingDetail.status_text" :arrow="false"></u-cell-item>
		</u-cell-group>
		
		<view class="submit">
			<view class="price fz14">
				<text class="h1 fz14">实付：</text>
				<text class="h99">￥{{recordingDetail.price}}</text>
			</view>
			
			<m-button v-if="recordingDetail.status==1" title="提交订单" size="mini" :css="{'border-radius': '27px', height: '27px'}"></m-button>
		</view>
	</view>
</template>

<script>
	import {navTo,getToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				params:{
					city_id:null,
					id:null,
					date:null,
					type:null,
					time_type:null,
					group_type:null,
					coupon_id:null,
					address_id:null,
					remark:null,
				},
				recordingDetail:{},
				
			}
		},
		onLoad(option){
			this.params.id=option.id
			this.params.store_id=getToken('store_id')
			
			this.getInfo()
		},
		methods: {
			navToPage(type){
				navTo('/pages/address/index')
			},
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getSubscribeDetail(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.recordingDetail=data.data
					
				} else {
					this.$toast(data.msg||msg)
				}
			},
			async submitOrder(){
				let that=this
				const { statusCode, data, message } = await this.$u.api.getOrderSubmit(this.params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					that.$toast('预约成功')
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
