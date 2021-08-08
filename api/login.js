/**
 * 登录相关api
 */

const API_login = vm => {
  return {
    /**
     * 获取登录验证码
    */
    sendLoginCode: (params = {}, showLoading,header ={}) => vm.$u.post('/SendSms', params, showLoading,header),
		/**
		 * 普通登录
		 */
		login: (params = {}, showLoading) => vm.$u.post('/Login/Mobile', params, showLoading),
		/**
		 * 绑定手机号
		 */
		bindMobile: (params = {}, showLoading) => vm.$u.post('/User/bindMobile', params, showLoading),
		/**
		 * 小程序登录
		 */
		miniWechat: (params = {}, showLoading) => vm.$u.post('/Login/miniWechat', params, showLoading),
		/**
		 * 微信APP登录
		 */
		wechat: (params = {}, showLoading) => vm.$u.post('/Login/wechat', params, showLoading),
		/**
		 * apple登录
		 */
		appleLogin: (params = {}, showLoading) => vm.$u.post('/Login/appleLogin', params, showLoading),
		/**
		 * wechatPhone登录
		 */
		wechatPhone: (params = {}, showLoading) => vm.$u.post('/Login/wechatPhone', params, showLoading),
		
		
  }
}

export default API_login
