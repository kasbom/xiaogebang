<template>
	<view class="wrap">
		<view class="item"  v-for="(itemes,index) in itemObj" :key="index" v-if="itemObj.length>0">
			<view class="title" @click="showMore(itemes,index)">
				<view class="fz16 h1">{{itemes!=null?itemes.info.name:''}}</view>
				<view class="title-item">
					<view class="fz12 h3 title-i">{{itemes!=null?itemes.info.distance_text:''}}</view>
					<view class="title-i title-r" >
					    <u-icon :custom-style="{display: 'flex'}" :name="itemes.active?'arrow-up':'arrow-down'" >	</u-icon>
					</view>
				</view>
				
			</view>
			
			<view class="list-wrap" v-if="itemes.active">
				<view  @click="navToPageNew(item)" class="list" v-for="(item,i) in itemes.services" :key="i">
					<view class="list-left">
						<image :src="item.img" class="list-icon" mode="aspectFill"></image>
						<view class="list-title">{{item.title}}</view>
					</view>
					<view class="btn" >
						<m-button @handleClick="navToPageNew(item,itemes.info.id)" :title="item.buttonName||item.name" size="mini" :css="{'border-radius': '27px', height: '27px'}"></m-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {navTo,setToken} from '@/utils/common.js'
	export default {
		data() {
			return {
				timestamp: 886400,
			}
			
		},
		props:{
			itemObj:{
				type:Array
			}
		},
		created() {
			this.setActive()
		},
		methods:{
			setActive() {
				if(this.itemObj.length>0){
					this.itemObj.forEach((item,index)=> {
						this.$set(this.itemObj[index],'active',false)
					})
					this.$set(this.itemObj[0],'active',true)
				}
				
			},
			navToPageNew(item,id){
				let url=''
				if(item.cate_id==0){
					url='/pages/home/cleaning/moreService?params='+JSON.stringify(item.paream)
				}else if(item.cate_id=='1389'||item.cate_id=='1390'){
					url='/pages/home/cleaning/index?params='+JSON.stringify(item.paream)
				}else{
					url='/pages/home/worker/yuesao?params='+JSON.stringify(item.paream)
				}
				setToken('store_id',id)
				navTo(url)
			},
			showMore(itemes,index){
				let active = itemes.active
				this.itemObj.forEach((item,i)=> {
					this.itemObj[i].active = false
				})
				this.itemObj[index].active = !active
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap{
		padding: 10px 30rpx;
		.item{
			padding: 30rpx;
			border-radius: 10rpx;
			background-color: #fff;
		}
		.title{
			display: flex;
			justify-content: space-between;
			padding-bottom: 10px;
			.title-item {
				width: 40%;
				text-align: right;
				.title-i {
					display: inline-block;
				}
				.title-r {
					width: 20%;
					text-align: right;
					/deep/ .u-icon--right {
						justify-content: center;
					}
				}
		    }
		}
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 0;
		}
		.list-left{
			display: flex;
			align-items: center;
			.list-icon{
				width: 45px;
				height: 45px;
				margin-right: 8px;
			}
		}
	}
</style>
