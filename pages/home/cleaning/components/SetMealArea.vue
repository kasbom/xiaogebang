<template>
	<view class="">
		<view class="wrap" >
			<view class="item" v-for="item,i in taocanArr" :key="i" @click="navToPage(typeService=='service'?`/pages/home/cleaning/detail?id=${item.id}&city_id=${city_id}`:`/pages/home/SetMeal/detail?id=${item.id}&city_id=${city_id}`)">
				<image :src="item.thumb" class="icon" mode="aspectFill"></image>
				<view class="item-con">
					<view class="item-name">
						<view class="fz16 h1">{{item.serviceName}}</view>
					</view>
					
					<view class="pri-btn">
						<view class="fz16 h99 marT">￥{{item.price}}</view>
						<m-button title="预约" @handleClick="navToPage(typeService=='service'?`/pages/home/cleaning/detail?id=${item.id}&city_id=${city_id}`:`/pages/home/SetMeal/detail?id=${item.id}&city_id=${city_id}`)"
						          size="mini" ></m-button>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="look-more">
			<view class="to-more">
				查看更多>>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {navTo,getToken,getQueryVariable} from '@/utils/common.js'
	export default {
		data() {
			return {
				timestamp: 86400,
				city_id:0
			}
		},
		props:{
			taocanArr:{
				type:Array,
			},
			typeService:{
				type:String,
			}
		},
		created(){
			this.city_id=getToken('city_id')
		},
		methods:{
			navToPage(url){
				let newObj= getQueryVariable(url)
				let id=newObj["id"]
				let cityid= newObj["city_id"]
				if(id==''||cityid==''||!id||!cityid){
					this.$toast('未选择城市，请重新选择!')
					return 
				}
				navTo(url)
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.item{
		width: 48%;
		background-color: #fff;
		margin-bottom: 10px;
		.icon{
			width: 100%;
			height: 336rpx;
		}
		.item-con{
			flex: 1;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.pri-btn{
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
		}
	}
	.look-more {
		width: 100%;
		text-align: center;
		.to-more {
			display: inline-block;
			padding: 4px 10px;
			border-radius: 20px;
			background-color:#F2E9E4 ;
			color: #E79F77;
		}
		
	}
	.marT {
		margin: 4rpx 0;
	}
</style>
