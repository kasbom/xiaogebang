export default {
	/**
	 * 封装支付请求参数
	 */
	$callPay() {
		const self = this
		return new Promise((reslove, reject) => {
			let pays = [],
				payWayConst,
				tradeType
			//#ifdef H5
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//在微信中打开
				pays = ['微信支付']
				payWayConst = 'JS'
			} else {
				pays = ['微信支付', '支付宝支付']
				payWayConst = 'H5'
			}
			//#endif
	
			//#ifdef APP-PLUS
			pays = ['微信支付', '支付宝支付']
			payWayConst = 'APP'
			//#endif
	
			//#ifdef MP-WEIXIN
			pays = ['微信支付']
			payWayConst = 'APPLET'
			//#endif
			// pays.push('余额支付')
			uni.showActionSheet({
				itemList: pays,
				success({
					tapIndex
				}) {
					if (pays[tapIndex] == '微信支付') {
						tradeType = 'WXPAY'
					}
					if (pays[tapIndex] == '支付宝支付') {
						tradeType = 'ALIPAY'
					}
					// if(pays[tapIndex] == '余额支付'){
					// 	$http.request({
					// 		url:''
					// 	})
					// 	return
					// }
					reslove({
						payWayConst,
						tradeType
					})
				},
				fail(error) {
					reject(error)
				}
			})
		})
	},
	
	$payMent({
		payType,
		orderInfo,
		paymentData,
		success
	}) {
		// #ifdef APP-PLUS
		/* if (payType == 'WXPAY') {
			uni.showToast({
				title: '暂不支持该支付！',
				icon: 'none'
			})
			return
		} */
	    
	    console.log(orderInfo, '微信参数', payType.toLowerCase())
		uni.requestPayment({
			provider: payType.toLowerCase(),
			orderInfo: orderInfo,
			success: (e) => {
				console.log("success", e);
				success(e)
				uni.showToast({
					title: '支付成功！'
				})
			},
			fail: (e) => {
				console.log("fail", e);
				uni.showToast({
					title: `支付失败！${JSON.stringify(e)}`,
					icon: 'none'
				})
			}
		})
		// #endif
	
		//#ifdef MP-WEIXIN
		uni.requestPayment({
			timeStamp: paymentData.timeStamp,
			nonceStr: paymentData.nonceStr,
			package: paymentData.package,
			signType: paymentData.signType,
			paySign: paymentData.paySign,
			success: (e) => {
				console.log("success", e);
				success(e)
			},
			fail: (e) => {
				console.log("fail", e);
			}
		})
		//#endif
	},
	
	$link(url) {
		// #ifdef APP-PLUS
		plus.runtime.openURL(url)
		// #endif
		// #ifdef H5
		window.open(url)
		// #endif
	},
	
	getLocation() {
	  uni.showLoading()
	  return new Promise((resolve, reject) => {
	    uni.getLocation({
			type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			altitude:true,
	      success: function(res) {
			  console.log(res)
	        resolve(res)
	      },
	      fail: function(error) {
	        reject(error)
	        uni.hideLoading()
	      },
		  complete() {
			  uni.hideLoading()
		  }
	    })
	  }).then(undefined, (error) => {
		  throw new Error(error);
		});
	},
	loginCommon(){
		// #ifdef APP-PLUS
		    return new Promise((resolve, reject) => {
				var that=this, getAppid = plus.runtime.appid
				uni.login({
						provider: 'weixin',
						success: function (loginRes) {
						 console.log(JSON.stringify(loginRes.authResult))
					
						  }
		        })
		        var weixinService = null
		        // http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.getServices
		        plus.oauth.getServices(function(services) {
		            console.log(getAppid)
		            console.log(services)
		            if (services && services.length) {
		                for (var i = 0, len = services.length; i < len; i++) {
		                    if (services[i].id === 'weixin') {
		                        weixinService = services[i]
		                        console.log('授权对象')
		                        console.log(weixinService)
		                        break
		                    }
		                }
		                if (!weixinService) {
		                    console.log('没有微信登录授权服务')
		                    return
		                }
		                // http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthService.authorize
		                weixinService.authorize(function(event) {  //此处获取code的关键
		                    console.log('this is that' +that)
		                    console.log(event.code,'这次是真的授权后返回的code')
		                    that.weixinCode = event.code; //用户换取 access_token 的 code
							console.log('this is weixinCode' +that.weixinCode)
		                    // it.requestLogin();
						   resolve(that.weixinCode)
		                    
		                }, function(error) {
							reject(error)
		                    console.error('authorize fail:' + JSON.stringify(error))
		                });
		            } else {
		                console.log('无可用的登录授权服务')
		            }
		        }, function(error) {
		            console.error('getServices fail:' + JSON.stringify(error))
		        });
			})
		 // #endif
	},
	appLoginWxCommon(){
		let that=this
		// #ifdef MP-WEIXIN
		    return new Promise((resolve, reject) => {
				uni.getProvider({
				  service: 'oauth',
				  success: function (res) {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: (res2) => {
								
								uni.getUserInfo({
									provider: 'weixin',
									success: (info) => {//这里请求接口
										// console.log(res2);
										// console.log(info);
										let params={}
										// params.iv=info.iv
										
										params.code=res2.code
										params.type=1
										wx.showModal({
										   title: '温馨提示',
										   content: '正在请求您的个人信息',
										   success(res) {
											   console.log(res.confirm)
										     if (res.confirm) {
										       uni.getUserProfile({
												   desc:'正在获取您的个人信息',
												   success: res => {
													   console.log(res)
													 params.iv=res.iv
													 params.data=res.encryptedData
													 resolve(params)
												   },
												   fail: res => {
													 //拒绝授权
													 console.log(res)
													 that.$toast('您拒绝了请求')
													 return;
												   }
										     })} else if (res.cancel) {
												 console.log(res)
										       //拒绝授权 showErrorModal是自定义的提示
										       that.$toast('您拒绝了请求')
										       return;
										     }
										   }
										 })
										
									},
									fail: (err) => {
										reject(err)
										uni.showToast({title:"微信登录授权失败",icon:"none"});
									}
								})
						
							},
							fail: () => {
								uni.showToast({title:"微信登录授权失败",icon:"none"});
							}
						})
						
					}else{
						uni.showToast({
							title: '请先安装微信或升级版本',
							icon:"none"
						});
					}
				  }
				});
			})
		//#endif
	},
}