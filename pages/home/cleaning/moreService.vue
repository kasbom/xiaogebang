<template>
	<view class="wrap" style="position: relative;min-height: 500px;">
		<view class="left">
			<view v-for="(item,index) in navList" :key="index" 
			      class="left-list" :class="currentNum==index?'active':''"
				  @click="navChange(index,item.id)"
		     >{{item.name}}</view>
		</view>
		<view class="right">
			<scroll-view scroll-y scroll-with-animation class="right-box">
				<view class="">
					<view class="right-list" v-for="items,i in cateArr " :key="i">
						<image :src="items.img" class="list-icon"  mode="aspectFill"></image>
						<view class="list-con">
							<view class="fz15 h1">{{items.name}}</view>
							<view class="fz12 h4">服务次数：{{items.service_nums}}次</view>
							<view class="label-wrap">
								<view class="label h3" v-if="cateArr.length>0"
							      v-for="ite,ind in items.tags" :key="ind"
								  style="margin: 0 2rpx;"
								>{{ite}}</view>
							</view>
							<m-button title="免费预约" size="mini" :css="{'border-radius': '27px', height: '27px'}" @handleClick="toDetail(items.id)"></m-button>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<kfBtn></kfBtn>
	</view>
</template>

<script>
	import {navTo,getToken} from '@/utils/common.js'
	import kfBtn from '../components/kfBtn.vue'
	export default {
		components:{
			kfBtn,
		},
		data() {
			return {
				params:{
					city_id: '',
					cate_id:0,
				},
				navList:[],
				cateArr:[],
				currentNum:0,
			}
		},
		onLoad(){
			this.params.city_id=getToken('city_id')
			this.getInfo()
		},
		methods: {
			navChange(index,id){
				this.currentNum=index
				this.params.cate_id=id
				this.getListInfo()
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/home/cleaning/moreServiceDetail?id='+id
				})
			},
			async getInfo(){
				const { statusCode, data, message } =  await this.$u.api.getCates({},true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.navList=data.data
					this.params.cate_id=this.navList[0].id
					this.getListInfo()
				} else {
					this.$toast(data.msg||msg)
				}
			},
			async getListInfo(){
				const { statusCode, data, message } =  await this.$u.api.getCateList(this.params,true)
				
				if (statusCode === 200&&data.error==0 ) {
					this.cateArr=data.data
				} else {
					this.$toast(data.msg||msg)
				}
			},
		}
	}
	
</script>

<style scoped lang="scss">
	.wrap{
		display: flex;
		padding-top: 10px;
		height: 100%;
		.left{
			width: 200rpx;
			.left-list{
				height: 40px;
				line-height: 40px;
				text-align: center;
				&.active{
					background-color: #fff;
				}
			}
		}
		.right{
			flex: 1;
			padding: 15px 15px;
			background-color: #fff;
		}
		.label-wrap{
			display: flex;
			flex-wrap: wrap;
			font-size: 10px;
			margin: 6px 0;
			.label{
				border: 1px solid #b7b7b7;
				border-radius: 4px;
				line-height: 16px;
				padding: 0 2px;
			}
		}
		.right-list{
			display: flex;
			.list-icon{
				width: 90px;
				height: 90px;
				flex-shrink: 0;
			}
		}
		.list-con{
			padding-left: 10px;
		}
	}
</style>
<style>
	page{
		height: 100%;
	}
</style>