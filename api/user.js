/**
 * 用户相关api
 */

const API_user = vm => {
  return {
    /**
     * 获取地址列表
    */
        getAddressList: (params = {}, showLoading) => vm.$u.post('/User/getAddressList', params, showLoading),
		/**
		 * 地址列表
		 */
		getAddressList: (params = {}) => vm.$u.post('/User/getAddressList', params),
		/**
		 * 保存地址
		 */
		saveAddress: (params = {}) => vm.$u.post('/User/saveAddress', params),
		/**
		 * 设置默认地址
		 */
		setAddressDefault: (params = {}) => vm.$u.post('/User/setAddressDefault', params),
		/**
		 * 删除地址
		 */
		delAddress: (params = {}) => vm.$u.post('/User/delAddress', params),
		/**
		 * 我的优惠券
		 */
		getCouponList: (params = {}) => vm.$u.post('/User/getCouponList', params),
		/**
		 * 支付
		 */
		doPay: (params = {}) => vm.$u.post('pay/doPay', params),
		/**
		 * 支付回调，临时用
		 */
		payNotify: (params = {}) => vm.$u.post('pay/notify', params),
  }
}

export default API_user
