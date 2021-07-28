// 封装uni-app路由,实现权限拦截
const stringUrl = data => {
  if (data instanceof Object) {
    let keys = Object.keys(data)
    let url = []
    keys.forEach(key => {
      url.push(`${key}=${data[key]}`)
    })
    return url.join('&')
  } else {
    return ''
  }
}

export default class Router {
	constructor(arg) {
	   this.callback = this.navigate
	}
  
  beforeEach (callback) {
    if (callback instanceof Function) {
      this.callback = (nav_type, to) => {
        new Promise((resolve, reject) => {
          callback(to, resolve)
        })
        .then(status => {
          if (status || status === undefined) {
            this.navigate(nav_type, to)
          }
        })
      }
    } else {
      this.callback = this.navigate
    }
  }
  
  navigate (nav_type, to = {path: '', query: {}}) {
    let {path, query} = to
    let url = query ? `${path}?${stringUrl(query)}` : path
    uni[nav_type]({
     url
    })
  }
  
  push (to) {
    this.callback('navigateTo', to)
  }
  
  redirectTo (to) {
    this.callback('redirectTo', to)
  }
  
  reLaunch (to) {
    this.callback('reLaunch', to)
  }
  
  switchTab (to) {
    this.callback('switchTab', to)
  }
  
  back (delta) {
    uni.navigateBack({
      delta
    })
  }
}
