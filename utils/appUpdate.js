 // 用于更新 
import config from '@/config'
import {setToken} from '@/utils/common.js'
const appUpdate = () => {
	console.log('询问是否更新')
	// uni.showToast({
	// 	title: '询问是否更新'
	// })
	// #ifdef APP-PLUS
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		const versiones = widgetInfo.version
		const versionStr=versiones.toString()
		console.log(versionStr)
		const versionArr=versiones.split('.')
		console.log(versionArr)
		const version=versionArr[2]
		
		console.log(version)
		const systemInfo = uni.getSystemInfoSync()
		const system = systemInfo.system.indexOf('iOS') >= 0 ? 'iOS' : 'Android'
		
		uni.request({
			url: `${config.baseURL}/System/getClientVersion`,
			method: 'GET',
			success: (res) => {
				// const result = {
				//   code: 200,
				//   data: {
				//     update: true,
				//     wgtUrl: 'http://yz.ctkey.com.cn/__UNI__BF50C1E.wgt'
				//   }
				// }
				
				const result = res.data
				result.data.curVersion=version
				console.log(result)
			     setToken('upinfo',result)
				
				// 请求错误
				if (result.error != 0) return
				// 不需要更新
				const data = result.data
				// const isUpdate = getApp().globalData.isUpdate
				// if (isUpdate) return
				// getApp().globalData.isUpdate = true
				
				// 热更新
				// if (Number(version)<Number(data.version)) {
				// 	console.log("这是请求连接___"+data.url)
				// 	uni.navigateTo({
				// 		url:'/publicPages/pages/news/webView?url='+data.url
				// 	})
				// 	// uni.downloadFile({
				// 	// 	url: data.url,
				// 	// 	success: (downloadResult) => {
				// 	// 		console.log(downloadResult)
				// 	// 		if (downloadResult.statusCode === 200) {
				// 	// 			plus.runtime.install(downloadResult.tempFilePath, {
				// 	// 				force: false
				// 	// 			}, function() {
				// 	// 				console.log('install success...')
				// 	// 				uni.showModal({ //提醒用户更新  
				// 	// 					title: "更新提示",  
				// 	// 					content: '应用已更新，重启应用',
				// 	// 					showCancel: false,
				// 	// 					confirmText: '马上重启',
				// 	// 					success: (res) => {
				// 	// 						if (res.confirm) {
				// 	// 							plus.runtime.restart()
				// 	// 						}
				// 	// 					}  
				// 	// 				})
				// 	// 			}, function(e) {
				// 	// 				console.error('install fail...')
				// 	// 			})
				// 	// 		} else {
				// 	// 			console.error('downloadFile fail...')
				// 	// 		}
				// 	// 	}
				// 	// })
				// } else if (data.pkgUrl) { // 整包更新
				// 	uni.showModal({ //提醒用户更新  
				// 		title: "更新提示",
				// 		content: '发现新的安装包，是否马上更新?',
				// 		confirmText: '马上更新',
				// 		success: (res) => {
				// 			if (res.confirm) {
				// 				plus.runtime.openURL(data.pkgUrl)
				// 			}
				// 		}
				// 	})
				// }
			}
		});
		
		// this.$u.post('', {version: widgetInfo.version, system})
		//   .then(_result => {
		//     console.log(22)
				
		//   })
	});  
	// #endif
}

export default appUpdate
