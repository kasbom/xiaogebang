/**
 * home相关api
 */

const API_home = vm => {
  return {
		/**
		 * 首页
		 */
		getHomeIndex: (params = {}) => vm.$u.post('/Home/index', params),
		/**
		 * 服务详情
		 */
		getServiceDetail: (params = {}) => vm.$u.post('/Service/detail', params),
		/**
		 * 服务主页
		 */
		getCleaningIndex: (params = {},showLoading) => vm.$u.post('/Service', params,showLoading),
		/**
		 * 服务列表
		 */
		getSubscribeList: (params = {},showLoading) => vm.$u.post('/User/getSubscribeList', params,showLoading),
		/**
		 * 服务详情
		 */
		getSubscribeDetail: (params = {},showLoading) => vm.$u.post('/User/getSubscribeDetail', params,showLoading),
		
		/**
		 * 保姆阿姨主页
		 */
		getAgreement: (params = {},showLoading) => vm.$u.post('/Service/agreement', params,showLoading),
		/**
		 * 保姆阿姨列表
		 */
		getAgreementUsers: (params = {},showLoading) => vm.$u.post('/Service/getAgreementUsers', params,showLoading),
		/**
		 * 保姆阿姨详情
		 */
		getAgreementUserInfo: (params = {},showLoading) => vm.$u.post('/Service/getAgreementUserInfo', params,showLoading),
		/**
		 * 预约保姆阿姨
		 */
		subscribe: (params = {},showLoading) => vm.$u.post('/Service/subscribe', params,showLoading),
		
		/**
		 * 拼团主页
		 */
		getActivityIndex: (params = {},showLoading, header = {}) => vm.$u.post('/Promotion/groupIndex', params,showLoading,header),
		/**
		 * 拼团详情
		 */
		getGroupDetail: (params = {},showLoading) => vm.$u.post('/Promotion/groupDetail', params,showLoading),
		
		/**
		 * 拼团详情
		 */
		getJoinGroupDetail: (params = {},showLoading) => vm.$u.post('/Promotion/getJoinGroupDetail', params,showLoading),
		
		/**
		 * 获取创建订单页面信息
		 */
		getOrderCreate: (params = {},showLoading, header = {}) => vm.$u.post('/Order/create', params,showLoading,header),
		/**
		 * 提交订单页面信息
		 */
		getOrderSubmit: (params = {},showLoading) => vm.$u.post('/Order/submit', params,showLoading),
		/**
		 * 提交支付页面信息
		 */
		// getPaymengPay: (params = {},showLoading) => vm.$u.post('/Paymeng/pay', params,showLoading),
		/**
		 * 秒杀主页
		 */
		getMsIndex: (params = {}, showLoading,header = {}) => vm.$u.post('/Promotion/msIndex', params,showLoading,header),
		/**
		 * 秒杀详情
		 */
		msDetail: (params = {}, showLoading) => vm.$u.post('/Promotion/msDetail', params,showLoading),
		/**
		 * 套餐主页
		 */
		getTaocanIndex: (params = {},showLoading, header = {}) => vm.$u.post('/Promotion/taocanIndex ', params,showLoading,header),
		/**
		 * 预约套餐
		 */
		taocanSubscribe: (params = {},showLoading) => vm.$u.post('/User/taocanSubscribe', params,showLoading),
		/**
		 * 套餐详情
		 */
		taocanDetail: (params = {},showLoading) => vm.$u.post('/Promotion/taocanDetail', params,showLoading),
		/**
		 * 优惠券主页
		 */
		getCouponIndex: (params = {},showLoading, header = {}) => vm.$u.post('/Coupon/getList', params,showLoading,header),
		/**
		 * 获取其他服务分类
		 */
		getCates: (params = {},showLoading) => vm.$u.post('/Seller/getCates', params,showLoading),
		/**
		 * 获取其他服务列表
		 */
		getCateList: (params = {},showLoading) => vm.$u.post('/Seller/getList', params,showLoading),
		/**
		 * 获取其他服务详情
		 */
		getCateDetail: (params = {},showLoading) => vm.$u.post('/Seller/getDetail', params,showLoading),
		/**
		 * 获取优惠券
		 */
		getCoupon: (params = {},showLoading) => vm.$u.post('/Coupon/getCoupon', params,showLoading),
		/**
		 * 计算
		 */
		countPrice: (params = {},showLoading) => vm.$u.post('/Order/countPrice', params,showLoading),
		
		/**
		 * 获取订单页面信息
		 */
		getOrderList: (params = {},showLoading) => vm.$u.post('/Order/getList', params,showLoading),
		/**
		 * 获取订单详情
		 */
		getOrderDetail: (params = {},showLoading) => vm.$u.post('/Order/getDetail', params,showLoading),
		/**
		 * 获取商家订单页面信息
		 */
		getSellerOrderList: (params = {},showLoading) => vm.$u.post('/Seller/getOrderList', params,showLoading),
		/**
		 * 获取商家订单详情
		 */
		getSellerOrderDetail: (params = {},showLoading) => vm.$u.post('/Seller/getOrderDetail', params,showLoading),
		
		/**
		 * 获取订单套餐列表
		 */
		getTaocanList: (params = {},showLoading) => vm.$u.post('/User/getTaocanList', params,showLoading),
		/**
		 * 获取订单套餐详情
		 */
		getTaocanDetail: (params = {},showLoading) => vm.$u.post('/User/getTaocanDetail', params,showLoading),
		/**
		 * 获取订单拼团列表
		 */
		getMyGroupList: (params = {},showLoading) => vm.$u.post('/User/getMyGroupList', params,showLoading),
		/**
		 * 获取订单套餐详情
		 */
		getMyGroupDetail: (params = {},showLoading) => vm.$u.post('/User/getMyGroupDetail', params,showLoading),
		
		/**
		 * 获取支付订单信息
		 */
		getPayOrder: (params = {},showLoading) => vm.$u.post('/Order/getPayOrder', params,showLoading),
		
		/**
		 * 支付订单
		 */
		payPayment: (params = {},showLoading) => vm.$u.post('/Payment/pay', params,showLoading),
		/**
		 * 支付订单
		 */
		cancelOrder: (params = {},showLoading) => vm.$u.post('/Order/cancelOrder', params,showLoading),
		
		/**
		 * 获取合同列表
		 */
		getContractList: (params = {},showLoading) => vm.$u.post('/User/getContractList', params,showLoading),
		/**
		 * 获取合同详情
		 */
		getContractDetail: (params = {},showLoading) => vm.$u.post('/User/getContractDetail', params,showLoading),
		/**
		 * 用户签名
		 */
		signName: (params = {},showLoading) => vm.$u.post('/Service/signName', params,showLoading),
		/**
		 * 消息列表
		 */
		getNoticeList: (params = {},showLoading) => vm.$u.post('/Notice/getList ', params,showLoading),
		/**
		 * 消息设置已读
		 */
		setIsRead: (params = {},showLoading) => vm.$u.post('/Notice/setIsRead', params,showLoading),
		/**
		 * 首页获取城市
		 */
		getCitys: (params = {},showLoading) => vm.$u.post('/Home/getCitys', params,showLoading),
		/**
		 * 上传图片
		 */
		getCitys: (params = {},showLoading) => vm.$u.post('/Home/getCitys', params,showLoading),
		/**
		 * 获取用户信息
		 */
		getUserInfo: (params = {}, showLoading) => vm.$u.post('/User/getUserInfo', params,showLoading),
		/**
		 * 设置头像
		 */
		setHeadPic: (params = {},showLoading) => vm.$u.post('/User/setHeadPic', params,showLoading),
		/**
		 * 修改手机号码
		 */
		setMobile: (params = {}, showLoading) => vm.$u.post('/User/setMobile', params,showLoading),
		/**
		 * 退出登录
		 */
		loginOut: (params = {}, showLoading) => vm.$u.post('/User/loginOut', params,showLoading),
		/**
		 * 合同链接
		 */
		ContractInfo: (params = {}, showLoading) => vm.$u.post('/ContractInfo', params,showLoading),
		/**
		 * 评论订单
		 */
		commentOrder: (params = {}, showLoading) => vm.$u.post('/User/comment', params,showLoading),
		/**
		 * 邀请
		 */
		wxShare: (params = {}, showLoading) => vm.$u.post('/User/wxShare', params,showLoading),
		/**
		 * 分销首页
		 */
		distribution: (params = {}, showLoading) => vm.$u.post('/Distribution/index', params,showLoading),
		/**
		 * 分销好友记录
		 */
		getSubordinateList: (params = {}, showLoading) => vm.$u.post('/Distribution/getSubordinateList', params,showLoading),
		/**
		 * 提现
		 */
		withdrawal: (params = {}, showLoading) => vm.$u.post('/Distribution/withdrawal', params,showLoading),
		/**
		 * 获得自己添加的银行帐号
		 */
		getAccountList: (params = {}, showLoading) => vm.$u.post('/Distribution/getAccountList', params,showLoading),
		/**
		 * 保存/新增收款帐号
		 */
		saveAccount: (params = {}, showLoading) => vm.$u.post('/Distribution/saveAccount', params,showLoading),
		/**
		 * 获得平台预设的收款帐号平台
		 */
		getBankList: (params = {}, showLoading) => vm.$u.post('/Distribution/getBankList', params,showLoading),
		/**
		 * 获得提现列表
		 */
		getWithdrawalList: (params = {}, showLoading) => vm.$u.post('/Distribution/getWithdrawalList', params,showLoading),
		/**
		 * 上传设备码
		 */
		pushId: (params = {}, showLoading) => vm.$u.post('/User/pushId', params,showLoading),
		/**
		 * 开启通知
		 */
		setNotice: (params = {}, showLoading) => vm.$u.post('/User/setNotice', params,showLoading),
		/**
		 * 获取帮助列表
		 */
		getHelpList: (params = {}, showLoading) => vm.$u.post('/Article/getHelpList', params,showLoading),
		/**
		 * 获取服务人员是否有空
		 */
		checkAllot: (params = {}, showLoading) => vm.$u.post('/Service/checkAllot', params,showLoading),
		/**
		 * 订单统计数量
		 */
		getOrderTJ: (params = {}, showLoading) => vm.$u.post('/User/getOrderTJ', params,showLoading),
		
  }
}

export default API_home
