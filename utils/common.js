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
		    // uni.share({
		    // 	provider: "weixin",
		    // 	scene: "WXSceneSession",
		    // 	type: 0,
		    // 	href: obj.href,
		    // 	title: obj.title,
		    // 	summary: obj.summary,
		    // 	imageUrl:obj.imageUrl,
		    // 	success: function (res) {
		    // 		resolve(res)
		    // 	},
		    // 	fail: function (err) {
		    // 		reject(err)
		    // 	}
		    // });
			// let inv_id=localStorage.getItem('inv_id')
			const inv_id = uni.getStorageSync('inv_id')
			console.log('share')
			uni.share({
			    provider: 'weixin',
			    scene: "WXSceneSession",
			    type: 5,
			    imageUrl: obj.imageUrl,
			    title: obj.title,
			    miniProgram: {
			        id: 'gh_b7606bb00e58',
			        path: '/pages/home/index?inv_id'+inv_id,
			        type: 0,
			        webUrl: 'http://uniapp.dcloud.io'
			    },
			    success: ret => {
			        console.log(JSON.stringify(ret));
			    },
					fail: e => {
						console.log(e)
					}
			});
		//#endif
	})
	
}
function goToPage(item,city_id){
	    let url=''
		if(item.likeType==1){
			url=`/pages/home/cleaning/detail?id=${item.linkId}&city_id=${city_id}`
		}else if(item.likeType==2){
			url=`/pages/home/SetMeal/detail?id=${item.linkId}&city_id=${city_id}`
		}else if(item.likeType==3){
			url=`/pages/home/Spike/detail?id=${item.linkId}&city_id=${city_id}`
		}else if(item.likeType==4){
			url=`/pages/home/JoinGroup/detail?id=${item.linkId}&city_id=${city_id}`
		}
		let newObj= getQueryVariable(url)
		let id=newObj["id"]
		let cityid= newObj["city_id"]
		if(id==''||cityid==''||!id||!cityid){
			return 
		}
		navTo(url)
}
function bMapTransQQMap(lat, lng) {
           var X_PI = Math.PI * 3000.0 / 180.0;
            var x = lng - 0.0065;
            var y = lat - 0.006;
            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
            var gg_lng = z * Math.cos(theta);
            var gg_lat = z * Math.sin(theta);
            return { lng: gg_lng, lat: gg_lat }
}
function toMapAPP(latitude,longitude,name){
	let url = "";
	let obj=bMapTransQQMap(latitude,longitude)
	console.log(obj)
	if (plus.os.name == "Android") {//判断是安卓端
		plus.nativeUI.actionSheet({//选择菜单
			title: "选择地图应用",
			cancel: "取消",
			buttons: [{title: "腾讯地图"},{title: "百度地图"}, {title: "高德地图"}]
		}, function(e) {
			switch (e.index) {
				//下面是拼接url,不同系统以及不同地图都有不同的拼接字段
				case 1:
					//注意referer=xxx的xxx替换成你在腾讯地图开发平台申请的key
					url = `qqmap://map/geocoder?coord=${obj.lat},${obj.lng}&referer=XOQBZ-V22WV-NYHPG-UD4VL-M5OYV-4AFCH`;
					break;
				case 2:
					url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`;
					break;
				case 3:
					url = `androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${obj.lat}&lon=${obj.lng}&dev=1`;
					break;
				default:
					break;
			}
			if (url != "") {
				url = encodeURI(url);
				//plus.runtime.openURL(url,function(e){})调起手机APP应用
				plus.runtime.openURL(url, function(e) {
					plus.nativeUI.alert("本机未安装指定的地图应用");
				});
			}
		})
	} else {
		// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置
		// 在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加
		//（如urlschemewhitelist:["iosamap","baidumap"]）  
		plus.nativeUI.actionSheet({
			title: "选择地图应用",
			cancel: "取消",
			buttons: [{title: "腾讯地图"},{title: "百度地图"}, {title: "高德地图"}]
		}, function(e) {
			switch (e.index) {
				case 1:
					url = `qqmap://map/geocoder?coord=${obj.lat},${obj.lng}&referer=XOQBZ-V22WV-NYHPG-UD4VL-M5OYV-4AFCH`;
					break;
				case 2:
					url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
					break;
				case 3:
					url = `iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${obj.lat}&lon=${obj.lng}&dev=1`;
					break;
				default:
					break;
			}
			if (url != "") {
				url = encodeURI(url);
				plus.runtime.openURL(url, function(e) {
					plus.nativeUI.alert("本机未安装指定的地图应用");
				});
			}
		})
	}
}
function time_range (beginTime, endTime) {
  var strb = beginTime.split (":");
  if (strb.length != 2) {
    return false;
  }
 
  var stre = endTime.split (":");
  if (stre.length != 2) {
    return false;
  }
 
  var b = new Date ();
  var e = new Date ();
  var n = new Date ();
 
  b.setHours (strb[0]);
  b.setMinutes (strb[1]);
  e.setHours (stre[0]);
  e.setMinutes (stre[1]);
 
  if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
    return true;
  } else {
    return false;
  }
}
function getQueryVariable(url,variable){
		  let urlArr=url.split('?')
		  var url ='?'+urlArr[1]
         var theRequest = new Object();
         if (url.indexOf("?") != -1) {
             var str = url.substr(1);
             let strs = str.split("&");
             for ( var i = 0; i < strs.length; i++) {
                 theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
             }
         }
         return theRequest;
  
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
	toMapAPP,
	time_range,
	getQueryVariable,
} 