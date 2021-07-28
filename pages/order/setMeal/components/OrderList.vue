<template>
	<view class="order--wrap">
		<view class="order-list" v-for="item,i in orderList" :key="i">
			<view class="list-wrap">
				<image :src="item.main_pic" mode="aspectFill" class="list-icon"></image>
				<view class="list-con">
					<view class="list-con-top">
						<view class="">
							<view class="name fz14 h1">{{item.name}}</view>
							<view class="desc fz12 h3">{{item.guide}}</view>
						</view>
					</view>
					<view class="price fz18 h99">￥{{item.goods_price}}</view>
				</view>
			</view>
			
			<view class="order-info">
				<view class="order-info-list">
					<view class="order-info-list-label h3 h13">服务方式：</view>
					<view class="fz13 h1">{{item.time_text}}</view>
				</view>
				<view class="order-info-list">
					<view class="order-info-list-label h3 h13">剩余次数：</view>
					<view class="fz13 h1">{{item.remainder}}次</view>
				</view>
			</view>
			<view class="btn-wrap">
				<m-button v-if="item.time_type==1&&Number(item.remainder)>0" title="手动预约" size="mini" hollow :css="{'margin-left': '10px'}" @handleClick="toPriview(item,i)"></m-button>
				<m-button title="服务记录" size="mini" hollow :css="{'margin-left': '10px'}" @handleClick="toRecording(item)"></m-button>
				<m-button title="套餐详情" size="mini" gray hollow :css="{'margin-left': '10px'}" @handleClick="toDetail(item)"></m-button>
			</view>
		</view>
		<m-time ref="mTime" :cellShow="false" @confirm="timeConfirm"></m-time>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				params:{
					date:null,
					time:null,
					id:0
				}
			}
		},
		props:{
			orderList:{
				type:Array
			}
		},
		methods: {
			toDetail(item) {
				uni.navigateTo({
					url: '/pages/order/setMeal/detail?id='+item.id
				})
			},
			toRecording(item) {
				uni.navigateTo({
					url: '/pages/order/setMeal/recording?id='+item.id+'&type=2'
				})
			},
			toPriview(item,index) {
				this.$refs.mTime.open()
				this.params.id=item.id
				
			},
			timeConfirm(e){
				this.params.date=e[0].value.replace(/-/g,'')
				this.params.time=e[1].value
				this.priviewFunc()
			},
			async priviewFunc(){
				const { statusCode, data, message } =  await this.$u.api.taocanSubscribe(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.$toast('预约成功!')
					this.$emit('getList')
				} else {
					this.$toast(data.msg||msg)
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.order-list{
		padding: 15px;
		background-color: #fff;
		border-radius: 20rpx;
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
		.btn-wrap{
			display: flex;
			justify-content: flex-end;
			padding-top: 10px;
		}
		
		.order-info{
			background-color: #ffffff;
			padding: 15px 0px;
			margin-top: 10px;
			border-top: 1px solid #eaeaea;
			border-bottom: 1px solid #eaeaea;
			.order-info-list{
				display: flex;
				justify-content: space-between;
				padding: 5px 0;
				.order-info-list-label{
					margin-right: 20px;
				}
			}
		}
	}
</style>
