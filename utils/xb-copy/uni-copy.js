export default function uniCopy(content) {
	if(!content) return uni.showToast({
		title: '复制的内容不能为空 !',
		icon: 'none'
	})
	content = typeof content === 'string' ? content : content.toString() // 复制内容，必须字符串，数字需要转换为字符串
	/**
	 * 小程序端 和 app端的复制逻辑
	 */
	//#ifndef H5
	uni.setClipboardData({
		data: content,
		success: function() {
			uni.showToast({
				title: '复制成功~'
			})
			console.log('success');
		},
		fail:function(){
			uni.showToast({
				title: '复制失败~',
				icon: 'none'
			})
		}
	});
	//#endif
	
	/**
	 * H5端的复制逻辑
	 */
	// #ifdef H5
	if (!document.queryCommandSupported('copy')) { //为了兼容有些浏览器 queryCommandSupported 的判断
		// 不支持
		uni.showToast({
			title: '浏览器不支持~',
			icon: 'none'
		})
	}
	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, content.length) //核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	if(result){
		uni.showToast({
			title: '复制成功~'
		})
	}else{
		uni.showToast({
			title: '复制失败，请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！',
			icon: 'none'
		})
	}	
	textarea.remove()
	// #endif
}
