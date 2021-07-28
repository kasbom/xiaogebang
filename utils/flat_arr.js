const flat_arr = function (s){
	let arr = [];
	// 定义hanle函数方便递归
	function hanle (s){
		for (let i=0, j=s.length; i<j; i++){ // 历遍数组
			if (Object.prototype.toString.call(s[i]) == "[object Array]"){ // 判断是否为数组
				hanle(s[i]) // 递归调用
			} else {
				arr.push(s[i]) // 添加进新数组
			}
		}
	}
	hanle(s)
	return arr
}

export default flat_arr
