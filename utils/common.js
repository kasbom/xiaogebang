 const randomString=(e)=>{  
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
  a = t.length,
  n = "";
  for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n
}
const navTo=(url)=>{
	uni.navigateTo({
		url: url,
		fail:(err)=> {
			console.log()
		}
	})
}
function setToken(key,value){
	 uni.setStorage({
		key:key,
		data: value,
	})
}
function getToken(key){
	try {
	    const value = uni.getStorageSync(key);
	    if(value) {
	        return value
	    }
	} catch(e){
	    //错误
	}
}
function removeToken(key){
	 uni.removeStorageSync(key)
}
function todayNum(){
	 let date=new Date()
	 let todayStr=date.toLocaleDateString()
	 let todayNum=(Date.parse(new Date(todayStr)))
	 return todayNum
}
function shareWXChat(obj){
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN
			uni.share({
			    provider: 'weixin',
			    scene: "WXSceneSession",
			    type: 5,
			    imageUrl: obj.imageUrl,
			    title: obj.title,
			    miniProgram: {
			        id: 'gh_80d72db9a07f',
			        path: obj.path,
			        type: 0,
			        webUrl: obj.webUrl
			    },
			    success: res => {
			        resolve(res)
			    },
		    	fail: function (err) {
		    		reject(err)
		    	}
			});
		//#endif
		//#ifdef APP-PLUS
		    uni.share({
		    	provider: "weixin",
		    	scene: "WXSceneSession",
		    	type: 0,
		    	href: obj.href,
		    	title: obj.title,
		    	summary: obj.summary,
		    	imageUrl:obj.imageUrl,
		    	success: function (res) {
		    		resolve(res)
		    	},
		    	fail: function (err) {
		    		reject(err)
		    	}
		    });
		//#endif
	})
	
}
function goToPage(item,city_id){
		if(item.likeType==1){
			navTo(`/pages/home/cleaning/detail?id=${item.linkId}&city_id=${city_id}`)
		}else if(item.likeType==2){
			navTo(`/pages/home/SetMeal/detail?id=${item.linkId}&city_id=${city_id}`)
		}else if(item.likeType==3){
			navTo(`/pages/home/Spike/detail?id=${item.linkId}&city_id=${city_id}`)
		}else if(item.likeType==4){
			navTo(`/pages/home/JoinGroup/detail?id=${item.linkId}&city_id=${city_id}`)
		}else if(item.likeType==5){
			navTo(``)
		}
		
}

module.exports = {
	navTo,
	randomString,
	setToken,
	getToken,
	removeToken,
	todayNum,
	shareWXChat,
	goToPage,
} 