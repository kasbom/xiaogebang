<template>
	<view class="wrap">
		<u-gap height="20"></u-gap>
		<view class="order-list">
			<view class="list-wrap">
				<image :src="taocanDetail.main_pic" mode="aspectFill" class="list-icon"></image>
				<view class="list-con">
					<view class="list-con-top">
						<view class="">
							<view class="name fz14 h1">{{taocanDetail.time_text||''}}</view>
							<view class="desc fz12 h3">{{taocanDetail.remainder||''}}次</view>
						</view>
						<view class="status theme-c fz12">{{taocanDetail.service_status_text||''}}</view>
					</view>
					<view class="price fz18 h99">￥{{taocanDetail.goods_price||''}}</view>
				</view>
			</view>
			<!-- <view class="order-info order-info-1">
				<view class="order-info-list order-info-list-1">
					<view class="order-info-list-label h3 h13">服务方式：</view>
					<view class="fz13 h1">固定每周六 上午</view>
				</view>
				<view class="order-info-list order-info-list-1">
					<view class="order-info-list-label h3 h13">剩余次数：</view>
					<view class="fz13 h1">29次</view>
				</view>
			</view> -->
		</view>
		<u-gap height="20"></u-gap>
		
		<view class="addr">
			<view class="addr-left">
				<image src="../../../static/images/index/addr.png" class="addr-icon" mode=""></image>
				<view class="">
					<view class="fz16 h1">{{taocanDetail.address||''}}</view>
					<view class="fz13 h2">{{taocanDetail.consignee||''}}  {{taocanDetail.mobile||''}}</view>
				</view>
			</view>
			<view class="more">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		
		<u-gap height="20"></u-gap>
		<!-- <view>
			<u-cell-group>
				<u-cell-item title="服务时间" value="05月18日 下午"></u-cell-item>
				<u-cell-item title="服务人员" value="李阿姨"></u-cell-item>
				<u-cell-item title="联系电话" value="13655556666"></u-cell-item>
			</u-cell-group>
		</view> -->
		
		<view class="order-info">
			<view class="order-info-list">
				<view class="order-info-list-label h3 h13">订单编号：</view>
				<view class="fz13 h1">{{taocanDetail.order_sn||''}}</view>
			</view>
			<view class="order-info-list">
				<view class="order-info-list-label h3 h13">下单时间：</view>
				<view class="fz13 h1">{{taocanDetail.submit_time||''}}</view>
			</view>
			<view class="order-info-list">
				<view class="order-info-list-label h3 h13">支付方式：</view>
				<view class="fz13 h1">{{taocanDetail.pay_name||''}}</view>
			</view>
			<view class="order-info-list">
				<view class="order-info-list-label h3 h13">支付时间：</view>
				<view class="fz13 h1">{{taocanDetail.pay_time}}</view>
			</view>
		</view>

		<!-- 费用详情 -->
		<view class="money-wrap">
			<view class="money-list-wrap">
				<view class="money-list">
					<view class="money-list-label fz13 h3">商品总额</view>
					<view class="money-list-value fz13 h1">￥{{taocanDetail.goods_price}}</view>
				</view>
				<view class="money-list">
					<view class="money-list-label fz13 h3">优惠</view>
					<view class="money-list-value fz13 h99">-￥{{taocanDetail.amount||0}}</view>
				</view>
				
				<view class="heji-money">
					<view class="fz14 h1">实付款</view>
					<view class="fz15 h99">￥{{taocanDetail.price}}</view>
				</view>
			</view>
		</view>
		
		<view class="btn-wrap">
			 <view class="btn gray" @click="toRecording">服务记录</view>
			 <view class="btn" v-if="Number(taocanDetail.remainder)>0&&taocanDetail.time_type==1" @click="toPriview">预约服务</view>
		</view>
		<m-time ref="mTime" :cellShow="false" @confirm="timeConfirm"></m-time>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					id:null,
				},
				paramsPreview:{
					date: null,
					id:0,
					time:null,
				},
				taocanDetail:{},
				
			}
		},
		onLoad(option){
			this.params.id=option.id
			this.getInfo()
		},
		methods: {
			toRecording() {
				uni.navigateTo({
					url: '/pages/order/setMeal/recording?id='+this.taocanDetail.id+'&type=2'
				})
			},
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getTaocanDetail(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.taocanDetail=data.data
				} else {
					this.$toast(data.msg||msg)
				}
			},
			toPriview() {
				this.$refs.mTime.open()
				
			},
			timeConfirm(e){
				this.paramsPreview.date=e[0].value.replace(/-/g,'')
				this.paramsPreview.time=e[1].value
				this.paramsPreview.id=this.taocanDetail.id
				this.priviewFunc()
			},
			async priviewFunc(){
				const { statusCode, data, message } =  await this.$u.api.taocanSubscribe(this.paramsPreview,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.$toast('预约成功!')
					this.getInfo()
				} else {
					this.$toast(data.msg||msg)
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding-bottom: 60px;
	}
	.btn-wrap{
		display: flex;
		justify-content: flex-end;
		padding: 10px 15px;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 9;
	}
	.btn{
		height: 30px;
		padding: 0 16px;
		border-radius: 15px;
		border: solid 1px #ff4b34;
		font-size: 13px;
		color: #ff4b34;
		display: flex;
		align-items: center;
		margin-left: 10px;
		&.gray{
			color: #666;
			border: solid 1px #666;
		}
	}
	// 费用相关
	.money-wrap{
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 15px 15px;
		margin-top: 10px;
		.money-list{
			display: flex;
			justify-content: space-between;
			padding: 5px 0;
		}
		.heji-money{
			display: flex;
			justify-content: space-between;
			padding-top: 15px;
		}
	}
	// 订单详情
	.order-info{
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 15px 15px;
		margin-top: 10px;
		.order-info-list{
			display: flex;
			padding: 5px 0;
			.order-info-list-label{
				margin-right: 20px;
			}
		}
		&.order-info-1{
			padding: 0;
			border-top: 1px solid #eaeaea;
			border-radius: 0;
		}
		.order-info-list-1{
			justify-content: space-between;
		}
	}
	
	.order-list{
		padding: 15px;
		background-color: #fff;
		.list-wrap{
			display: flex;
			.list-icon{
				width: 105px;
				height: 75px;
				flex-shrink: 0;
			}
		}
		.list-con{
			padding-left: 10px;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.list-con-top{
			flex: 1;
			display: flex;
			justify-content: space-between;
		}
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
