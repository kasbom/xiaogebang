import Router from './router.js'

// import authority from './authority/index.js'

const router = new Router()

// 路由全局守卫
// router.beforeEach((to, next) => {
// 	// console.log(to)
// 	authority(to.path)
// 		.then(data => {
// 			next()
// 		})
// 		.catch(err => {
// 			console.log(err)
// 		})
// })

export default router
