export default function(userInfo) {
	const { userType } = userInfo
	     // userId:0; //用户ID
	      // userType:0; //用户类型 1 客户 2 店长 3 保洁 4 保姆 5 月嫂 6 营销人员 7 商家端
	let url = ''
	if (userType == 0) { // 未选择身份
		// url = '/pages/login/selectId'
	} else if (userType == 1) { // 客户
		url = '/driverPages/pages/index/index'
	} else if (userType == 2) { // 店长
		url = '/pages/home/home'
	} else if (userType == 3) { // 保洁
		url = '/technicianPages/pages/index/index'
	}else if (userType == 4) { // 保姆
		url = '/technicianPages/pages/index/index'
	}else if (userType == 5) { // 月嫂
		url = '/technicianPages/pages/index/index'
	}else if (userType == 6) { // 营销人员
		url = '/technicianPages/pages/index/index'
	}else if (userType == 7) { // 商家端
		url = '/technicianPages/pages/index/index'
	}
	
	uni.reLaunch({
		url
	})
}
