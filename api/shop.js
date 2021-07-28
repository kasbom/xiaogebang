/**
 * 维修店相关api
 */

const API_shop = vm => {
  return {
		/**
		 * 首页数据
		 */
		getRepairShopIndex: (params = {}) => vm.$u.get('repairShop/index', params),
		/**
		 * 添加地址
		 */
		repairShopAddAddress: (params = {}) => vm.$u.post('repairShop/addAddress', params),
		/**
		 * 编辑地址
		 */
		repairShopUpdateAddress: (params = {}) => vm.$u.post('repairShop/updateAddress', params),
		/**
		 * 地址列表
		 */
		repairShopAddressList: (params = {}) => vm.$u.post('repairShop/getAddressList', params),
		/**
		 * 地址详情
		 */
		repairShopAddressInfo: (params = {}) => vm.$u.post('repairShop/getAddressInfo', params),
		/**
		 * 删除地址
		 */
		repairShopDelAddress: (params = {}) => vm.$u.post('repairShop/delAddress', params),
		/**
		 * 获取总分类
		 */
		getCategories: (params = {}) => vm.$u.get('repairShop/getCategories', params),
		/**
		 * 获取首页商品
		 */
		getCarefully: (params = {}) => vm.$u.post('repairShop/getCarefully', params),
		/**
		 * 商品列表
		 */
		getGoodsList: (params = {}) => vm.$u.post('repairShop/getGoodsList', params),
  }
}

export default API_shop
