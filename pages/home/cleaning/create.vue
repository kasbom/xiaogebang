<template>
	<view class="">
		<u-gap height="20"></u-gap>
		<view class="addr" @click="navToPage(1)" >
			<view class="addr-left" >
				<image src="../../../static/images/index/addr.png" class="addr-icon" mode=""></image>
				<view class="">
					<view class="fz16 h1">{{groupDetail.address&&groupDetail.address.address||''}}</view>
					<view class="fz13 h2">{{groupDetail.address&&groupDetail.address.name ||''}}  {{groupDetail.address&&groupDetail.address.mobile||''}}</view>
				</view>
			</view>
			<view class="more">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		
		<u-cell-group>
			<u-cell-item :title="groupDetail.info&&groupDetail.info.name" :value="`￥${groupDetail.info&&groupDetail.info.price}`" :arrow="false"></u-cell-item>
			<u-cell-item title="服务时间" :value="`${groupDetail.serviceTimeText}`" :arrow="false"></u-cell-item>
		</u-cell-group>
		
		<u-gap height="20"></u-gap>
		
		<u-cell-group>
			<u-field
				v-model="params.remark"
				label="备注"
				placeholder="请填写备注"
			>
			</u-field>
		</u-cell-group>
		
		<u-gap height="20"></u-gap>
		<view class="" @click="navToPage(2)">
			<u-cell-group>
				<u-cell-item title="服务金额" :value="`￥${groupDetail.info&&groupDetail.info.price}`" :arrow="false"></u-cell-item>
			</u-cell-group>
			<view class="coupon_box">
				<view >
					优惠券
				</view>
				<view class="coupon_item">
					<u-dropdown ref="uDropdown" @open="open" @close="close">
						<u-dropdown-item v-model="coupon_idObj" :title="`${coupon_name}`" :options="couponArr" @change="change"></u-dropdown-item>
					</u-dropdown>
				</view>
			</view>
		</view>
		
		<view class="submit">
			<view class="price fz14">
				<text class="h1 fz14">实付：</text>
				<text class="h99">{{`￥${groupDetail.info&&groupDetail.info.price}`}}</text>
			</view>
			
			<m-button title="提交订单 " @handleClick="submitOrder" size="mini" :css="{'border-radius': '27px', height: '27px'}"></m-button>
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
					id:null,
					date:null,
					type:null,
					time_type:null,
					group_type:null,
					coupon_id:null,
					address_id:null,
					remark:null,
				},
				groupDetail:{
					address: {
						address: '',
						name: '',
						mobile: ''
					}
				},
				couponArr:[],
				coupon_name:'',
				coupon_idObj:{}
			}
		},
		onShow(){
		     uni.$on('handleSelectAddr', (res) => {
				 this.$set(this.groupDetail.address, 'address', res.address)
				 this.$set(this.groupDetail.address, 'name', res.name)
				 this.$set(this.groupDetail.address, 'mobile', res.mobile)
				this.groupDetail.address.id=res.id
				
		     })
			 // let handleSelectCoup= getToken('handleSelectCoup')
			 // console.log(handleSelectCoup)
			 // if(handleSelectCoup&&handleSelectCoup!=null){
				//  this.params.coupon_id=handleSelectCoup.id
				//  this.$set(this.groupDetail.coupon[0],'name',handleSelectCoup.name)
				//  this.getPrice()
				 
			 // }
			
		},
		onLoad(option){
			this.params.city_id=option.city_id
			this.params.id=option.id
			this.params.type=option.type
			this.params.time_type=option.time_type
			this.params.date=option.date
			this.params.time=option.time
			this.params.group_type=option.group_type
			this.params.store_id=getToken('store_id')
			this.getInfo()
		},
		methods:{
			async getInfo(){
				let that=this
				const { statusCode, data, message } = await that.$u.api.getOrderCreate(that.params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					that.groupDetail=data.data
					let newCoup=[]
					if(that.groupDetail.coupon!=null&&that.groupDetail.coupon.length>0){
						that.groupDetail.coupon.map(item=>{
							let obj={}
							obj.label=item.name
							obj.value=item.id
							newCoup.push(obj)
						})
						that.couponArr=newCoup
					}
					that.params.address_id=that.groupDetail.address.id
				} else {
					that.$toast(data.msg||msg)
				}
			},
			navToPage(type){
				let url=''
				// if(type==1){
				// 	url='/publicPages/pages/address/index?type=select'
				// }else{
				// 	url='/pages/center/coupon/receiveMy?type=select'
				// }
				if(type==1){
					url='/publicPages/pages/address/index?type=select'
				}
				uni.navigateTo({
					url
				})
			},
			
			async submitOrder(){
				let that=this
				const { statusCode, data, message } = await this.$u.api.getOrderSubmit(this.params,true,{'content-type': 'application/x-www-form-urlencoded'})
				if (statusCode === 200&&data.error==0 ) {
					uni.navigateTo({
						url: `/pages/order/yuesao/pay?order_id=${data.orderId}&id=${this.params.id}&type=${this.params.type}`
					})
					setToken('handleSelectCoup',null)
				} else {
					that.$toast(data.msg||msg)
					setToken('handleSelectCoup',null)
				}
			},
			async getPrice(){
				let that=this
				
				  let paramsObj={
					  id:this.params.id,
					  city_id:this.params.city_id,
					  type:this.params.type,
					  coupon_id:this.params.coupon_id,
					  group_type:this.params.group_type
				  }
				const { statusCode, data, message } = await this.$u.api.countPrice(paramsObj,true)
				if (statusCode === 200&&data.error==0 ) {
					that.groupDetail.info.price=data.price
					
				} else {
					that.$toast(data.msg||msg)
					setToken('handleSelectCoup',null)
				}
			},
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			change(item) {
				// console.log(this.params.coupon_id)
				// console.log(item.value)
				console.log(this.params.coupon_id)
				if(item.value==this.params.coupon_id){
					this.params.coupon_id=''
					this.coupon_name=''
				}else{
					this.params.coupon_id=item.value
					this.coupon_name=item.label
					this.getPrice()
				}
				
				// 更多的细节，如有需要请自行根据业务逻辑进行处理
				// this.$refs.uDropdown.highlight(xxx);
			}
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
		z-index: 999!important;
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
	.coupon_box {
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 100rpx;
		background-color: #FFFFFF;
		.coupon_item{
			min-width: 60%;
		}
	}
	/deep/ .u-dropdown__content,.u-dropdown__content__popup {
		width:96vw!important;
		box-sizing: border-box!important;
	}
	/deep/ .u-dropdown__menu__item{
		    justify-content: space-between;
		    flex-direction: row-reverse;
	}
</style>
