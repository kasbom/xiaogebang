<template>
	<view class="">
		<u-gap height="20"></u-gap>
		<u-cell-group>
			<u-cell-item title="合同编号" :value="contractDetail.contract_code" :arrow="false"></u-cell-item>
			<u-cell-item title="合同有效期" :value="`${content_var.start_time||'暂无'}~${content_var.end_time||'暂无'}`" :arrow="false"></u-cell-item>
			<u-cell-item title="签约日期" :value="contractDetail.sign_time" :arrow="false"></u-cell-item>
			<u-cell-item title="付款计划" :value="contractDetail.pay_method" :arrow="false"></u-cell-item>
			<u-cell-item title="服务费" :value="contractDetail.price" :arrow="false"></u-cell-item>
			<u-cell-item title="合同金额" :value="contractDetail.wages" :arrow="false"></u-cell-item>
		</u-cell-group>
		<u-gap height="20"></u-gap>
		<u-cell-group>
			<u-cell-item title="保姆服务协议" value="查看"></u-cell-item>
		</u-cell-group>
		<view class="btn-wrap">
			<m-button @handleClick="submitClick" title="我已阅读并同意,签署合同" size="max"></m-button>
		</view>
	</view>
</template>

<script>
	import {navTo} from '@/utils/common.js'
	export default {
		data() {
			return {
				params:{
					id:0,
				},
				contractDetail:{},
				content_var:{},
				
			}
		},
		onLoad(option){
			this.params.id= option.id
			this.getInfo()
		},
		methods:{
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getContractDetail(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.contractDetail=data.data
					this.content_var=this.contractDetail.content_var
					
				} else {
					this.$toast(data.msg||msg)
				}
			},
			submitClick(){
				navTo(`/pages/order/yuesao/sign?id=${this.params.id}&order_id=${this.contractDetail.order_id}`)
			}
		}
	}
</script>

<style>
	.btn-wrap {
		width: 100%;
		position: absolute;
		bottom: 0;
		
	}
</style>
