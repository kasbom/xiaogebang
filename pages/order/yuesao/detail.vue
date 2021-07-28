<template>
	<view>
		<u-gap height="20"></u-gap>
		<u-cell-group>
			<u-cell-item :title="contractDetail.typeText" :value="contractDetail.aunt_name" :arrow="false"></u-cell-item>
			<u-cell-item title="薪资" :value="contractDetail.wages" :arrow="false"></u-cell-item>
			<u-cell-item title="平台服务费" :value="contractDetail.price" :arrow="false"></u-cell-item>
		</u-cell-group>
		<u-gap height="20"></u-gap>
		<u-cell-group>
			<u-cell-item title="签订日期" :value="contractDetail.add_time" :arrow="false"></u-cell-item>
			<u-cell-item title="服务周期" :value="contractDetail.month" :arrow="false"></u-cell-item>
			<u-cell-item title="付款方式" :value="contractDetail.pay_method" :arrow="false"></u-cell-item>
		</u-cell-group>
		<u-gap height="20"></u-gap>
		<u-cell-group>
			<u-cell-item title="业务员" :value="contractDetail.sale_name" :arrow="false"></u-cell-item>
		</u-cell-group>
		<u-gap height="20"></u-gap>
		<view class=""  @click="lookMore(contractDetail.content_var.id)">
			<u-cell-group>
				<u-cell-item title="三方服务合同协议" value="查看"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="btn-wrap">
			<m-button size="max" v-if="contractDetail.status==2" title="我已阅读并同意，签署合同" @handleClick="submitClick"></m-button>
			<m-button size="max" title="立即支付" v-if="contractDetail.status == 1 &&contractDetail.order_id > 0 " @handleClick="payClick"></m-button>
			
		</view>
	</view>
</template>

<script>
	import {navTo,getToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				params:{
					id:0,
				},
				contractDetail:{},
				type:0,
				token:'',
				
			}
		},
		onLoad(option){
			this.params.id= option.id
			this.type= option.type
			this.token=getToken('token')
			this.getInfo()
		},
		methods:{
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getContractDetail(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.contractDetail=data.data
					
				} else {
					this.$toast(data.msg||msg)
				}
			},
			
			submitClick(){
				navTo(`/pages/order/yuesao/sign?id=${this.contractDetail.id}&order_id=${this.contractDetail.order_id}&show=true&type=${this.type}`)
			},
			payClick(){
				navTo(`/pages/order/yuesao/pay?id=${this.contractDetail.id}&order_id=${this.contractDetail.order_id}`)
			},
			async lookMore(id){
				navTo('/pages/order/yuesao/webView?id='+id)
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn-wrap{
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
	}
</style>
