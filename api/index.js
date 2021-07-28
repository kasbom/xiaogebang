import api_login from './login'
import api_user from './user'
import api_tools from './tools'
import api_shop from './shop'
import api_home from './home'
import api_skill from './skill'
/**
 * 执行
 */

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
const install = (Vue, vm) => {
  
  const API_login = {...api_login(vm) }
	const API_user = { ...api_user(vm) }
	const API_tools = { ...api_tools(vm) }
	const API_shop = { ...api_shop(vm) }
	const API_home = { ...api_home(vm) }
	const API_skill = { ...api_skill(vm) }
	
	// const api = {
	// 	...API_login,
	// 	...API_public,
	// 	...API_demand,
	// 	...API_supplier,
	// 	...API_message,
	// 	...API_bank,
	// 	...API_password
	// }
	
	// console.log(Object.keys(api))
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
    ...API_login,
		...API_user,
		...API_tools,
		...API_shop,
		...API_home,
		...API_skill,
  }
}

export default {
	install
}