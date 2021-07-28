import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		locale: 'cn',
		userInfo: {},
		registeredData: {},
	},
	mutations: {
		// 设置用户token
		SET_TOKEN(state, token) {
			state.token = token;
		},
		// 设置用户信息
		SET_USER_INFO(state, userInfo) {
			state.userInfo = userInfo
		},
		// 语言
		SET_LOCALE(state, locale) {
			state.locale = locale
		},
		// 注册过程中信息
		SET_REGISTERED_DATA(state, registeredData) {
			state.registeredData = registeredData
		},
	},
	actions: {
		async getUserInfo({ commit }, _this) {
			const { code, data } = await _this.$u.api.getUserInfo()
			if (code !== 200) return
			
			commit('SET_USER_INFO', data)
			uni.setStorageSync('userInfo', data)
		}
	}
})

export default store
