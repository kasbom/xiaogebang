<template>
	<view class="">
		<u-gap height="20"></u-gap>
		<u-cell-group>
			<u-cell-item title="服务人员" :value="recordingDetail.service_name"></u-cell-item>
			<u-cell-item title="服务时间" :value="recordingDetail.service_date"></u-cell-item>
			<u-cell-item title="服务时长" :value="recordingDetail.service_times"></u-cell-item>
		</u-cell-group>
		<u-gap height="20"></u-gap>
		<view class="evaluation">
			<u-cell-item title="我的评价" :value="`${recordingDetail.rank}分`"></u-cell-item>
			
			<view class="desc-wrap">
				<u-cell-item title="我的评价" :arrow="false" :border-bottom="false"></u-cell-item>
				<view class="tip fz14 h3" v-if="recordingDetail.is_comment==1" >
					暂无评价
				</view>
				<view class="" v-else>
					<view class="tip fz14 h3">{{recordingDetail.comment_content}}</view>
					
					<view class="image-wrap" v-if="commentImgArr.length>0">
						<image v-for="(item,index) in commentImgArr" :key="index" :src="item" mode="aspectFill" class="image"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params:{
					id:0,
				},
				recordingDetail:{},
				commentImgArr:[],
				
			}
		},
		onLoad(option){
			this.params.id=option.id
			this.getInfo()
		},
		methods: {
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getSubscribeDetail(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.recordingDetail=data.data
					this.commentImgArr=this.recordingDetail.comment_img
					
				} else {
					this.$toast(data.msg||msg)
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.evaluation{
		background-color: #fff;
		padding-bottom: 15px;
		.tip{
			padding: 0 15px 10px;
		}
		.image-wrap{
			padding: 0 15px;
			display: flex;
			flex-wrap: wrap;
			.image{
				width: 150rpx;
				height: 150rpx;
				margin-right: 30rpx;
				&.last-image{
					margin-right: 0;
				}
			}
		}
	}
</style>
