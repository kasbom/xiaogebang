<template>
	<view class="">
		
		<view class="wrap">
			<view class="list" @click="toDetail(item.id)" v-for="item,index in recordingList" :key="index">
				<u-cell-item
					:title="item.goods_name"
					:label="item.service_date"
					:value="item.status_text"
					:value-style="{color: item.status==3? '#57be6a':'#ff4b34'}"
				>
					<!-- <image src="../../../static/images/index/JoinGroup/banner.png" slot="icon" mode="aspectFill" class="list-icon"></image> -->
				</u-cell-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					type: '',
				},
				recordingList:[],
				
			}
		},
		onLoad(option){
			this.params.type=option.type
			this.getInfo()
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/order/reservation/detail?id='+id
				})
			},
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getSubscribeList(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.recordingList=data.data
				} else {
					this.$toast(data.msg||msg)
				}
			},
		}
		
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding: 10px 0 0;
		/deep/ .u-cell{
			align-items: center;
		}
	}
	.list{
		background-color: #fff;
		margin-bottom: 10px;
		.list-icon{
			width: 77px;
			height: 50px;
			border-radius: 5px;
			margin-right: 10px;
		}
	}
</style>
