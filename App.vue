<script>
	import appUpdate from '@/utils/appUpdate'
	import switchId from '@/utils/switchId'
	import {setToken} from '@/utils/common'
	export default {
		onLaunch: function() {
			let _self=this
			// 获取token
			let token = ''
			let userInfo = null
			try{
				token = uni.getStorageSync('token')
				userInfo = uni.getStorageSync('userInfo')
			} catch(e) {}
			
			if (!token) {
				// uni.reLaunch({
				// 	url: '/pages/login/getCode'
				// })
			} else {
				_self.$store.commit('SET_TOKEN', token)
				_self.$store.commit('SET_USER_INFO', userInfo)
				
				// 根据选择身份跳转
				// switchId(userInfo)
			}
			uni.showLoading({
						title: '加载中...',
						mask: true
			})
			// #ifdef APP-PLUS
			    const clientInfo = plus.push.getClientInfo()
			    console.log('获取到了cid'+clientInfo.clientid)
				setToken('clientid',clientInfo.clientid)
				//app关闭默认的启动 方法关闭启动图。但是这个时间不能太晚，6s 超时后依旧会主动关闭。
				setTimeout(()=>{
						plus.navigator.closeSplashscreen();
				 }, 3000)
			
				plus.push.addEventListener('click', function(message) {
				   //处理点击消息的业务逻辑代码
				    console.log('点击推送了'+JSON.stringify(message.payload));
					   let payload = message.payload
					   // payload = JSON.parse(payload)
					   console.log('点击推送了'+payload.type);
					   if(payload.type==1){
						uni.navigateTo({
							url: `/pages/order/service/detail?id=${payload.id}`
						})
					   }else if(payload.type==2){
						uni.navigateTo({
							url: `/pages/order/service/serviceDetail?id=${payload.id}`
						})
					   }else if(payload.type==3){
						uni.navigateTo({
							url: `/pages/center/contract/detail?id=${payload.id}`
						})
					   } 
					  }, false);  
				  //监听接收透传消息事件  
				  plus.push.addEventListener('receive', function(message) {  
				    console.log(message);
				        plus.nativeUI.toast(`小哥帮温馨提醒：${message.title}-${message.content}`); 
				    //处理透传消息的业务逻辑代码  
				    //plus.nativeUI.toast('push receive');  
				    
				  }, false);
				 /**
				  * APP热更新
				  */
				 appUpdate()
			// #endif
			// #ifdef MP-WEIXIN
			    const updateManager = wx.getUpdateManager()
			    console.log(updateManager)
			    updateManager.onCheckForUpdate(function (res) {
			     // 请求完新版本信息的回调
			     console.log(res.hasUpdate)
			    })
			  
			    updateManager.onUpdateReady(function () {
			     updateManager.applyUpdate()
			    })
			 // #endif
			
		},
		onShow: function() {
			// 获取设备信息
			const systemInfo = uni.getSystemInfoSync()
			// #ifdef MP-WEIXIN
			this.$scope.globalData.systemInfo = systemInfo
			// #endif
			
			// #ifndef MP-WEIXIN
			getApp().globalData.systemInfo = systemInfo
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
		  systemInfo: {},
		  upInfo:{}
		},
		
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	
	@import  "./style/common.scss";
	@import  "./style/basic.scss";
	
	page{
		background-color: #F5F5F5;
	}
	
	.loadmore-wrap{
		padding: 30rpx 0 20rpx;
	}
	
	// 重置样式
	.u-action-sheet-item{
		background-color: #fff;
	}
	.u-select__header{
		background-color: #fff;
	}
</style>
