import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

// 路由
import router from './router/index.js'
Vue.prototype.$mRouter = router

// store
import store from '@/store'

// 交互反馈
import toast from './utils/toast.js'
Vue.prototype.$toast = toast

// 复制
import uniCopy from './utils/xb-copy/uni-copy.js'
Vue.prototype.$copy = uniCopy

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
// #ifdef MP-WEIXIN
import {shareMixins} from './mixins/share.js'
Vue.mixin(shareMixins)
// #endif
// http拦截器
import httpInterceptor from '@/interceptor'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/api'
Vue.use(httpApi, app)

app.$mount()
