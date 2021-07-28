
import Router from '../router.js'
const mRouter = new Router()

import store from '../../store/index.js'

import flat_arr from '@/utils/flat_arr.js' // 拉平数组方法

const tourist_path = [ // 游客可进入页面
	'/',
	'/pages/index/index',
	'/supplierPages/pages/index/index',
	'/pages/certification/index',
	'/supplierPages/pages/rentHall/index',
	'/supplierPages/pages/rentHall/detail',
	'/supplierPages/pages/certification/index',
	'/supplierPages/pages/certification/personal',
	'/publicPages/pages/citys/citys?multiple=true&max=3',
	'/pages/login/getCode',
	'/publicPages/pages/about/index',
	'/pages/certification/personal',
	'/publicPages/pages/protocol/index',
	'/publicPages/pages/problem_feedback/index',
	'/publicPages/pages/about/detail',
	'/publicPages/pages/protocol/detail',
	'/publicPages/pages/protocol/staticDetail'
]

const authority_fn = (to) => {
	return new Promise((reslove, reject) => {
		if (!to) {
			reslove()
			return
		}
		const toPath = to.split('?')[0]
		// console.log(toPath)
		if (tourist_path.includes(toPath)) { // 不管是否登录都能进入
			reslove()
		} else {
			// console.log(store.state.token)
			if (store.state.token) { // 如果已经登录
				if (Number(store.state.userInfo.identity) === 0) { // 尚未选择身份认证
					uni.showModal({
						title: '认证提醒',
						content: '您尚未个人认证, 请先认证个人身份',
						confirmText: '去认证',
						confirmColor: '#f60',
						cancelText: '暂不认证',
						showCancel: true,
						success: function (res) {
							const pages = getCurrentPages()
							const len = pages.length
							const fullPath = pages[len - 1].$route.fullPath
							const paths = fullPath.split('/')
							let name = ''
							if (paths.length > 1) {
								name = paths[1]
							} else {
								name = 'pages'
							}
							
							if (name === 'pages') { // 用机方
								uni.navigateTo({
									url: '/pages/certification/index'
								})
							} else if (name === 'supplierPages') { // 机主方
								uni.navigateTo({
									url: '/supplierPages/pages/certification/index'
								})
							}
						}
					});
				} else {
					reslove()
				}
			} else {
				uni.showModal({
					title: '登录提醒',
					content: '您尚未登录, 确定前往登录吗?',
					confirmText: '马上登录',
					cancelText: '暂不登录',
					confirmColor: '#f60',
					success: function (res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							mRouter.push({
								path: '/pages/login/getCode'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
			reject('请先登录')
		}
	})
}

export default authority_fn
