<template>
	<view class="wrap">
		<view class="list" v-for="(item,index) in recordingList"  :key="index" @click="toDetail(item.id)">
			<u-cell-item
				:title="item.service_name"
				:label="item.service_date"
				:value="item.status_text"
				:value-style="{color:item.status==3? '#57be6a':'#ff4b34'}"
			></u-cell-item>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					type: '',
					id:0,
				},
				recordingList:[],
				
			}
		},
		onLoad(option){
			this.params.id=option.id
			this.params.type=option.type
			this.getInfo()
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/order/setMeal/recordingDetail?id='+id
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
	}
</style>
